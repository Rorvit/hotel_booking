import React, { useState } from "react";
import PropTypes from "prop-types";
const DateField = ({ label, type, name, value, onChange, error, min }) => {
  const getInputClasses = () => {
    return "form-control " + (error ? "is-invalid" : "");
  };

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  return (
    // <div className="form-floating col-md-2">
      <div className="col-auto">
      <input
        className={getInputClasses()}
        label={label}
        type={type}
        name={name}
        value={value}
        min={min}
        onChange={handleChange}
      />
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

DateField.defaultProps = {
  type: "text",
};
export default DateField;
DateField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
};
