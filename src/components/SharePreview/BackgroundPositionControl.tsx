import React from 'react';
import Draggable from 'react-draggable';

interface BackgroundPositionControlProps {
  position: { x: number; y: number };
  onPositionChange: (position: { x: number; y: number }) => void;
  scale: number;
  onScaleChange: (scale: number) => void;
}

export function BackgroundPositionControl({
  position,
  onPositionChange,
  scale,
  onScaleChange,
}: BackgroundPositionControlProps) {
  return (
    <div className="space-y-4 bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-semibold text-gray-800">Background Position</h3>
      
      <div className="space-y-2">
        <label className="block text-sm text-gray-600">
          Scale: {scale.toFixed(2)}x
        </label>
        <input
          type="range"
          min="1"
          max="2"
          step="0.1"
          value={scale}
          onChange={(e) => onScaleChange(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm text-gray-600">Position</label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs text-gray-500">X: {position.x}px</label>
            <input
              type="number"
              value={position.x}
              onChange={(e) => onPositionChange({ ...position, x: parseInt(e.target.value) })}
              className="w-full px-2 py-1 border rounded"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500">Y: {position.y}px</label>
            <input
              type="number"
              value={position.y}
              onChange={(e) => onPositionChange({ ...position, y: parseInt(e.target.value) })}
              className="w-full px-2 py-1 border rounded"
            />
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          onPositionChange({ x: 0, y: 0 });
          onScaleChange(1);
        }}
        className="w-full py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
      >
        Reset Position
      </button>
    </div>
  );
}