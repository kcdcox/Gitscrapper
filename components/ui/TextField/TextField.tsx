import React from "react";

import styles from "./textfield.module.scss";

interface Props {
  name: string;
  type: string;
  value: string;
  label?: string;
  disabled?: boolean;
  onChange(selected: string, id: string): void;
}

const TextField = ({ name, disabled, value, type, label, onChange }: Props) => {
  const handleChange = onChange
    ? (event: React.ChangeEvent<HTMLInputElement>) =>
        onChange(event.currentTarget.value, name)
    : undefined;

  return (
    <div className={styles.input__container}>
      {label && (
        <label className={styles.label} htmlFor={label}>
          {label}
        </label>
      )}
      <input
        name={name}
        type={type}
        value={value}
        disabled={disabled ?? false}
        className={styles.input}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextField;
