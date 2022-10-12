import React from "react";
import Link from "next/link";

import Button from "../../ui/Button/Button";
import styles from "./header.module.scss";

const Header = () => {
  return (
    <div className={styles.header}>
      <Link href="/">
        <h2 className={styles.header__title}>Gitscrapper</h2>
      </Link>
      {/* <Button title="Scrape Github" url="/">
        Scrape GitHub
      </Button> */}
    </div>
  );
};

export default Header;
