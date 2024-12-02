import React from 'react';
import { Share2, Download, Film } from 'lucide-react';

interface PreviewControlsProps {
  showShareMenu: boolean;
  isExporting: boolean;
  onToggleShareMenu: () => void;
  onExportPNG: () => void;
  onExportGIF: () => void;
}

export function PreviewControls({
  showShareMenu,
  isExporting,
  onToggleShareMenu,
  onExportPNG,
  onExportGIF,
}: PreviewControlsProps) {
  return (
    <div className="flex justify-between">
      <button
        onClick={onToggleShareMenu}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
      >
        <Share2 className="w-4 h-4" />
        <span>{showShareMenu ? 'Hide' : 'Show'} Share Menu</span>
      </button>
      <div className="flex space-x-2">
        <button
          onClick={onExportPNG}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          disabled={isExporting}
        >
          <Download className="w-4 h-4" />
          <span>Export PNG</span>
        </button>
        <button
          onClick={onExportGIF}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          disabled={isExporting}
        >
          <Film className="w-4 h-4" />
          <span>{isExporting ? 'Creating GIF...' : 'Export GIF'}</span>
        </button>
      </div>
    </div>
  );
}