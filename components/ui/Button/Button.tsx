import React from "react";
import Link from "next/link";

import { classNames } from "../../../utilities/styling";
import styles from "./button.module.scss";

interface Props {
  title: string;
  children: React.ReactNode;
  url?: string;
  plain?: boolean;
  decorated?: boolean;
  background?: string;
  color?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

const Button = ({
  title,
  children,
  url,
  plain,
  color,
  decorated,
  background,
  disabled,
  loading,
  onClick,
}: Props) => {
  const className = classNames(
    styles.button,
    plain && styles.plain,
    decorated && styles.decorated
  );

  const defaultBackground = "#443f57";
  const defaultColor = "#f9eee6";

  const useDisableClick = () => {
    if (!onClick || disabled || loading) {
      () => {};
    } else {
      onClick();
    }
  };

  const buttonMarkup = (
    <div
      style={{
        background: background ?? defaultBackground,
        color: color ?? defaultColor,
      }}
      title={title}
      onClick={useDisableClick}
      className={className}
    >
      {children}
    </div>
  );

  const linkButtonMarkup = (
    <Link className={styles.link} href={url ?? ""}>
      {buttonMarkup}
    </Link>
  );

  return url ? linkButtonMarkup : buttonMarkup;
};

export default Button;
