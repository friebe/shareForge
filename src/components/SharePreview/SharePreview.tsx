import React, { useRef, useState } from 'react';
import { X, Download, Share2 } from 'lucide-react';
import { type Contact, type ShareApp } from '../../types';
import { AndroidStatusBar } from './AndroidStatusBar';
import { WhatsAppPreview } from './WhatsAppPreview';
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
      <div className="flex justify-between">
        <button
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          <Share2 className="w-4 h-4" />
          <span>{showShareMenu ? 'Hide' : 'Show'} Share Menu</span>
        </button>
        <button
          onClick={handleExport}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Download className="w-4 h-4" />
          <span>Export as PNG</span>
        </button>
      </div>

      <div className="max-w-[375px] mx-auto bg-black p-3 rounded-[32px] shadow-xl" ref={previewRef}>
        <div 
          className="preview relative h-[667px] w-full rounded-[24px] overflow-hidden bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            backgroundColor: '#f5f5f5'
          }}
        >
          <AndroidStatusBar />
          
          {selectedApp === 'WhatsApp' && selectedContact ? (
            <WhatsAppPreview
              contact={selectedContact}
              onClose={handleClose}
            />
          ) : (
            <>
              {/* Share Menu Overlay */}
              {showShareMenu && (
                <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg">
                  {/* Header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900">Share via</h3>
                    <button 
                      onClick={() => setShowShareMenu(false)}
                      className="p-1.5 rounded-full hover:bg-gray-100"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  {/* Contacts Row */}
                  <div className="px-4 py-3 border-b border-gray-200">
                    <div className="flex space-x-4 overflow-x-auto">
                      {contacts.map((contact) => (
                        <button
                          key={contact.id}
                          onClick={() => handleAppClick('WhatsApp', contact)}
                          className="flex flex-col items-center min-w-[64px]"
                        >
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img
                              src={contact.avatar}
                              alt={contact.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-xs text-gray-700 mt-1.5 truncate w-full text-center">
                            {contact.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Share Apps Grid */}
                  <div className="p-3">
                    <div className="grid grid-cols-4 gap-3">
                      {shareApps.map((app) => (
                        <button
                          key={app.id}
                          onClick={() => handleAppClick(app.name)}
                          className="flex flex-col items-center"
                        >
                          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                            <app.icon className="w-5 h-5" style={{ color: app.color }} />
                          </div>
                          <span className="text-xs text-gray-700 mt-1.5 truncate w-full text-center">
                            {app.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Cancel Button */}
                  <div className="px-4 py-2 border-t border-gray-200">
                    <button 
                      onClick={() => setShowShareMenu(false)}
                      className="w-full py-2 text-sm text-blue-600 font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}