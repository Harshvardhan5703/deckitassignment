"use client";

import React from 'react';
import { ElementType } from '@/types/elements';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Palette,
  Move3D,
  Square,
  Strikethrough
} from 'lucide-react';

interface FloatingToolbarProps {
  element: ElementType;
  x: number;
  y: number;
  onUpdate: (updates: Partial<ElementType>) => void;
  onClose: () => void;
}

const FloatingToolbar: React.FC<FloatingToolbarProps> = ({
  element,
  x,
  y,
  onUpdate,
  onClose
}) => {
  const handleStyleUpdate = (styleUpdates: Partial<ElementType['style']>) => {
    onUpdate({
      style: {
        ...element.style,
        ...styleUpdates
      }
    });
  };

  const renderTextControls = () => (
    <>
      <select
        value={element.style.fontFamily || 'Inter'}
        onChange={(e) => handleStyleUpdate({ fontFamily: e.target.value })}
        className="flex items-center py-1 px-1.5 bg-[rgb(0,0,0,.03)] text-sm text-gray-900"
      >
        <option value="Inter">Inter</option>
        <option value="Arial">Arial</option>
        <option value="Times New Roman">Times</option>
        <option value="Georgia">Georgia</option>
      </select>

      <select
        value={element.style.fontSize || '16px'}
        onChange={(e) => handleStyleUpdate({ fontSize: e.target.value })}
        className="inline-flex items-center h-7 rounded-md bg-[rgb(0,0,0,.03)] overflow-hidden pl-1.5 pr-0.5 text-sm text-gray-900"
      >
        <option value="12px">12</option>
        <option value="14px">14</option>
        <option value="16px">16</option>
        <option value="18px">18</option>
        <option value="24px">24</option>
        <option value="32px">32</option>
      </select>

      <div className="flex items-center space-x-1">
        <button
          onClick={() => handleStyleUpdate({ 
            fontWeight: element.style.fontWeight === 'bold' ? 'normal' : 'bold' 
          })}
          className={`px-1.5 items-center justify-center min-w-[26px] h-8 text-[rgb(0,0,0,0.6)] cursor-pointer  rounded-lg ${element.style.fontWeight === 'bold' ? 'bg-[rgb(255,255,255,.7)]' : 'bg-gray-100'} hover:bg-[rgb(0,0,0,.03)]`}
        >
          <Bold size={16} className="  ${element.style.fontWeight === 'bold' ? 'text-[rgb(0,0,0,.9)]' : 'text-[rgb(0,0,0,0.6)]' " />
        </button>
        {/* flex px-1.5 items-center justify-center min-w-[26px] h-8 rounded-lg cursor-pointer text-gray-700" */}
        <button
          onClick={() => handleStyleUpdate({ 
            fontStyle: element.style.fontStyle === 'italic' ? 'normal' : 'italic' 
          })}
          className={`px-1.5 items-center justify-center min-w-[26px] h-8 text-[rgb(0,0,0,0.6)] cursor-pointer  rounded-lg ${element.style.fontWeight === 'italic' ? 'bg-[rgb(255,255,255,.7)]' : 'bg-gray-100'} hover:bg-[rgb(0,0,0,.03)]`}
        >
          <Italic size={16} className="  ${element.style.fontWeight === 'bold' ? 'text-[rgb(0,0,0,.9)]' : 'text-[rgb(0,0,0,0.6)]' " />
        </button>
        
        <button
          onClick={() => handleStyleUpdate({ 
            textDecoration: element.style.textDecoration === 'underline' ? 'none' : 'underline' 
          })}
className={`px-1.5 items-center justify-center min-w-[26px] h-8 text-[rgb(0,0,0,0.6)] cursor-pointer  rounded-lg ${element.style.fontWeight === 'underline' ? 'bg-[rgb(255,255,255,.7)]' : 'bg-gray-100'} hover:bg-[rgb(0,0,0,.03)]`}        >
          <Underline size={16} className="  ${element.style.fontWeight === 'bold' ? 'text-[rgb(0,0,0,.9)]' : 'text-[rgb(0,0,0,0.6)]' " />
        </button>

         <button
          onClick={() => handleStyleUpdate({ 
            textDecoration: element.style.textDecoration === 'strikethrough' ? 'none' : 'strikethrough' 
          })}
className={`px-1.5 items-center justify-center min-w-[26px] h-8 text-[rgb(0,0,0,0.6)] cursor-pointer  rounded-lg ${element.style.fontWeight === 'strikethrough' ? 'bg-[rgb(255,255,255,.7)]' : 'bg-gray-100'} hover:bg-[rgb(0,0,0,.03)]`}        >
          <Strikethrough size={16} className="  ${element.style.fontWeight === 'bold' ? 'text-[rgb(0,0,0,.9)]' : 'text-[rgb(0,0,0,0.6)]' " />
        </button>
      </div>

      <div className="w-px h-6 bg-gray-200">
  </div>

      <div className="flex items-center space-x-1">
        <button
          onClick={() => handleStyleUpdate({ textAlign: 'left' })}
className={`px-1.5 items-center justify-center min-w-[26px] h-8 text-[rgb(0,0,0,0.6)] cursor-pointer  rounded-lg ${element.style.fontWeight === 'left' ? 'bg-[rgb(255,255,255,.7)]' : 'bg-gray-100'} hover:bg-[rgb(0,0,0,.03)]`}               >
          <AlignLeft size={16} className="  ${element.style.fontWeight === 'bold' ? 'text-[rgb(0,0,0,.9)]' : 'text-[rgb(0,0,0,0.6)]' " />
        </button>
        
        <button
          onClick={() => handleStyleUpdate({ textAlign: 'center' })}
className={`px-1.5 items-center justify-center min-w-[26px] h-8 text-[rgb(0,0,0,0.6)] cursor-pointer  rounded-lg ${element.style.fontWeight === 'center' ? 'bg-[rgb(255,255,255,.7)]' : 'bg-gray-100'} hover:bg-[rgb(0,0,0,.03)]`}                >
          <AlignCenter size={16} className="  ${element.style.fontWeight === 'bold' ? 'text-[rgb(0,0,0,.9)]' : 'text-[rgb(0,0,0,0.6)]' " />
        </button>
        
        <button
          onClick={() => handleStyleUpdate({ textAlign: 'right' })}
className={`px-1.5 items-center justify-center min-w-[26px] h-8 text-[rgb(0,0,0,0.6)] cursor-pointer  rounded-lg ${element.style.fontWeight === 'right' ? 'bg-[rgb(255,255,255,.7)]' : 'bg-gray-100'} hover:bg-[rgb(0,0,0,.03)]`}                >
          <AlignRight size={16} className="  ${element.style.fontWeight === 'bold' ? 'text-[rgb(0,0,0,.9)]' : 'text-[rgb(0,0,0,0.6)]' " />
        </button>
      </div>
      <div className="w-px h-6 bg-gray-200">
  </div>
      <input
        type="color"
        value={element.style.color || '#000000'}
        onChange={(e) => handleStyleUpdate({ color: e.target.value })}
        className="w-8 h-8  border-none rounded-full cursor-pointer"
        title="Text Color"
      />

      <input
        type="color"
        value={element.style.backgroundColor === 'transparent' ? '#ffffff' : (element.style.backgroundColor || '#ffffff')}
        onChange={(e) => handleStyleUpdate({ backgroundColor: e.target.value })}
        className="w-8 h-8 rounded-full border-none cursor-pointer"
        title="Background Color"
      />
    </>
  );

  const renderShapeControls = () => (
    <>
      <input
        type="color"
        value={element.style.backgroundColor || '#E5E7EB'}
        onChange={(e) => handleStyleUpdate({ backgroundColor: e.target.value })}
        className="w-8 h-8 rounded border-none cursor-pointer"
        title="Fill Color"
      />

      <input
        type="color"
        value={element.style.borderColor || '#9CA3AF'}
        onChange={(e) => handleStyleUpdate({ borderColor: e.target.value })}
        className="w-8 h-8 rounded border-none cursor-pointer"
        title="Border Color"
      />

      <select
        value={element.style.borderWidth || '1px'}
        onChange={(e) => handleStyleUpdate({ borderWidth: e.target.value })}
        className={`px-1.5 items-center justify-center min-w-[26px] h-8 text-[rgb(0,0,0,0.6)] cursor-pointer  rounded-lg ${element.style.fontWeight === 'center' ? 'bg-[rgb(255,255,255,.7)]' : 'bg-gray-100'} hover:bg-[rgb(0,0,0,.03)]`}  
      >
        <option value="0px">0px</option>
        <option value="1px">1px</option>
        <option value="2px">2px</option>
        <option value="4px">4px</option>
      </select>

      <select
        value={element.style.borderRadius || '4px'}
        onChange={(e) => handleStyleUpdate({ borderRadius: e.target.value })}
        className={`px-1.5 items-center justify-center min-w-[26px] h-8 text-[rgb(0,0,0,0.6)] cursor-pointer  rounded-lg ${element.style.fontWeight === 'center' ? 'bg-[rgb(255,255,255,.7)]' : 'bg-gray-100'} hover:bg-[rgb(0,0,0,.03)]`}  
      >
        <option value="0px">0px</option>
        <option value="4px">4px</option>
        <option value="8px">8px</option>
        <option value="16px">16px</option>
        <option value="50%">Circle</option>
      </select>
    </>
  );
  
  const renderImageControls = () => (
    <>
      <button className="px-3 py-1.5 bg-gray-600 hover:bg-gray-500 text-white text-sm rounded">
        Replace
      </button>
      
      <button className="px-3 py-1.5 bg-gray-600 hover:bg-gray-500 text-white text-sm rounded">
        Crop
      </button>

      <div className="flex items-center space-x-2">
        <span className="text-white text-sm">Opacity:</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={element.style.opacity || '1'}
          onChange={(e) => handleStyleUpdate({ opacity: e.target.value })}
          className="w-16"
        />
      </div>
    </>
  );
// fixed px-1.5 py-1 box-border whitespace-nowrap cursor-move z-[103] opacity-0 transition-opacity duration-150 bg-gray-900/70 backdrop-blur-md rounded-2xl shadow-xl"
  return (
    <div
      className="floating-toolbar absolute z-50 bg-[rgb(255,255,255,.7)] rounded-lg shadow-lg px-1.5 py-1 flex items-center space-x-2 "
      style={{
        left: Math.max(10, x - 150),
        top: Math.max(10, y),
      }}
    >
      {element.type === 'text' && renderTextControls()}
      {element.type === 'shape' && renderShapeControls()}
      {element.type === 'image' && renderImageControls()}
      {element.type === 'icon' && renderImageControls()}

      {/* <div className="w-px h-6 bg-gray-600 mx-2" />
      
      <button
        onClick={onClose}
        className="p-1.5 bg-gray-600 hover:bg-gray-500 text-white rounded"
      >
        ✕
      </button> */}
    </div>
  );
};

export default FloatingToolbar;