export type JSONObj =
  | string
  | number
  | boolean
  | null
  | JSONObj[]
  | { [key: string]: JSONObj };

export enum BoolOrBoth {
  True = "true",
  False = "false",
  Both = "both",
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface PRFilters {
  type: string;
  author: string;
  open: BoolOrBoth;
  merged: BoolOrBoth;
  assigned: BoolOrBoth;
  comparedAuthors?: string[];
  comments?: string[];
  repos?: string[];
}

export interface PRDetails {
  title: string;
  link: string;
  date: string;
  merged: boolean;
  open: boolean;
  createdBy: string;
  authors?: string[];
  repo?: string;
  assignees?: string[];
  reviewers?: string[];
  filesNum?: number;
  linesUp?: number;
  linesDown?: number;
  commentsNum?: number;
}

export enum ColJust {
  Left = "flex-start",
  Center = "center",
  Right = "flex-end",
}

export type TableData = string | number | React.ReactNode;
export type ColumnJustification = ColJust;
