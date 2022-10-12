import React from "react";
import Link from "next/link";
import { SelectOption } from "../../../types";

import { classNames } from "../../../utilities/styling";
import styles from "./multiSelectButton.module.scss";

interface Props {
  name: string;
  labels: SelectOption[];
  children: React.ReactNode;
  tooltip?: React.ReactNode;
  url?: string;
  plain?: boolean;
  decorated?: boolean;
  background?: string;
  color?: string;
  disabled?: boolean;
  onChange(selected: string, id: string): void;
}

const MultiSelectButton = ({
  name,
  children,
  url,
  plain,
  color,
  decorated,
  background,
  disabled,
  tooltip,
  onChange,
}: Props) => {
  const className = classNames(
    styles.button,
    plain && styles.plain,
    decorated && styles.decorated,
    disabled && styles.disabled
  );

  const handleChange = onChange
    ? (event: React.ChangeEvent<HTMLSelectElement>) =>
        onChange(event.currentTarget.value, name)
    : undefined;

  const defaultBackground = "#443f57";
  const defaultColor = "#f9eee6";

  const useDisableClick = () => {
    if (disabled) {
      () => {};
    } else {
      handleChange;
    }
  };

  const buttonMarkup = (
    <div className={styles.button__container}>
      <div
        style={{
          background: background ?? defaultBackground,
          color: color ?? defaultColor,
        }}
        title={name}
        onClick={useDisableClick}
        className={className}
      >
        {children}
      </div>
      {tooltip && tooltip}
    </div>
  );

  const linkButtonMarkup = (
    <Link className={styles.link} href={url ?? ""}>
      {buttonMarkup}
    </Link>
  );

  return url ? linkButtonMarkup : buttonMarkup;
};

export default MultiSelectButton;
