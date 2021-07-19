import {
  addDays,
  subDays,
  differenceInDays,
  parseISO,
  format as dfnsFormat,
} from "date-fns";

export class Dates {
  // => Wed, 02 Dec 2020 05:47:41 GMT
  static UTC(options?: { alterBy?: number | "final" | "alpha" }) {
    let utc = "";

    if (options?.alterBy && typeof options.alterBy === "string") {
      utc =
        options.alterBy === "alpha"
          ? (() => {
              const d = new Date();
              d.setUTCMonth(d.getUTCMonth(), 1);
              d.setUTCHours(0, 0, 0, 0);

              return d.toUTCString();
            })()
          : (() => {
              const d = new Date();
              d.setUTCMonth(d.getUTCMonth() + 1, 0);
              d.setUTCHours(23, 59, 59, 999);

              return d.toUTCString();
            })();
    } else if (options?.alterBy && typeof options.alterBy === "number") {
      const d = new Date();
      d.setUTCHours(0, 0, 0, 0);

      utc =
        options.alterBy > 0
          ? addDays(d, options.alterBy).toUTCString()
          : subDays(d, -options.alterBy).toUTCString();
    } else {
      utc = new Date().toUTCString();
    }

    return utc;
  }

  // => 20210225T125958.000Z
  static ISO(options?: {
    representation?: "complete" | "date";
    alterBy?: number | "final" | "alpha";
  }) {
    let _iso = "";

    if (options?.alterBy && typeof options.alterBy === "string") {
      _iso =
        options.alterBy === "alpha"
          ? (() => {
              const d = new Date();
              d.setUTCMonth(d.getUTCMonth(), 1);
              d.setUTCHours(0, 0, 0, 0);

              return d.toISOString();
            })()
          : (() => {
              const d = new Date();
              d.setUTCMonth(d.getUTCMonth() + 1, 0);
              d.setUTCHours(23, 59, 59, 999);

              return d.toISOString();
            })();
    } else if (options?.alterBy && typeof options.alterBy === "number") {
      const d = new Date();
      d.setUTCHours(0, 0, 0, 0);

      _iso =
        options.alterBy > 0
          ? addDays(d, options.alterBy).toISOString()
          : subDays(d, -options.alterBy).toISOString();
    } else {
      _iso = new Date().toISOString();
    }

    let iso = "";
    for (const char of _iso) {
      if (char === ":" || char === "-") continue;
      iso += char;
    }

    if (options?.representation === "date") return iso.split("T")[0];
    return iso;
  }

  // => 1614326147_000
  static timestamp(options?: {
    inSecs?: boolean;
    alterBy?: number | "final" | "alpha";
  }) {
    let timestamp = 0;

    if (options?.alterBy && typeof options.alterBy === "string") {
      timestamp =
        options.alterBy === "alpha"
          ? (() => {
              const d = new Date();
              d.setUTCMonth(d.getUTCMonth(), 1);
              d.setUTCHours(0, 0, 0, 0);

              return d.getTime();
            })()
          : (() => {
              const d = new Date();
              d.setUTCMonth(d.getUTCMonth() + 1, 0);
              d.setUTCHours(0, 0, 0, 0);

              return d.getTime();
            })();
    } else if (options?.alterBy && typeof options.alterBy === "number") {
      const d = new Date();
      d.setUTCHours(0, 0, 0, 0);

      timestamp =
        options.alterBy > 0
          ? addDays(d, options.alterBy).getTime()
          : subDays(d, -options.alterBy).getTime();
    } else {
      timestamp = Date.now();
    }

    return options?.inSecs ? Math.round(timestamp / 1000) : timestamp;
  }

  // conversion
  static dateToTime(date: Date) {
    const _iso = date.toISOString();
    let iso = "";

    for (const char of _iso) {
      if (char === ":" || char === "-") continue;
      iso += char;
    }

    return iso;
  }
  static dimeToTimestamp(dime: string, options?: { inSecs?: boolean }) {
    const timestamp = Date.UTC(
      Number(dime.slice(0, 4)),
      Number(dime.slice(4, 6)) - 1,
      Number(dime.slice(-2))
    );
    return options?.inSecs ? Math.round(timestamp / 1000) : timestamp;
  }
  static timeToDime(time: string) {
    return time.split("T")[0];
  }
  static timeToDate(time: string) {
    return parseISO(time);
  }
  static timeToInputDate(time: string) {
    return parseISO(time).toISOString().slice(0, 10);
  }
  static timeToInputDateTime(time: string) {
    return parseISO(time).toISOString().slice(0, 16);
  }
  static timeToTimestamp(time: string, options?: { inSecs?: boolean }) {
    const timestamp = parseISO(time).getTime();
    return options?.inSecs ? Math.round(timestamp / 1000) : timestamp;
  }
  static timestampToTime(timestamp: number) {
    const date = new Date(timestamp);

    const _iso = date.toISOString();
    let iso = "";

    for (const char of _iso) {
      if (char === ":" || char === "-") continue;
      iso += char;
    }

    return iso;
  }
  static timeAlterBy(time: string, alterBy: number) {
    const d = parseISO(time);

    let iso = "";
    const _iso =
      alterBy > 0
        ? addDays(d, alterBy).toISOString()
        : subDays(d, -alterBy).toISOString();

    for (const char of _iso) {
      if (char === ":" || char === "-") continue;
      iso += char;
    }

    return iso;
  }

  static remainingTimeInSecs(time1: string, time2?: string) {
    time2 = time2 || this.ISO();

    return Math.abs(
      this.timeToTimestamp(time2, { inSecs: true }) -
        this.timeToTimestamp(time1, { inSecs: true })
    );
  }
  static differenceInDays(LTimestamp: number, RTimestamp: number) {
    return Math.abs(differenceInDays(LTimestamp, RTimestamp));
  }

  // => 20210225
  static dime(options?: { alterBy?: number | "final" | "alpha" }) {
    return this.ISO({ representation: "date", alterBy: options?.alterBy });
  }
  /** convert iso / gmt to the local  */
  static beautify(
    time: string,
    format: "ISO" | "UTC" | "dime" = "ISO",
    withTime?: boolean
  ) {
    if (format === "ISO") {
      return dfnsFormat(
        parseISO(time),
        withTime ? "do MMM, yyyy - hh:mm a" : "do MMM, yyyy"
      );
    } else if (format === "dime") {
      return dfnsFormat(parseISO(time), "do MMM, yyyy");
    } else if (format === "UTC") {
      return dfnsFormat(
        new Date(time),
        withTime ? "do MMM, yyyy - hh:mm a" : "do MMM, yyyy"
      );
    } else return " - ";
  }
}
