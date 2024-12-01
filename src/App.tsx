import React, { useState } from 'react';
import { Share2, Facebook, Twitter, Instagram, Link, MessageCircle, MessageSquare, Mail } from 'lucide-react';
import { SharePreview } from './components/SharePreview/SharePreview';
import { BackgroundControl } from './components/Controls/BackgroundControl';
import { ContactsControl } from './components/Controls/ContactsControl';
import { ShareAppsControl } from './components/Controls/ShareAppsControl';
import { type Contact, type ShareApp } from './types';

function App() {
  const [backgroundImage, setBackgroundImage] = useState('https://images.unsplash.com/photo-1573152958734-1922c188fba3?auto=format&fit=crop&w=800&q=80');
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d',
    },
    {
      id: '2',
      name: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    },
  ]);
  const [shareApps, setShareApps] = useState<ShareApp[]>([
    {
      id: '1',
      name: 'Messages',
      icon: MessageCircle,
      color: '#1A73E8',
    },
    {
      id: '2',
      name: 'WhatsApp',
      icon: MessageSquare,
      color: '#25D366',
    },
    {
      id: '3',
      name: 'Gmail',
      icon: Mail,
      color: '#EA4335',
    },
    {
      id: '4',
      name: 'Copy',
      icon: Link,
      color: '#5F6368',
    },
    {
      id: '5',
      name: 'Facebook',
      icon: Facebook,
      color: '#1877F2',
    },
    {
      id: '6',
      name: 'Twitter',
      icon: Twitter,
      color: '#1DA1F2',
    },
    {
      id: '7',
      name: 'Instagram',
      icon: Instagram,
      color: '#E4405F',
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Android Share Menu Generator
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <BackgroundControl
              backgroundImage={backgroundImage}
              onBackgroundChange={setBackgroundImage}
            />
            <ContactsControl
              contacts={contacts}
              onContactsChange={setContacts}
            />
            <ShareAppsControl
              shareApps={shareApps}
              onShareAppsChange={setShareApps}
            />
          </div>

          <div className="lg:sticky lg:top-8">
            <SharePreview
              backgroundImage={backgroundImage}
              contacts={contacts}
              shareApps={shareApps}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;