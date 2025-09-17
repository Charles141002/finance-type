import React, { useState, useRef, useCallback } from 'react';

interface ResizerProps {
  onResize: (leftWidth: number, rightWidth: number) => void;
  initialLeftWidth?: number;
  initialRightWidth?: number;
}

const Resizer = ({ onResize, initialLeftWidth = 60, initialRightWidth = 40 }: ResizerProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [leftWidth, setLeftWidth] = useState(initialLeftWidth);
  const [rightWidth, setRightWidth] = useState(initialRightWidth);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);
  const startLeftWidthRef = useRef<number>(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    startLeftWidthRef.current = leftWidth;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, [leftWidth]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const deltaX = e.clientX - startXRef.current;
    const deltaPercent = (deltaX / containerWidth) * 100;
    
    const newLeftWidth = Math.max(20, Math.min(80, startLeftWidthRef.current + deltaPercent));
    const newRightWidth = 100 - newLeftWidth;

    setLeftWidth(newLeftWidth);
    setRightWidth(newRightWidth);
    onResize(newLeftWidth, newRightWidth);
  }, [isDragging, onResize]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, []);

  // Ajouter les event listeners pour le drag
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '8px',
        backgroundColor: isDragging ? '#3b82f6' : '#e1e5e9',
        cursor: 'col-resize',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: isDragging ? 'none' : 'background-color 0.2s ease',
        zIndex: 10
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Indicateur visuel du resizer */}
      <div
        style={{
          width: '2px',
          height: '40px',
          backgroundColor: isDragging ? '#ffffff' : '#9ca3af',
          borderRadius: '1px',
          transition: isDragging ? 'none' : 'background-color 0.2s ease'
        }}
      />
      
      {/* Zone de hover plus large pour faciliter la saisie */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '-4px',
          right: '-4px',
          bottom: 0,
          cursor: 'col-resize'
        }}
      />
    </div>
  );
};

export default Resizer;