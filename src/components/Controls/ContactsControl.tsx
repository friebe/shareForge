import React from 'react';
import { type Contact } from '../../types';

interface ContactsControlProps {
  contacts: Contact[];
  onContactsChange: (contacts: Contact[]) => void;
}

export function ContactsControl({ contacts, onContactsChange }: ContactsControlProps) {
  const handleAddContact = () => {
    const newContact: Contact = {
      id: Date.now().toString(),
      name: '',
      avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d',
    };
    onContactsChange([...contacts, newContact]);
  };

  const handleUpdateContact = (id: string, field: keyof Contact, value: string) => {
    onContactsChange(
      contacts.map((contact) =>
        contact.id === id ? { ...contact, [field]: value } : contact
      )
    );
  };

  const handleRemoveContact = (id: string) => {
    onContactsChange(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-800">Contacts</h3>
      
      <div className="space-y-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="flex items-start space-x-3 bg-white p-3 rounded-lg">
            <img
              src={contact.avatar}
              alt={contact.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1 space-y-2">
              <input
                type="text"
                value={contact.name}
                placeholder="Contact name"
                onChange={(e) => handleUpdateContact(contact.id, 'name', e.target.value)}
                className="w-full px-2 py-1 border rounded"
              />
              <input
                type="url"
                value={contact.avatar}
                placeholder="Avatar URL"
                onChange={(e) => handleUpdateContact(contact.id, 'avatar', e.target.value)}
                className="w-full px-2 py-1 border rounded text-sm"
              />
            </div>
            <button
              onClick={() => handleRemoveContact(contact.id)}
              className="text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleAddContact}
        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Add Contact
      </button>
    </div>
  );
}