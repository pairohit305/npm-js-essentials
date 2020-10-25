import { format } from "date-fns";

export function toFormateDate(utcDate: string) {
  return format(new Date(utcDate), "do MMM, yyyy");
}
