import React from 'react';
import { ChevronRight } from 'lucide-react';

const InteractiveCard = ({ option, onClick, IconComponent }) => {

  return (
    <button className="interactive-card" onClick={() => onClick(option)} aria-label={option.label}>
      <div className="card-icon-wrapper">
        <IconComponent size={24} className="card-icon" />
      </div>
      <div className="card-content">
        <span className="card-title">{option.label}</span>
        {option.desc && <span className="card-desc">{option.desc}</span>}
      </div>
      <ChevronRight size={18} className="card-arrow" />
    </button>
  );
};

export default React.memo(InteractiveCard);
