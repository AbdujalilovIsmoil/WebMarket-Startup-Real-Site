import React, { memo } from "react";

const index = memo(
  ({
    id,
    ref,
    name,
    type,
    value,
    style,
    hidden,
    onBlur,
    checked,
    onFocus,
    onPaste,
    required,
    multiple,
    disabled,
    onChange,
    maxLength,
    className,
    minLength,
    placeholder,
    onKeyDown,
    autoComplete,
  }) => {
    return (
      <>
        <input
          id={id}
          ref={ref}
          type={type}
          style={style}
          name={name}
          value={value}
          onBlur={onBlur}
          hidden={hidden}
          onPaste={onPaste}
          disabled={disabled}
          checked={checked}
          onFocus={onFocus}
          required={required}
          multiple={multiple}
          onChange={onChange}
          className={className}
          minLength={minLength}
          maxLength={maxLength}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          autoComplete={autoComplete}
        />
      </>
    );
  }
);

export default index;
