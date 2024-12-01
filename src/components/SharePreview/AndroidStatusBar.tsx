import React from 'react';
import { Battery, Wifi, Signal } from 'lucide-react';
import { formatTime } from '../../utils/dateUtils';

export function AndroidStatusBar() {
  return (
    <div className="bg-black bg-opacity-30 text-white px-4 py-1 flex items-center justify-between">
      <span className="text-sm">{formatTime(new Date())}</span>
      <div className="flex items-center space-x-2">
        <Signal className="w-4 h-4" />
        <Wifi className="w-4 h-4" />
        <Battery className="w-4 h-4" />
      </div>
    </div>
  );
}