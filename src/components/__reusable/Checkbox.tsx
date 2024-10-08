import React from "react";

interface CheckboxProps {
  name: string;
  label: string;
  isChecked: boolean;
  disabled?: boolean;
  onChange: (status: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  label,
  isChecked,
  disabled = false,
  onChange,
}) => {
  return (
    <div className="h-full flex items-center space-x-1">
      <input
        type="checkbox"
        className="w-5 h-5"
        id={name}
        name={name}
        checked={isChecked}
        disabled={disabled}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.checked)
        }
      />
      <label htmlFor={name} className="break-keep">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
