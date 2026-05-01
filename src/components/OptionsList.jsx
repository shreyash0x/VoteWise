import React from 'react';

const OptionsList = ({ options, onOptionSelect }) => {
  if (!options || options.length === 0) return null;

  return (
    <div className="options-container">
      {options.map((option, index) => (
        <button
          key={index}
          className="option-button"
          onClick={() => onOptionSelect(option)}
          aria-label={option.label}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default React.memo(OptionsList);
