// Collapsible.js

import React, { useEffect, useRef, useState } from 'react';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';

const Collapsible = ({ title, isOpen = false, children }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);

  const toggleCollapsible = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (isOpen) {
      setOpen(isOpen);
    }
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = open ? `${contentRef.current.scrollHeight}px` : '0';
    }
  }, [open]);

  return (
    <div className={`collapsible-accordion ${open ? 'open' : ''}`}>
      <button
        type="button"
        className={`collapsible-header ${open ? 'open' : ''}`}
        onClick={toggleCollapsible}
      >
        <h5>{title}</h5>
        <span className="arrow">
          {open ? <SlArrowUp style={{ color: '#202020' }} /> : <SlArrowDown style={{ color: '#202020' }} />}
        </span>
      </button>
      <div
        ref={contentRef}
        style={{
          maxHeight: open ? `${contentRef.current.scrollHeight}px` : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease-out'
        }}
      >
        <div className="collapsible-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Collapsible;
