import React, { useState, useRef } from "react";

import HideIcon from "assets/icons/HideIcon";
import ShowIcon from "assets/icons/ShowIcon";

interface PasswordInputProps {
  name: string;
  placeholder: string;
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  placeholder,
  value,
  disabled,
  onChange,
}) => {
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    if (!passwordInputRef) return;
    if (!passwordInputRef.current) return;

    const isShow = !isShowPassword;
    if (isShow) {
      passwordInputRef.current.type = "text";
    } else {
      passwordInputRef.current.type = "password";
    }
    setIsShowPassword(isShow);
  };

  return (
    <div className="w-full">
      <div className="w-full p-3 rounded-lg border border-[#9B9B9B] bg-white flex flex-row">
        <input
          ref={passwordInputRef}
          className="w-full outline-none disabled:bg-white/50"
          type="password"
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
        />
        <button
          type="button"
          className="justify-self-center"
          onClick={toggleShowPassword}
        >
          {isShowPassword ? (
            <HideIcon width={32} height={32} color={"#666666"} />
          ) : (
            <ShowIcon width={32} height={32} color={"#666666"} />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
