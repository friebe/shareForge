import React from 'react';
import { X } from 'lucide-react';
import { Contact, ShareApp } from '../../types';

interface ShareMenuProps {
  contacts: Contact[];
  shareApps: ShareApp[];
  onClose: () => void;
  onAppClick: (appName: string, contact?: Contact) => void;
}

export function ShareMenu({ contacts, shareApps, onClose, onAppClick }: ShareMenuProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg animate-slide-up share-menu">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-900">Share via</h3>
        <button 
          onClick={onClose}
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
              onClick={() => onAppClick('WhatsApp', contact)}
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
              onClick={() => onAppClick(app.name)}
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
          onClick={onClose}
          className="w-full py-2 text-sm text-blue-600 font-medium"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}