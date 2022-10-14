const query = "%3A";

const prURLPrefix = (pageNum: number) =>
  `https://github.com/pulls?page=${pageNum}&q=is${query}pr`;

const reviewURLPrefix = (pageNum: number) =>
  `https://github.com/pulls?page=${pageNum}&q=reviewd-by${query}40me+is${query}pr+is${query}closed`;

const createdOrAssigned = (assigned: string, author: string) =>
  assigned === "true"
    ? `+assignee${query}${author}`
    : `+author${query}${author}`;

export const getPRListURL = async (
  open: string,
  assigned: string,
  author: string,
  pageNum?: number
) => {
  return `${prURLPrefix(pageNum ?? 1)}+is${query}${open}${createdOrAssigned(
    assigned,
    author
  )}`;
};

export const getReviewListURL = async (
  PRsOrReviews: boolean,
  open: string,
  assigned: string,
  author: string,
  pageNum?: number
) => {
  return `${reviewURLPrefix(pageNum ?? 1)}+is${query}${open}${createdOrAssigned(
    assigned,
    author
  )}`;
};
