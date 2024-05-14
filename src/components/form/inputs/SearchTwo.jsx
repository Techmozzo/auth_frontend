import React from 'react';
import { IoSearchSharp } from 'react-icons/io5';

const SearchInputTwo = ({
  className, disabled, error, placeholder,
  name, onBlur, onChange, onFocus, onKeyDown, onKeyPress,
  readOnly, title, validations, value
}) => (
  <div className={`${error?.length > 0 ? `${className} col-12` : `${className}`} search-input-two`}>
    <input
      className={error?.length > 0 ? 'error-field' : ''}
      type="text"
      placeholder={placeholder}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      title={title}
      readOnly={readOnly}
      onBlur={((e) => typeof onBlur === 'function'
        && onBlur(e, validations))}
      disabled={disabled}
      onKeyPress={onKeyPress}
      onKeyDown={onKeyDown}
    />
    <button type="button" className="text-theme-gray-dark" aria-label="search">
      <IoSearchSharp />
    </button>
  </div>
);

export default SearchInputTwo;
