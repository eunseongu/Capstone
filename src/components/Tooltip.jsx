import React, { useState } from 'react';

const Tooltip = ({ text, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div 
      onMouseEnter={() => setShowTooltip(true)} 
      onMouseLeave={() => setShowTooltip(false)} 
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {children}
      {showTooltip && (
        <div 
          style={{ position: 'absolute', top: '100%', left: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', color: '#fff', padding: '5px', borderRadius: '5px' }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
