import React from "react";

interface ComboBoxProps {
  label?: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  className?: string;
}

const ComboBox: React.FC<ComboBoxProps> = ({ label, options, onChange, className }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label className="mb-2 text-gray-700 font-medium">{label}</label>}

      <select
        onChange={(e) => onChange(e.target.value)}
        className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">Selecione uma opção</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ComboBox;
