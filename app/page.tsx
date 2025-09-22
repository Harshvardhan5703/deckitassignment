"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';
import Sidebar from '@/components/LeftSidebar';
import TopToolbar from '@/components/TopBar';
import SlideCanvas from '@/components/SlideCanvas';
import BottomToolbar from '@/components/BottomToolBar';
import FloatingToolbar from '@/components/FloatingToolBar';
import { ElementType } from '@/types/elements';

export default function Home() {
  const [elements, setElements] = useState<ElementType[]>([
    {
      id: '1',
      type: 'text',
      content: 'India',
      x: 200,
      y: 150,
      width: 500,
      height: 120,
      style: {
        fontSize: '48px',
        fontFamily: 'Inter',
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: '#000000',
        textAlign: 'left',
        lineHeight: '1.2',
        padding: '20px',
      }
    },
    {
      id: '2',
      type: 'text',
      content: 'Harsh',
      x: 850,
      y: 350,
      width: 120,
      height: 40,
      style: {
        fontSize: '24px',
        fontFamily: 'Inter',
        fontWeight: 'normal',
        color: '#000000',
        backgroundColor: 'transparent',
        textAlign: 'right',
        lineHeight: '1.4',
      }
    },
    {
      id: '3',
      type: 'text',
      content: '2025/09/22',
      x: 850,
      y: 390,
      width: 120,
      height: 30,
      style: {
        fontSize: '18px',
        fontFamily: 'Inter',
        fontWeight: 'normal',
        color: '#666666',
        backgroundColor: 'transparent',
        textAlign: 'right',
        lineHeight: '1.4',
      }
    },
    {
      id: '4',
      type: 'shape',
      content: '',
      x: 50,
      y: 100,
      width: 120,
      height: 400,
      style: {
        backgroundColor: '#CCFF00',
        borderColor: 'transparent',
        borderWidth: '0px',
        borderRadius: '0px',
      },
      subtype: 'rectangle'
    },
    {
      id: '5',
      type: 'shape',
      content: '',
      x: 300,
      y: 450,
      width: 400,
      height: 60,
      style: {
        backgroundColor: '#CCFF00',
        borderColor: 'transparent',
        borderWidth: '0px',
        borderRadius: '0px',
      },
      subtype: 'rectangle'
    },
    {
      id: '6',
      type: 'shape',
      content: '',
      x: 700,
      y: 450,
      width: 300,
      height: 60,
      style: {
        backgroundColor: '#000000',
        borderColor: 'transparent',
        borderWidth: '0px',
        borderRadius: '0px',
      },
      subtype: 'rectangle'
    }
  ]);

  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [floatingToolbar, setFloatingToolbar] = useState<{
    visible: boolean;
    x: number;
    y: number;
    elementId: string | null;
  }>({
    visible: false,
    x: 0,
    y: 0,
    elementId: null
  });

  const canvasRef = useRef<HTMLDivElement>(null);

  const handleElementSelect = useCallback((elementId: string) => {
    setSelectedElement(elementId);
  }, []);

  const handleElementDoubleClick = useCallback((elementId: string, x: number, y: number) => {
    const element = elements.find(el => el.id === elementId);
    if (!element) return;
    
    setFloatingToolbar({
      visible: true,
      x,
      y: y - 60,
      elementId
    });
  }, [elements]);

  const handleElementUpdate = useCallback((elementId: string, updates: Partial<ElementType>) => {
    setElements(prev => prev.map(el => 
      el.id === elementId ? { ...el, ...updates } : el
    ));
  }, []);

  const getElementDefaults = (type: string, subtype?: string) => {
    const baseDefaults = {
      x: 400,
      y: 300,
    };

    switch (type) {
      case 'text':
        return {
          ...baseDefaults,
          content: 'New text element',
          width: 200,
          height: 40,
          style: {
            fontSize: '16px',
            fontFamily: 'Inter',
            fontWeight: 'normal',
            color: '#000000',
            backgroundColor: 'transparent',
            textAlign: 'left',
            lineHeight: '1.5',
            padding: '8px',
          }
        };

      case 'shape':
        const shapeDefaults = {
          ...baseDefaults,
          content: '',
          width: subtype === 'circle' ? 100 : 150,
          height: subtype === 'circle' ? 100 : 100,
          subtype,
          style: {
            backgroundColor: '#3B82F6',
            borderColor: '#1E40AF',
            borderWidth: '2px',
            borderRadius: subtype === 'circle' ? '50%' : subtype === 'rectangle' ? '8px' : '0px',
          }
        };

        if (subtype === 'triangle') {
          shapeDefaults.style.backgroundColor = 'transparent';
          shapeDefaults.style.borderColor = '#3B82F6';
          shapeDefaults.style.borderWidth = '0px';
        }

        return shapeDefaults;

      case 'line':
        return {
          ...baseDefaults,
          content: '',
          width: 200,
          height: subtype === 'straight' ? 2 : 4,
          subtype,
          style: {
            backgroundColor: subtype === 'dotted' ? 'transparent' : '#000000',
            borderColor: subtype === 'dotted' ? '#000000' : 'transparent',
            borderWidth: subtype === 'dotted' ? '2px' : '0px',
            borderStyle: subtype === 'dotted' ? 'dotted' : 'solid',
            borderRadius: '0px',
          }
        };

      case 'icon':
        return {
          ...baseDefaults,
          content: subtype || 'smile',
          width: 60,
          height: 60,
          subtype,
          style: {
            color: '#3B82F6',
            backgroundColor: 'transparent',
            fontSize: '48px',
          }
        };

      case 'image':
        return {
          ...baseDefaults,
          content: 'https://via.placeholder.com/200x150?text=Image',
          width: 200,
          height: 150,
          style: {
            borderRadius: '8px',
            objectFit: 'cover',
          }
        };

      case 'table':
        return {
          ...baseDefaults,
          content: JSON.stringify({
            rows: 3,
            cols: 3,
            data: Array(3).fill(null).map(() => Array(3).fill('Cell'))
          }),
          width: 300,
          height: 150,
          style: {
            backgroundColor: '#ffffff',
            borderColor: '#D1D5DB',
            borderWidth: '1px',
            borderRadius: '8px',
          }
        };

      default:
        return {
          ...baseDefaults,
          content: '',
          width: 100,
          height: 100,
          style: {
            backgroundColor: '#E5E7EB',
            borderColor: '#9CA3AF',
            borderWidth: '1px',
            borderRadius: '4px',
          }
        };
    }
  };

  const handleAddElement = useCallback((type: 'text' | 'shape' | 'image' | 'line' | 'table' | 'icon', subtype?: string, content?: string) => {
    const elementDefaults = getElementDefaults(type, subtype);
    
    const newElement: ElementType = {
      id: Date.now().toString(),
      type,
      ...elementDefaults,
      content: content ?? elementDefaults.content,
    };

    setElements(prev => [...prev, newElement]);
    setSelectedElement(newElement.id);
  }, []);

  const handleZoomChange = useCallback((newZoom: number) => {
    setZoomLevel(newZoom);
  }, []);

  const hideFloatingToolbar = useCallback(() => {
    setFloatingToolbar(prev => ({ ...prev, visible: false }));
  }, []);

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedElement(null);
      hideFloatingToolbar();
    }
  }, [hideFloatingToolbar]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        hideFloatingToolbar();
        setSelectedElement(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [hideFloatingToolbar]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (floatingToolbar.visible && !e.target?.closest?.('.floating-toolbar')) {
        hideFloatingToolbar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [floatingToolbar.visible, hideFloatingToolbar]);

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Top Navigation */}
      <TopToolbar />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-gray-200 relative">
          {/* Canvas Area */}
          <div className="flex-1 flex items-center justify-center p-8">
            <SlideCanvas
              ref={canvasRef}
              elements={elements}
              selectedElement={selectedElement}
              onElementSelect={handleElementSelect}
              onElementDoubleClick={handleElementDoubleClick}
              onElementUpdate={handleElementUpdate}
              onCanvasClick={handleCanvasClick}
              zoomLevel={zoomLevel}
              onZoomChange={handleZoomChange}
            /> 
          </div>

          {/* Bottom Toolbar */}
          <BottomToolbar 
            onAddElement={handleAddElement} 
            zoomLevel={zoomLevel} 
            onZoomChange={handleZoomChange}
          />
        </div>
      </div>

      {/* Floating Toolbar */}
      {floatingToolbar.visible && floatingToolbar.elementId && (
        <FloatingToolbar
          element={elements.find(el => el.id === floatingToolbar.elementId)!}
          x={floatingToolbar.x}
          y={floatingToolbar.y}
          onUpdate={(updates) => handleElementUpdate(floatingToolbar.elementId!, updates)}
          onClose={hideFloatingToolbar}
        />
      )} 
    </div>
  );
}