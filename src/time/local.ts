import moment from "moment-timezone";

export function UTC2Local(UTC: string) {
  return moment.utc(UTC).format("DD MMM, YYYY");
}
