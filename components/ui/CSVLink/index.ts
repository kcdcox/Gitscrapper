import dynamic from "next/dynamic";

const CSVLink = dynamic(
  import("react-csv").then((m) => {
    const { CSVLink } = m;
    return CSVLink;
  }),
  { ssr: false }
);

export { CSVLink };
