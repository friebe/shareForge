import React from 'react';
import { ArrowLeft, MoreVertical, Phone, Video } from 'lucide-react';
import { Contact } from '../../types';

interface WhatsAppPreviewProps {
  contact: Contact;
  onClose: () => void;
}

export function WhatsAppPreview({ contact, onClose }: WhatsAppPreviewProps) {
  return (
    <div className="absolute inset-0 bg-[#ECE5DD] flex flex-col">
      {/* WhatsApp Header */}
      <div className="bg-[#075E54] text-white px-4 py-2 flex items-center space-x-4">
        <button onClick={onClose} className="p-1">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1 flex items-center space-x-3">
          <img
            src={contact.avatar}
            alt={contact.name}
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium">{contact.name}</span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-1">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-1">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-1">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4">
        <div className="max-w-[80%] ml-auto bg-[#DCF8C6] rounded-lg p-3 shadow">
          <div className="space-y-2">
            <div className="bg-white rounded-lg p-2 shadow-sm">
              <img 
                src="/preview.png" 
                alt="Shared content"
                className="w-full h-32 object-cover rounded"
              />
              <div className="mt-2 text-sm">
                <p className="font-medium text-gray-800">Check out this awesome design!</p>
                <p className="text-gray-500 text-xs">https://example.com/share</p>
              </div>
            </div>
            <p className="text-sm">Hey, I wanted to share this with you! 🎨</p>
          </div>
          <span className="text-[10px] text-gray-500 float-right mt-1">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-[#F0F2F5] p-2 flex items-end space-x-2">
        <div className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-gray-400">
          Type a message
        </div>
      </div>
    </div>
  );
}