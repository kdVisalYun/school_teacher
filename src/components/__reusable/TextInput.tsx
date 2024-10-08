import React from "react";

interface TextInputProps {
  name: string;
  placeholder: string;
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  placeholder,
  value,
  disabled = false,
  onChange,
}) => {
  return (
    <input
      className="w-full p-3 rounded-lg outline-none border border-[#9B9B9B] disabled:bg-white/50 disabled:text-[#666666]"
      type="text"
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      autoComplete="off"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(e.target.value)
      }
    />
  );
};

export default TextInput;
