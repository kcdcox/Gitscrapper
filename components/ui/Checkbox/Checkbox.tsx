import React from "react";

import styles from "./checkbox.module.scss";

interface Props {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange(selected: string, id: string): void;
}

const Checkbox = ({
  name,
  disabled,
  type,
  placeholder,
  label,
  onChange,
}: Props) => {
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
        disabled={disabled ?? false}
        defaultValue={placeholder ?? ""}
        className={styles.input}
        onChange={handleChange}
      />
    </div>
  );
};

export default Checkbox;
