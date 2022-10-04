import React from "react";

import styles from "./datatable.module.scss";

export enum ColJust {
  Left = "flex-start",
  Center = "center",
  Right = "flex-end",
}
export type TableData = string | number | React.ReactNode;
export type ColumnJustification = ColJust;

interface Props {
  rows: TableData[][];
  headings: React.ReactNode[];
  showFooter?: boolean;
  footer?: TableData[];
  colJust?: ColumnJustification[];
}

const DataTable = ({ colJust, headings, rows, footer, showFooter }: Props) => {
  console.log(rows);
  const renderHeader = (
    <thead className={styles.head}>
      <tr className={styles.head_row}>
        {headings.map((heading, index) => (
          <td key={index} className={styles.head__row__cell}>
            {heading}
          </td>
        ))}
      </tr>
    </thead>
  );

  const renderBody = (
    <tbody className={styles.body}>
      {rows.map((row, index) => (
        <tr key={index} className={styles.body__row}>
          {row?.map((col, index) => (
            <td key={index} className={styles.body__row__cell}>
              {col}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );

  const renderFooter = (
    <tfoot className={styles.foot}>
      <tr className={styles.foot__row}>
        {headings.map((heading, index) => (
          <td key={index} className={styles.foot__row__cell}>
            {heading}
          </td>
        ))}
      </tr>
    </tfoot>
  );
  return (
    <div className={styles.dataTable__container}>
      <table className={styles.table}>
        {renderHeader}
        {renderBody}
        {(showFooter ?? false) && renderFooter}
      </table>
    </div>
  );
};

export default DataTable;
