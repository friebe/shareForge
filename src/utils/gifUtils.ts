import { toPng } from 'html-to-image';
import gifshot from 'gifshot';

interface GIFFrame {
  showShare: boolean;
  showWhatsApp?: boolean;
  customClass?: string;
  delay: number; // Verzögerung in Millisekunden
}

interface GIFOptions {
  frames: GIFFrame[];
  width: number;
  height: number;
  backgroundColor?: string; // Hintergrundfarbe (optional)
}

export class GIFCreator {
  private element: HTMLElement;

  constructor(element: HTMLElement) {
    if (!element) {
      throw new Error('Das Ziel-HTML-Element ist erforderlich.');
    }
    this.element = element;
  }

  /**
   * Erstellt ein GIF basierend auf dem HTML-Element und den Frames.
   * @param options Optionen für das GIF.
   * @returns Ein Blob des generierten GIFs.
   */
  public async createGIF(options: GIFOptions): Promise<Blob> {
    const images: string[] = [];

    for (const frame of options.frames) {
      this.updateUIState(frame);

      await new Promise<void>((resolve) => requestAnimationFrame(resolve));

      const dataUrl = await toPng(this.element, {
        width: options.width,
        height: options.height,
        pixelRatio: 1,
        backgroundColor: options.backgroundColor || '#000000',
      });

      images.push(dataUrl);
      this.resetUIState(frame);
    }

    return new Promise<Blob>((resolve, reject) => {
      gifshot.createGIF(
        {
          images: images,
          gifWidth: options.width,
          gifHeight: options.height,
          interval: options.frames[0]?.delay / 1000 || 0.5, // Standardintervall 0.5 Sekunden
        },
        (result) => {
          if (result.error) {
            reject(result.error);
          } else {
            // Wandelt das GIF in einen Blob um
            const blob = this.dataURIToBlob(result.image);
            resolve(blob);
          }
        }
      );
    });
  }

  /**
   * Konvertiert DataURI zu Blob.
   * @param dataURI Die DataURI (z.B. Base64-Bild).
   * @returns Blob.
   */
  private dataURIToBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new Uint8Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
      arrayBuffer[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeString });
  }

  /**
   * Aktualisiert den UI-Zustand basierend auf den Frame-Eigenschaften.
   * @param frame Der aktuelle Frame mit UI-Informationen.
   */
  private updateUIState(frame: GIFFrame): void {
    const shareMenu = this.element.querySelector('.share-menu');
    const whatsAppView = this.element.querySelector('.whatsapp-view');

    if (shareMenu) {
      shareMenu.classList.toggle('hidden', !frame.showShare);
    }
    if (whatsAppView) {
      whatsAppView.classList.toggle('hidden', !frame.showWhatsApp);
    }
    if (frame.customClass) {
      this.element.classList.add(frame.customClass);
    }
  }

  /**
   * Setzt den UI-Zustand nach dem Frame zurück.
   * @param frame Der aktuelle Frame, der zurückgesetzt wird.
   */
  private resetUIState(frame: GIFFrame): void {
    if (frame.customClass) {
      this.element.classList.remove(frame.customClass);
    }
  }
}
