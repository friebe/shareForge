import React from 'react';
import { type ShareApp } from '../../types';
import * as Icons from 'lucide-react';

interface ShareAppsControlProps {
  shareApps: ShareApp[];
  onShareAppsChange: (apps: ShareApp[]) => void;
}

const availableIcons = Object.entries(Icons).map(([name, icon]) => ({
  name,
  icon,
}));

export function ShareAppsControl({ shareApps, onShareAppsChange }: ShareAppsControlProps) {
  const handleAddApp = () => {
    const newApp: ShareApp = {
      id: Date.now().toString(),
      name: '',
      icon: Icons.Share2,
      color: '#000000',
    };
    onShareAppsChange([...shareApps, newApp]);
  };

  const handleUpdateApp = (id: string, field: keyof ShareApp, value: any) => {
    onShareAppsChange(
      shareApps.map((app) =>
        app.id === id ? { ...app, [field]: value } : app
      )
    );
  };

  const handleRemoveApp = (id: string) => {
    onShareAppsChange(shareApps.filter((app) => app.id !== id));
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-800">Share Apps</h3>
      
      <div className="space-y-4">
        {shareApps.map((app) => (
          <div key={app.id} className="flex items-start space-x-3 bg-white p-3 rounded-lg">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
              <app.icon className="w-6 h-6" style={{ color: app.color }} />
            </div>
            <div className="flex-1 space-y-2">
              <input
                type="text"
                value={app.name}
                placeholder="App name"
                onChange={(e) => handleUpdateApp(app.id, 'name', e.target.value)}
                className="w-full px-2 py-1 border rounded"
              />
              <select
                value={app.icon.name}
                onChange={(e) => {
                  const selectedIcon = availableIcons.find(i => i.name === e.target.value);
                  if (selectedIcon) {
                    handleUpdateApp(app.id, 'icon', selectedIcon.icon);
                  }
                }}
                className="w-full px-2 py-1 border rounded"
              >
                {availableIcons.map(({ name }) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <input
                type="color"
                value={app.color}
                onChange={(e) => handleUpdateApp(app.id, 'color', e.target.value)}
                className="w-full"
              />
            </div>
            <button
              onClick={() => handleRemoveApp(app.id)}
              className="text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleAddApp}
        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Add Share App
      </button>
    </div>
  );
}