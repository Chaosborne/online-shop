import React from 'react';

interface PriceSortIconProps {
  className?: string;
  isAscending?: boolean;
}

export const PriceSortIcon: React.FC<PriceSortIconProps> = ({ className, isAscending = true }) => {
  return (
    <div className={className} style={{
      width: '16px',
      height: '16px',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'all 0.3s ease'
    }}>
      {/* Три линии пирамидки */}
      <div style={{
        width: isAscending ? '25%' : '75%',
        height: '12.5%',
        backgroundColor: 'currentColor',
        borderRadius: '6.25%',
        marginBottom: '12.5%',
        transition: 'width 0.3s ease'
      }}></div>
      <div style={{
        width: '50%',
        height: '12.5%',
        backgroundColor: 'currentColor',
        borderRadius: '6.25%',
        marginBottom: '12.5%',
        transition: 'width 0.3s ease'
      }}></div>
      <div style={{
        width: isAscending ? '75%' : '25%',
        height: '12.5%',
        backgroundColor: 'currentColor',
        borderRadius: '6.25%',
        transition: 'width 0.3s ease'
      }}></div>
    </div>
  );
};