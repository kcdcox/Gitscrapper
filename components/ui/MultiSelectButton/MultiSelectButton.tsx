import React from "react";
import { SelectOption } from "../../../types";

import { classNames, variationName } from "../../../utilities/styling";
import styles from "./multiSelectButton.module.scss";

interface Props {
  name: string;
  labels: SelectOption[];
  value: string;
  size?: string;
  tooltip?: React.ReactNode;
  background?: string;
  color?: string;
  activeBackground?: string;
  disabled?: boolean;
  onChange(selected: string, id: string): void;
}

const MultiSelectButton = ({
  name,
  color,
  labels,
  background,
  disabled,
  value,
  tooltip,
  activeBackground,
  size,
  onChange,
}: Props) => {
  const className = classNames(
    styles.button__section,
    styles[variationName("size", size ?? "medium")],
    disabled && styles.disabled
  );

  const handleChange = (label: SelectOption) => {
    if (label.disabled !== false) onChange(label.value, name);
  };

  const defaultActiveBackground = "#0c7760";
  const defaultBackground = "#0f021c";
  const defaultTextColor = "#ebfcf6";

  const getBackgroundColor = (label: SelectOption) => {
    if (label.value === value) {
      return activeBackground ? activeBackground : defaultActiveBackground;
    } else {
      return background ? background : defaultBackground;
    }
  };

  return (
    <div className={styles.button__container}>
      {labels.map((label) => (
        <div
          key={label.value}
          style={{
            background: getBackgroundColor(label),
            color: color ?? defaultTextColor,
          }}
          title={name}
          onClick={() => handleChange(label)}
          className={className}
        >
          {label.label}
        </div>
      ))}

      {tooltip && tooltip}
    </div>
  );
};

export default MultiSelectButton;
