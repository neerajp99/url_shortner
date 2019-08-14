import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const InputFieldGroup = ({ placeholder, name, onChange, value }) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <input
          className={classnames("form-control form-control-lg")}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
};

export default InputFieldGroup;
