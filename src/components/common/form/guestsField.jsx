import React from "react";
import PropTypes from "prop-types";
const GuestsField = ({ name, value = "2", onChange, label, error }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  const getInputClasses = () => {
    return "form-control " + (error ? "is-invalid" : "");
  };
  return (
    <div className="col-auto">
      <input
        className={getInputClasses()}
        label={label}
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
      />
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default GuestsField;
GuestsField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  error: PropTypes.string,
};
