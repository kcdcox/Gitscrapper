import React from "react";

import styles from "./checkbox.module.scss";

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: () => void;
}

const Checkbox = ({ name, disabled, placeholder, label, onChange }: Props) => {
  const handleChange = () => {};

  return (
    <label className={styles.container}>
      <input
        name={name}
        type="checkbox"
        className={styles.Checkbox}
        onChange={handleChange}
      />
      <span className={styles.checkmark}></span>
    </label>
  );
};

export default Checkbox;
