import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Tooltip = ({ children }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { t, i18n } = useTranslation();

  return (
    <div 
      onMouseEnter={() => setShowTooltip(true)} 
      onMouseLeave={() => setShowTooltip(false)} 
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {children}
      {showTooltip && (
        <div className='recommend__tooltip-text'
         
        >
          {t('Chat.tooltip1')}
          <br></br>
          {t('Chat.tooltip2')}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
