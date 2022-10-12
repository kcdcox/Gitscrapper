import React from "react";

import { SelectOption } from "../../../types";
import styles from "./select.module.scss";

interface Props {
  name: string;
  options: SelectOption[];
  value: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange(selected: string, id: string): void;
}

const Select = ({
  name,
  options,
  disabled,
  placeholder,
  label,
  value,
  onChange,
}: Props) => {
  const handleChange = onChange
    ? (event: React.ChangeEvent<HTMLSelectElement>) =>
        onChange(event.currentTarget.value, name)
    : undefined;

  return (
    <div className={styles.select__container}>
      {label && (
        <label className={styles.label} htmlFor={label}>
          {label}
        </label>
      )}
      <select
        name={name}
        disabled={disabled ?? false}
        value={value}
        className={styles.select__input}
        onChange={handleChange}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className={styles.select__option}
            disabled={opt.disabled ?? false}
          >
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
