import React from "react";
import NextLink from "next/link";

import styles from "./link.module.scss";

interface Props {
  title: string;
  url: string;
}

const Link = ({ title, url }: Props) => {
  return (
    <NextLink href={url}>
      <span className={styles.link}>{title}</span>
    </NextLink>
  );
};

export default Link;
