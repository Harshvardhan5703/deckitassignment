"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Square, Circle, Triangle, Star, Heart, Zap, Smile, Flag, 
  Cloud, Moon, Sun, Minus, ArrowRight, MoreHorizontal 
} from 'lucide-react';
import { ElementType } from '@/types/elements'; 

interface SlideElementProps {
  element: ElementType;
  isSelected: boolean;
  onSelect: () => void;
  onDoubleClick: (x: number, y: number) => void;
  onUpdate: (updates: Partial<ElementType>) => void;
}

const SlideElement: React.FC<SlideElementProps> = ({
  element,
  isSelected,
  onSelect,
  onDoubleClick,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  // State for table cell editing
  const [editingCell, setEditingCell] = useState<{ row: number; col: number } | null>(null);
  
  const elementRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { style } = element;

 
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate({ content: e.target.value });
  };

  const handleTextBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setIsEditing(false);
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };



  // --- Dragging/Resizing Logic ---
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Prevent drag/resize if currently editing text or a table cell
    if (isEditing || editingCell) return;
    
    e.stopPropagation();
    onSelect();
    
    const target = e.target as HTMLElement;
    if (target.classList.contains('resize-handle')) {
      setIsResizing(true);
      setResizeHandle(target.dataset.handle || null);
      return;
    }

    // Start dragging
    setIsDragging(true);
    setDragStart({
      x: e.clientX - element.x,
      y: e.clientY - element.y,
    });
  }, [onSelect, element.x, element.y, isEditing, editingCell]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      onUpdate({ x: Math.max(0, newX), y: Math.max(0, newY) });
    } else if (isResizing && resizeHandle) {
      const rect = elementRef.current?.getBoundingClientRect();
      if (!rect) return;

      let newWidth = element.width;
      let newHeight = element.height;
      let newX = element.x;
      let newY = element.y;

      // Logic to calculate new dimensions based on the resize handle
      switch (resizeHandle) {
        case 'se':
          newWidth = Math.max(20, e.clientX - rect.left);
          newHeight = Math.max(20, e.clientY - rect.top);
          break;
        case 'sw':
          const deltaX = rect.left - e.clientX;
          newWidth = Math.max(20, element.width + deltaX);
          newHeight = Math.max(20, e.clientY - rect.top);
          newX = element.x - deltaX;
          break;
        case 'ne':
          const deltaY = rect.top - e.clientY;
          newWidth = Math.max(20, e.clientX - rect.left);
          newHeight = Math.max(20, element.height + deltaY);
          newY = element.y - deltaY;
          break;
        case 'nw':
          const deltaXNW = rect.left - e.clientX;
          const deltaYNW = rect.top - e.clientY;
          newWidth = Math.max(20, element.width + deltaXNW);
          newHeight = Math.max(20, element.height + deltaYNW);
          newX = element.x - deltaXNW;
          newY = element.y - deltaYNW;
          break;
        case 'n':
          const deltaYN = rect.top - e.clientY;
          newHeight = Math.max(20, element.height + deltaYN);
          newY = element.y - deltaYN;
          break;
        case 's':
          newHeight = Math.max(20, e.clientY - rect.top);
          break;
        case 'e':
          newWidth = Math.max(20, e.clientX - rect.left);
          break;
        case 'w':
          const deltaXW = rect.left - e.clientX;
          newWidth = Math.max(20, element.width + deltaXW);
          newX = element.x - deltaXW;
          break;
      }

      onUpdate({ width: newWidth, height: newHeight, x: newX, y: newY });
    }
  }, [isDragging, isResizing, resizeHandle, dragStart, element, onUpdate]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeHandle(null);
  }, []);

  // Effect to attach/detach global mouse listeners for drag/resize
  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

  // --- Utility Functions ---
  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      zap: Zap, smile: Smile, flag: Flag, cloud: Cloud, moon: Moon, sun: Sun, 
      star: Star, heart: Heart, square: Square, circle: Circle, triangle: Triangle,
      minus: Minus, arrowright: ArrowRight, morehorizontal: MoreHorizontal, 
    };
    return icons[iconName?.toLowerCase()] || Smile;
  };

  //  Content Rendering Logic 
  const renderContent = () => {
    const { type, content, subtype } = element;

    switch (type) {
      case 'text':
        return isEditing ? (
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleTextChange}
            onBlur={handleTextBlur}
            onKeyDown={handleKeyDown}
            className="w-full h-full resize-none outline-none p-2"
            style={{ ...style, backgroundColor: style?.backgroundColor === 'transparent' ? 'rgba(255, 255, 255, 0.5)' : style?.backgroundColor }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center p-2 text-left resize-none outline-none cursor-text"
            style={{ ...style, whiteSpace: 'pre-wrap' }}
          >
            {content}
          </div>
        );

      case 'html':
        return (
          <div
            className="w-full h-full"
            dangerouslySetInnerHTML={{ __html: content }}
            onBlur={handleHtmlBlur}
          />
        );

      case 'shape':
        const shapeStyle = {
          width: '100%',
          height: '100%',
        };
        switch (subtype) {
          case 'circle':
            return <div className="w-full h-full rounded-full" style={shapeStyle} />;
          case 'rectangle':
            return <div className="w-full h-full" style={shapeStyle} />;
          case 'triangle':
            return (
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: `${element.width / 2}px solid transparent`,
                  borderRight: `${element.width / 2}px solid transparent`,
                  borderBottom: `${element.height}px solid ${style?.backgroundColor || '#000'}`,
                  backgroundColor: 'transparent',
                  border: 'none',
                }}
              />
            );
          default:
            return null;
        }

      case 'line':
        return (
          <div
            style={{
              ...style,
              width: '100%',
              height: '100%',
            }}
          />
        );

      case 'icon':
        const IconComponent = getIconComponent(subtype || 'smile');
        return (
          <div className="flex items-center justify-center w-full h-full" style={style}>
            <IconComponent size={Math.min(element.width, element.height) * 0.8} />
          </div>
        );

      case 'image':
        return (
          <img
            src={content}
            alt="element content"
            className="w-full h-full object-cover"
            style={style}
          />
        );

      case 'table':
        try {
          const tableData = JSON.parse(content);
          const { data } = tableData;
          return (
            <div className="w-full h-full overflow-hidden" style={style}>
              <table className="w-full h-full border-collapse">
                <tbody>
                  {data.map((row: string[], rowIndex: number) => (
                    <tr key={rowIndex}>
                      {row.map((cell: string, colIndex: number) => (
                        <td
                          key={colIndex}
                          className="p-2 border border-gray-300"
                          onClick={() => {
                            if (!isSelected) return onSelect();
                            setEditingCell({ row: rowIndex, col: colIndex });
                          }}
                        >
                          {editingCell?.row === rowIndex && editingCell?.col === colIndex ? (
                            <input
                              type="text"
                              value={cell}
                              autoFocus
                              onChange={(e) => {
                                const newData = [...data];
                                newData[rowIndex][colIndex] = e.target.value;
                                onUpdate({ content: JSON.stringify({ ...tableData, data: newData }) });
                              }}
                              onBlur={() => setEditingCell(null)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  setEditingCell(null);
                                }
                              }}
                              className="w-full bg-transparent border-none outline-none"
                            />
                          ) : (
                            cell
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        } catch (e) {
          return <div className="text-sm text-red-500 p-2">Invalid table data</div>;
        }
        
      default:
        return null;
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const rect = elementRef.current?.getBoundingClientRect();
    if (rect) {
      onDoubleClick(rect.left + rect.width / 2, rect.top);
    }
    
    if (element.type === 'text') {
      setIsEditing(true);
    } 
  };

  return (
    <div
      ref={elementRef}
      className={`absolute cursor-move select-none ${isSelected ? 'ring-2 ring-blue-500' : ''} ${isDragging ? 'opacity-75' : ''}`}
      style={{
        left: element.x,
        top: element.y,
        width: element.width,
        height: element.height,
       
        zIndex: isSelected ? 10 : 1, 
        ...element.style,
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      {renderContent()}
      
      {isSelected && (
        <>
          {/* Resize handles - standard corner and edge handles */}
          <div className="resize-handle absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-se-resize" data-handle="se" />
          <div className="resize-handle absolute -top-1 -right-1 w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-ne-resize" data-handle="ne" />
          <div className="resize-handle absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-sw-resize" data-handle="sw" />
          <div className="resize-handle absolute -top-1 -left-1 w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-nw-resize" data-handle="nw" />
          
          <div className="resize-handle absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-n-resize" data-handle="n" />
          <div className="resize-handle absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-s-resize" data-handle="s" />
          <div className="resize-handle absolute -left-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-w-resize" data-handle="w" />
          <div className="resize-handle absolute -right-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-e-resize" data-handle="e" />
        </>
      )}
    </div>
  );
};

export default SlideElement;