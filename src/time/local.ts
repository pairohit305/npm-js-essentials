import { format } from "date-fns";

export function UTC2Local(UTC: string) {
  return format(new Date(UTC), "do MMM, yyyy");
}
