import React, { Fragment } from "react";

interface RadioButtonProps {
  name: string;
  label: string;
  value: string;
  isChecked: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  name,
  label,
  value,
  isChecked,
  disabled = false,
  onChange,
}) => {
  return (
    <Fragment>
      <input
        type="radio"
        id={value}
        name={name}
        value={value}
        checked={isChecked}
        onChange={(e) => onChange && onChange(e.target.value)}
        disabled={disabled}
      />
      <label htmlFor={value}>{label}</label>
    </Fragment>
  );
};

export default RadioButton;
