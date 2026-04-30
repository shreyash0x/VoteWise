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
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default OptionsList;
