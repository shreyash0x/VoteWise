import React from 'react';
import { Lightbulb } from 'lucide-react';

const FactCard = ({ fact }) => {
  if (!fact) return null;

  return (
    <div className="fact-card animate-fade-in-up">
      <div className="fact-icon">
        <Lightbulb size={20} />
      </div>
      <div className="fact-text">
        {fact}
      </div>
    </div>
  );
};

export default FactCard;
