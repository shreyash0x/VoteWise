import React from 'react';
import { Lightbulb } from 'lucide-react';

const FactCard = ({ fact }) => {
  if (!fact) return null;

  return (
    <aside className="fact-card animate-fade-in-up" aria-label="Did you know?">
      <div className="fact-icon">
        <Lightbulb size={20} />
      </div>
      <div className="fact-text">
        {fact}
      </div>
    </aside>
  );
};

export default React.memo(FactCard);
