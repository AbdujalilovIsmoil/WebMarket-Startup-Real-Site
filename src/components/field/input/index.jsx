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
    onChange,
    maxLength,
    className,
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
          checked={checked}
          onFocus={onFocus}
          required={required}
          multiple={multiple}
          onChange={onChange}
          className={className}
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
