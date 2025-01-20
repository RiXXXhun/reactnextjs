import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { ArrowUpward } from '@mui/icons-material';

const Materialzuscrollbutton: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      style={{
        position: 'fixed',
        right: 20,
        bottom: 20,
        zIndex: 1000,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      <Button
        onClick={scrollToTop}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '50%',
          padding: '10px',
          minWidth: 'auto',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
          transition: 'box-shadow 0.3s ease',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.boxShadow = '0 0 8px 2px rgba(30, 144, 255, 0.8)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.2)';
        }}
      >
        <ArrowUpward style={{ color: 'white' }} />
      </Button>
    </div>
  );
};

export default Materialzuscrollbutton;
