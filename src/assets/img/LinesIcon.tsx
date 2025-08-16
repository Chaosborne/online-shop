import React from 'react';

interface LinesIconProps {
  className?: string;
}

export const LinesIcon: React.FC<LinesIconProps> = ({ className }) => {
  return (
    <div className={className} style={{
      width: '16px',
      height: '16px',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '2px 0'
    }}>
      {/* Три горизонтальные линии справа */}
      <div style={{
        width: '10px',
        height: '2px',
        backgroundColor: 'currentColor',
        borderRadius: '1px',
        marginLeft: '5px'
      }}></div>
      <div style={{
        width: '10px',
        height: '2px',
        backgroundColor: 'currentColor',
        borderRadius: '1px',
        marginLeft: '5px'
      }}></div>
      <div style={{
        width: '10px',
        height: '2px',
        backgroundColor: 'currentColor',
        borderRadius: '1px',
        marginLeft: '5px'
      }}></div>
      
      {/* Три точки слева */}
      <div style={{
        position: 'absolute',
        left: '1px',
        top: '2px',
        width: '2px',
        height: '2px',
        backgroundColor: 'currentColor',
        borderRadius: '50%'
      }}></div>
      <div style={{
        position: 'absolute',
        left: '1px',
        top: '7px',
        width: '2px',
        height: '2px',
        backgroundColor: 'currentColor',
        borderRadius: '50%'
      }}></div>
      <div style={{
        position: 'absolute',
        left: '1px',
        top: '12px',
        width: '2px',
        height: '2px',
        backgroundColor: 'currentColor',
        borderRadius: '50%'
      }}></div>
    </div>
  );
};