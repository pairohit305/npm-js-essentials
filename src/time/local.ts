import moment from "moment-timezone";

export function UTC2Local(UTC: string) {
  return moment.utc(UTC).format("MMM DD, YYYY");
}
