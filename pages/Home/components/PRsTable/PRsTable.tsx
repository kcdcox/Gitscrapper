import { ColJust } from "types";
import { DataTable } from "@/components/ui";
import { getISODate } from "utilities/date";
import moment from "moment";

interface Props {
  PRs: any[];
}

const PRsTable = ({ PRs }: Props) => {
  const isPRs = Array.isArray(PRs) && PRs.length > 0;
  const rows = isPRs
    ? PRs.map((pr: any, index: number) => {
        return [
          PRs.length - index,
          <a key={pr.link} href={pr.link} target="_blank" rel="noreferrer">
            {pr.name}
          </a>,
          moment(getISODate(pr.date)).format("MMM/DD/YYYY"),
          pr.linesAdded,
          pr.linesRemoved,
          pr.comments,
          pr.repo,
        ];
      })
    : [];

  return isPRs ? (
    <DataTable
      colJust={[ColJust.Left, ColJust.Center, ColJust.Left]}
      headings={[
        "#",
        "PR | Link",
        "Date",
        "Lines Added",
        "Lines Removed",
        "Comments",
        "Repository",
      ]}
      rows={rows ?? []}
    />
  ) : null;
};

export default PRsTable;
