import React, { memo } from "react";

const index = memo(
  ({
    id,
    name,
    type,
    value,
    hidden,
    onBlur,
    checked,
    onChange,
    required,
    multiple,
    maxLength,
    className,
    placeholder,
  }) => {
    return (
      <>
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onBlur={onBlur}
          hidden={hidden}
          checked={checked}
          required={required}
          multiple={multiple}
          onChange={onChange}
          maxLength={maxLength}
          className={className}
          placeholder={placeholder}
        />
      </>
    );
  }
);

export default index;
