import React, { useRef, useState } from 'react';
import { type Contact, type ShareApp } from '../../types';
import { AndroidStatusBar } from './AndroidStatusBar';
import { WhatsAppPreview } from './WhatsAppPreview';
import { BackgroundPositionControl } from './BackgroundPositionControl';
import { ShareMenu } from './ShareMenu';
import { PreviewControls } from './PreviewControls';
import { GIFCreator } from '../../utils/gifUtils';
import { toPng } from 'html-to-image';

interface SharePreviewProps {
  backgroundImage: string;
  contacts: Contact[];
  shareApps: ShareApp[];
}

export function SharePreview({ backgroundImage, contacts, shareApps }: SharePreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [showShareMenu, setShowShareMenu] = useState(true);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [bgPosition, setBgPosition] = useState({ x: 0, y: 0 });
  const [bgScale, setBgScale] = useState(1);

  const handleExport = async () => {
    if (previewRef.current) {
      try {
        const dataUrl = await toPng(previewRef.current, {
          width: 375,
          height: 667,
          pixelRatio: 2
        });
        const link = document.createElement('a');
        link.download = 'android-share-preview.png';
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('Error exporting image:', error);
      }
    }
  };

  const handleExportGif = async () => {
    if (!previewRef.current) return;
    setIsExporting(true);

    const gifCreator = new GIFCreator(previewRef.current);
    
    const gifOptions: any = {
      width: 375,
      height: 667,
      frames: [
        { showShare: false, delay: 500 },
        { showShare: true, showWhatsApp: false, delay: 500 },
        { showShare: false, showWhatsApp: true, delay: 1000 },
      ],
      backgroundColor: '#000000',
    };

    try {
      const gifBlob = await gifCreator.createGIF(gifOptions);
  
      // GIF speichern oder teilen
      const url = URL.createObjectURL(gifBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'animation.gif';
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Fehler beim Erstellen des GIFs:', error);
    }

    setIsExporting(false);
  };

  const handleAppClick = (appName: string, contact?: Contact) => {
    setSelectedApp(appName);
    if (contact) {
      setSelectedContact(contact);
    }
    setShowShareMenu(false);
  };

  const handleClose = () => {
    setSelectedApp(null);
    setSelectedContact(null);
    setShowShareMenu(true);
  };

  return (
    <div className="space-y-4">
      <PreviewControls
        showShareMenu={showShareMenu}
        isExporting={isExporting}
        onToggleShareMenu={() => setShowShareMenu(!showShareMenu)}
        onExportPNG={handleExport}
        onExportGIF={handleExportGif}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,375px] gap-8">
        <BackgroundPositionControl
          position={bgPosition}
          onPositionChange={setBgPosition}
          scale={bgScale}
          onScaleChange={setBgScale}
        />

        <div className="bg-black p-3 rounded-[32px] shadow-xl" ref={previewRef}>
          <div className="relative h-[667px] w-full rounded-[24px] overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300"
              style={{ 
                backgroundImage: `url(${backgroundImage})`,
                transform: `translate(${bgPosition.x}px, ${bgPosition.y}px) scale(${bgScale})`,
              }}
            />
            
            <AndroidStatusBar />
            
            {selectedApp === 'WhatsApp' && selectedContact ? (
              <div className="whatsapp-view">
                <WhatsAppPreview
                  contact={selectedContact}
                  onClose={handleClose}
                />
              </div>
            ) : (
              showShareMenu && (
                <ShareMenu
                  contacts={contacts}
                  shareApps={shareApps}
                  onClose={() => setShowShareMenu(false)}
                  onAppClick={handleAppClick}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}