const query = "%3A";

const prURLPrefix = (pageNum: number) =>
  `https://github.com/pulls?page=${pageNum}&q=is${query}pr`;

const createdOrAssigned = (assigned: string, author: string) =>
  assigned === "true"
    ? `+assignee${query}${author}`
    : `+author${query}${author}`;

export const getPRListURL = async (
  state: string,
  assigned: string,
  author: string,
  pageNum?: number
) => {
  return `${prURLPrefix(pageNum ?? 1)}+is${query}${state}${createdOrAssigned(
    assigned,
    author
  )}`;
};
