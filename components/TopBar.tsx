"use client";

import React from 'react';
import { 
  ArrowLeft, 
  Undo, 
  Redo, 
  Save, 
  Play, 
  Download,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  MoreHorizontal
} from 'lucide-react';
import { Button } from './ui/button';

const TopToolbar: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
          <ArrowLeft size={16} />
          <span className="text-sm">Back</span>
        </button>
        
        <div className="flex items-center space-x-2">
          <button className="p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">
            <Undo size={16} />
          </button>
          <button className="p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">
            <Redo size={16} />
          </button>
        </div>
      </div>

      {/* Center Section */}
      <div className="flex items-center space-x-4">
        <span className="px-1.5 py-0.5 text-blue-600 text-sm leading-5 bg-blue-100 rounded-sm">something</span>
        <h1 className="text-sm px-1.5 py-0.5 rounded-sm flex items-center gap-1 text-gray-900 cursor-pointer transition-colors duration-300">title</h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500">Saved n minutes ago</span>

       <Button variant="ghost" size="sm" className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 bg-gray-200 rounded-lg cursor-pointer select-none font-medium text-sm leading-5 text-gray-700 transition-colors duration-300">
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>
        
        <button className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 bg-gray-200 rounded-lg cursor-pointer select-none font-medium text-sm leading-5 text-gray-700 transition-colors duration-300">
          <Play size={16} />
          <span>Play</span>
        </button>
        
        <button className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 bg-[#000000] rounded-lg cursor-pointer select-none font-medium text-sm leading-5 text-[#fff] transition-colors duration-300">
          <Download size={16} />
          <span>Download</span>
        </button>
      </div>
    </div>
  );
};

export default TopToolbar;