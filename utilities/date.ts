import moment from "moment";

export const getISODate = (date: any) => moment(date).toISOString();

export const getDate = (date: any) =>
  moment(getISODate(date)).format("MMM/DD/YYYY");
