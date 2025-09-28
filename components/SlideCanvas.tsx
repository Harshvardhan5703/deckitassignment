"use client";

import React, { forwardRef, useState, useRef, useEffect } from 'react';
import SlideElement from './SlideElement';
import { ElementType } from '@/types/elements';

interface SlideCanvasProps {
  elements: ElementType[];
  selectedElement: string | null;
  onElementSelect: (elementId: string) => void;
  onElementDoubleClick: (elementId: string, x: number, y: number) => void;
  onElementUpdate: (elementId: string, updates: Partial<ElementType>) => void;
  onCanvasClick: (e: React.MouseEvent) => void;
  zoomLevel: number;
  onZoomChange: (zoom: number) => void;
}

const SlideCanvas = forwardRef<HTMLDivElement, SlideCanvasProps>(({
  elements,
  selectedElement,
  onElementSelect,
  onElementDoubleClick,
  onElementUpdate,
  onCanvasClick,
  zoomLevel,
  onZoomChange
}, ref) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const zoom = zoomLevel / 100;

  // Handle zoom with mouse wheel
  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const zooml = 10; // 10% increments
      const delta = e.deltaY > 0 ? -zooml : zooml;
      const newZoomLevel = Math.max(10, Math.min(300, zoomLevel + delta));
      
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const zoomRatio = (newZoomLevel / 100) / zoom;
        const newX = position.x * zoomRatio + (mouseX * (1 - zoomRatio));
        const newY = position.y * zoomRatio + (mouseY * (1 - zoomRatio));
        
        onZoomChange(newZoomLevel);
        setPosition({ x: newX, y: newY });
      } else {
        onZoomChange(newZoomLevel);
      }
    }
  };

  //  ctrl + drag
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only start panning with middle mouse button or when ctrl is pressed
    if (e.button === 1 || e.ctrlKey) {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    } else {
      // For regular clicks, pass through to canvas
      onCanvasClick(e);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Reset zoom and position
  const resetView = () => {
    onZoomChange(100);
    setPosition({ x: 0, y: 0 });
  };

  // Handle zoom changes from toolbar
  const handleZoomIn = () => {
    const newZoom = Math.min(300, zoomLevel + 10);
    onZoomChange(newZoom);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(10, zoomLevel - 10);
    onZoomChange(newZoom);
  };

  //  keyboard shortcuts for zooming
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '0') {
        e.preventDefault();
        resetView();
      } else if (e.ctrlKey && e.key === '+') {
        e.preventDefault();
        handleZoomIn();
      } else if (e.ctrlKey && e.key === '-') {
        e.preventDefault();
        handleZoomOut();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomLevel, onZoomChange]);

  return (
    <div className="relative overflow-hidden" style={{ width: '100%', height: '100%' }}>
      {/* Zoom controls */}
     

      {/* Canvas container with pan and zoom */}
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div
          ref={ref}
          className="bg-white shadow-xl border border-gray-300 origin-top-left"
          style={{
            width: '1000px',
            height: '600px',
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            transition: isDragging ? 'none' : 'transform 0.1s ease'
          }}
        >
          {/* Background image placeholder */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: 'url("https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1000&h=600&fit=crop")',
            }}
          />
          
          <div className="absolute inset-0 overflow-hidden">
            {elements.map((element) => (
              <SlideElement
                key={element.id}
                element={element}
                isSelected={selectedElement === element.id}
                onSelect={() => onElementSelect(element.id)}
                onDoubleClick={(x, y) => onElementDoubleClick(element.id, x, y)}
                onUpdate={(updates) => onElementUpdate(element.id, updates)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

SlideCanvas.displayName = 'SlideCanvas';

export default SlideCanvas;