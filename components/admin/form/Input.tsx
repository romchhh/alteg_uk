import React from "react";

interface InputProps {
  type?: "text" | "number" | "email" | "password";
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  min?: string | number;
  step?: number;
  disabled?: boolean;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  id,
  name,
  placeholder,
  value,
  onChange,
  className = "",
  min,
  step,
  disabled = false,
  required = false,
}) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      min={min}
      step={step}
      disabled={disabled}
      required={required}
      className={`h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 disabled:opacity-50 ${className}`}
    />
  );
};

export default Input;
