import React from "react";

interface TextAreaProps {
  placeholder?: string;
  rows?: number;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  placeholder = "",
  rows = 3,
  value = "",
  onChange,
  className = "",
  disabled = false,
}) => {
  return (
    <textarea
      placeholder={placeholder}
      rows={rows}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
      className={`w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 disabled:opacity-50 ${className}`}
    />
  );
};

export default TextArea;
