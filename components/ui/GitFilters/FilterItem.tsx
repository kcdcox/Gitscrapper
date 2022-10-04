import React from "react";

import styles from "./button.module.scss";

interface Props {
  title: string;
}

const FilterItem = ({}: Props) => {
  return <div className={styles.filter_item}>filter</div>;
};

export default FilterItem;
