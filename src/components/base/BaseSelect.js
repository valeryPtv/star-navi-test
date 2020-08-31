import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as IconOpen } from 'icons/chevron-down-solid.svg';

const BaseSelect = ({ options, onChange, className }) => {
  const [inputValue, setInputValue] = useState(null);
  const [isDropDownShown, toggleDropdown] = useState(false);

  const handleOptionClick = option => {
    setInputValue(option);
    onChange(option.value);
  };

  return (
    <div
      className={`base-select ${className}`}
      role="button"
      tabIndex="0"
      aria-expanded={isDropDownShown}
      onClick={() => toggleDropdown(!isDropDownShown)}
      onBlur={() => toggleDropdown(false)}
    >
      <div className="base-select__header">
        { inputValue === null ? 'Pick game mode' : inputValue.text }
        <IconOpen className="base-select__status-icon" />
      </div>
      <ul className={`base-select__options-list ${isDropDownShown ? 'base-select__options-list--active' : ''}`} role="listbox">
        {
          options.map(option => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <li
              key={option.key}
              className={`base-select__option ${inputValue && inputValue.value === option.value ? 'base-select__option--choosen' : ''}`}
              onClick={() => handleOptionClick(option)}
              role="option"
              aria-selected={inputValue && option.value === inputValue.value}
            >
              { option.text }
            </li>
          ))
        }
      </ul>
    </div>
  );
};

BaseSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.shape({
      delay: PropTypes.number,
      field: PropTypes.number
    }),
    text: PropTypes.string
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string
};

BaseSelect.defaultProps = {
  className: ''
};

export default BaseSelect;
