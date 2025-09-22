"use client";

import React, { useState, useRef } from 'react';
import { 
  Type, 
  Square, 
  Image, 
  RotateCcw, 
  Table, 
  Settings, 
  Circle,
  Triangle,
  Star,
  Heart,
  Zap,
  Search,
  Minus,
  Plus,
  Smile,
  Flag,
  Cloud,
  Moon,
  Sun,
  ArrowRight,
  MoreHorizontal
} from 'lucide-react';

interface BottomToolbarProps {
  onAddElement: (type: 'text' | 'shape' | 'image' | 'line' | 'table' | 'icon', subtype?: string, content?: string) => void;
  zoomLevel: number;
  onZoomChange: (zoom: number) => void;
}

const BottomToolbar: React.FC<BottomToolbarProps> = ({ onAddElement, zoomLevel, onZoomChange }) => {
  const [showShapeModal, setShowShapeModal] = useState(false);
  const [showIconModal, setShowIconModal] = useState(false);
  const [showLineModal, setShowLineModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const shapes = [
    { name: 'Rectangle', icon: Square, value: 'rectangle' },
    { name: 'Circle', icon: Circle, value: 'circle' },
    { name: 'Triangle', icon: Triangle, value: 'triangle' },
    { name: 'Star', icon: Star, value: 'star' },
    { name: 'Heart', icon: Heart, value: 'heart' },
  ];

  const icons = [
    { name: 'Zap', icon: Zap, value: 'zap' },
    { name: 'Smile', icon: Smile, value: 'smile' },
    { name: 'Flag', icon: Flag, value: 'flag' },
    { name: 'Cloud', icon: Cloud, value: 'cloud' },
    { name: 'Moon', icon: Moon, value: 'moon' },
    { name: 'Sun', icon: Sun, value: 'sun' },
    { name: 'Star', icon: Star, value: 'star' },
    { name: 'Heart', icon: Heart, value: 'heart' },
  ];

  const lineTypes = [
    { name: 'Straight Line', icon: Minus, value: 'straight' },
    { name: 'Arrow', icon: ArrowRight, value: 'arrow' },
    { name: 'Dotted Line', icon: MoreHorizontal, value: 'dotted' },
  ];

  const handleZoomOut = () => {
    const newZoom = Math.max(10, zoomLevel - 10);
    onZoomChange(newZoom);
  };

  const handleZoomIn = () => {
    const newZoom = Math.min(300, zoomLevel + 10);
    onZoomChange(newZoom);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onAddElement('image', undefined, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const Tooltip = ({ text, children }: { text: string; children: React.ReactElement }) => {
    return (
      <div className="relative group">
        {children}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[110]">
          {text}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    );
  };

  const Modal = ({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) => {
    return (
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-[120] min-w-[280px]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-lg leading-none"
          >
            ×
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-[100]">
      <div className="flex flex-row items-center z-[100] p-2.5 gap-2.5 absolute bottom-4 left-1/2 -translate-x-1/2 bg-[rgb(255,255,255,0.7)] backdrop-blur-md rounded-2xl shadow-xl">
        {/* Text tool */}
        <Tooltip text="Insert Text">
          <button 
            onClick={() => onAddElement('text')}
            className="p-2.5 text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105"
          >
            <Type size={20} />
          </button>
        </Tooltip>

        {/* Line tool */}
        <div className="relative">
          <Tooltip text="Insert Line">
            <button 
              onClick={() => setShowLineModal(!showLineModal)}
              className="p-2.5 text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105"
            >
              <Minus size={20} />
            </button>
          </Tooltip>
          {showLineModal && (
            <Modal title="Choose Line Type" onClose={() => setShowLineModal(false)}>
              {lineTypes.map((line) => (
                <button
                  key={line.value}
                  onClick={() => {
                    onAddElement('line', line.value);
                    setShowLineModal(false);
                  }}
                  className="p-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-200 flex flex-col items-center gap-2 border border-transparent hover:border-blue-200"
                >
                  <line.icon size={20} />
                  <span className="text-xs font-medium">{line.name}</span>
                </button>
              ))}
            </Modal>
          )}
        </div>

        {/* Shape tool */}
        <div className="relative">
          <Tooltip text="Insert Shape">
            <button 
              onClick={() => setShowShapeModal(!showShapeModal)}
              className="p-2.5 text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105"
            >
              <Square size={20} />
            </button>
          </Tooltip>
          {showShapeModal && (
            <Modal title="Choose Shape" onClose={() => setShowShapeModal(false)}>
              {shapes.map((shape) => (
                <button
                  key={shape.value}
                  onClick={() => {
                    onAddElement('shape', shape.value);
                    setShowShapeModal(false);
                  }}
                  className="p-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-200 flex flex-col items-center gap-2 border border-transparent hover:border-blue-200"
                >
                  <shape.icon size={20} />
                  <span className="text-xs font-medium">{shape.name}</span>
                </button>
              ))}
            </Modal>
          )}
        </div>

        {/* Image tool */}
        <Tooltip text="Insert Image">
          <button 
            onClick={handleImageClick}
            className="p-2.5 text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105"
          >
            <Image size={20} />
          </button>
        </Tooltip>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Table tool */}
        <Tooltip text="Insert Table">
          <button 
            onClick={() => onAddElement('table')}
            className="p-2.5 text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105"
          >
            <Table size={20} />
          </button>
        </Tooltip>

        {/* Icon tool */}
        <div className="relative">
          <Tooltip text="Insert Icon">
            <button 
              onClick={() => setShowIconModal(!showIconModal)}
              className="p-2.5 text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105"
            >
              <Smile size={20} />
            </button>
          </Tooltip>
          {showIconModal && (
            <Modal title="Choose Icon" onClose={() => setShowIconModal(false)}>
              {icons.map((icon) => (
                <button
                  key={icon.value}
                  onClick={() => {
                    onAddElement('icon', icon.value);
                    setShowIconModal(false);
                  }}
                  className="p-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-200 flex flex-col items-center gap-2 border border-transparent hover:border-blue-200"
                >
                  <icon.icon size={20} />
                  <span className="text-xs font-medium">{icon.name}</span>
                </button>
              ))}
            </Modal>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-gray-300 mx-1"></div>

        {/* Zoom control */}
        <div className="flex items-center space-x-2 text-gray-700 text-sm">
          <Tooltip text="Zoom Out">
            <button 
              onClick={handleZoomOut}
              disabled={zoomLevel <= 10}
              className="p-1.5 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <Minus size={16} />
            </button>
          </Tooltip>
          
          <Tooltip text="Zoom Level">
            <span className="text-xs font-semibold min-w-[45px] text-center bg-gray-100 px-2 py-1 rounded-md">
              {zoomLevel}%
            </span>
          </Tooltip>
          
          <Tooltip text="Zoom In">
            <button 
              onClick={handleZoomIn}
              disabled={zoomLevel >= 300}
              className="p-1.5 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <Plus size={16} />
            </button>
          </Tooltip>
        </div>

      
      </div>
    </div>
  );
};

export default BottomToolbar;