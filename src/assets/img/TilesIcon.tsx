import React from 'react';

interface TilesIconProps {
  className?: string;
}

export const TilesIcon: React.FC<TilesIconProps> = ({ className }) => {
  return (
    <div className={className} style={{
      width: '16px',
      height: '16px',
      position: 'relative',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1px'
    }}>
      {/* Четыре квадратика */}
      <div style={{
        width: '7px',
        height: '7px',
        border: '2px solid currentColor',
        borderRadius: '1px'
      }}></div>
      <div style={{
        width: '7px',
        height: '7px',
        border: '2px solid currentColor',
        borderRadius: '1px'
      }}></div>
      <div style={{
        width: '7px',
        height: '7px',
        border: '2px solid currentColor',
        borderRadius: '1px'
      }}></div>
      <div style={{
        width: '7px',
        height: '7px',
        border: '2px solid currentColor',
        borderRadius: '1px'
      }}></div>
    </div>
  );
};