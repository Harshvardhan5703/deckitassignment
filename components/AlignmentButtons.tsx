import React, { useState } from 'react';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';

const AlignmentButtons = ({ element, handleStyleUpdate }) => {
  const [showAlignmentMenu, setShowAlignmentMenu] = useState(false);

  const toggleMenu = () => {
    setShowAlignmentMenu(!showAlignmentMenu);
  };

  const handleAlignmentClick = (alignment) => {
    handleStyleUpdate({ textAlign: alignment });
    setShowAlignmentMenu(false); // Close the menu after an option is selected
  };

  return (
    <div className="relative">
      {/* Main button to toggle the menu */}
      <button
        onClick={toggleMenu}
        className="p-1.5 rounded bg-gray-600 hover:bg-gray-500"
      >
        <AlignJustify size={16} className="text-white" />
      </button>

      {/* Alignment menu, conditionally rendered */}
      {showAlignmentMenu && (
        <div className="absolute top-full left-0 mt-2 p-1 rounded-md bg-gray-700 shadow-lg flex space-x-1 z-10">
          <button
            onClick={() => handleAlignmentClick('left')}
            className={`p-1.5 rounded ${element.style.textAlign === 'left' ? 'bg-blue-600' : 'bg-gray-600'} hover:bg-gray-500`}
          >
            <AlignLeft size={16} className="text-white" />
          </button>

          <button
            onClick={() => handleAlignmentClick('center')}
            className={`p-1.5 rounded ${element.style.textAlign === 'center' ? 'bg-blue-600' : 'bg-gray-600'} hover:bg-gray-500`}
          >
            <AlignCenter size={16} className="text-white" />
          </button>

          <button
            onClick={() => handleAlignmentClick('right')}
            className={`p-1.5 rounded ${element.style.textAlign === 'right' ? 'bg-blue-600' : 'bg-gray-600'} hover:bg-gray-500`}
          >
            <AlignRight size={16} className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AlignmentButtons;