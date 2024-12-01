import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { presetBackgrounds } from '../../data/presetBackgrounds';

interface BackgroundControlProps {
  onBackgroundChange: (url: string) => void;
  backgroundImage: string;
}

export function BackgroundControl({ onBackgroundChange, backgroundImage }: BackgroundControlProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onBackgroundChange(imageUrl);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-800">Background</h3>
      
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {presetBackgrounds.map((bg) => (
          <button
            key={bg.id}
            onClick={() => onBackgroundChange(bg.url)}
            className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
              backgroundImage === bg.url ? 'border-blue-500' : 'border-transparent'
            }`}
          >
            <img src={bg.url} alt={bg.alt} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
        >
          <Upload className="w-5 h-5" />
          <span>Upload Image</span>
        </button>

        <div className="relative">
          <label htmlFor="custom-bg" className="text-sm text-gray-600 block">
            Custom Background URL
          </label>
          <input
            type="url"
            id="custom-bg"
            placeholder="Enter image URL..."
            className="w-full px-3 py-2 border rounded-lg"
            onChange={(e) => onBackgroundChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}