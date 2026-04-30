import React from 'react';
import * as Icons from 'lucide-react';

const InteractiveCard = ({ option, onClick }) => {
  const IconComponent = Icons[option.icon] || Icons.ChevronRight;

  return (
    <button className="interactive-card" onClick={() => onClick(option)}>
      <div className="card-icon-wrapper">
        <IconComponent size={24} className="card-icon" />
      </div>
      <div className="card-content">
        <span className="card-title">{option.label}</span>
        {option.desc && <span className="card-desc">{option.desc}</span>}
      </div>
      <Icons.ChevronRight size={18} className="card-arrow" />
    </button>
  );
};

export default InteractiveCard;
