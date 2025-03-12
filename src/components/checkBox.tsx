import React, { useState } from 'react';

interface CheckboxProps {
  label: string;
  onChange: (isChecked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onChange(newCheckedState); // Passa o estado do checkbox para a função onChange
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        style={{
          width: '20px', // Tamanho maior do checkbox
          height: '20px', // Tamanho maior do checkbox
          marginRight: '12px', // Distância entre o checkbox e o label
          cursor: 'pointer',
        }}
      />
      <label style={{ fontSize: '16px', cursor: 'pointer' }}>{label}</label>
    </div>
  );
};

export default Checkbox;