import React from "react";
import Switch from "react-switch";

interface ToggleSwitchProps {
  leftLabel: string;
  rightLabel: string;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  leftLabel,
  rightLabel,
  isChecked,
  onChange,
}) => {
  return (
    <div className="w-full flex justify-between items-center space-x-2">
      <p>{leftLabel}</p>
      <Switch
        uncheckedIcon={false}
        checkedIcon={false}
        onColor="#00A09B"
        onChange={onChange}
        checked={isChecked}
      />
      <p>{rightLabel}</p>
    </div>
  );
};

export default ToggleSwitch;
