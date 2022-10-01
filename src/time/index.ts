import {
  addDays,
  subDays,
  differenceInDays,
  parseISO,
  format as dfnsFormat,
  getDate,
  getWeek,
  getMonth,
  getYear,
} from "date-fns";

export class DateII {
  static ISO(options?: {
    time?: string;
    representation?: `time` | `dime`;
    modifier?: `alter-by-(${number})-days` | `start-of-month` | `end-of-month`;
  }) {
    let _iso = "";

    if (options?.modifier === "start-of-month") {
      const date = options?.time
        ? this.timeToDate(options.time)
        : this.timeToDate(this.timestampToTime(Date.now()));
      date.setUTCMonth(date.getUTCMonth(), 1);
      date.setUTCHours(0, 0, 0, 0);

      _iso = date.toISOString();
    } else if (options?.modifier === "end-of-month") {
      const date = options?.time
        ? this.timeToDate(options.time)
        : this.timeToDate(this.timestampToTime(Date.now()));
      date.setUTCMonth(date.getUTCMonth() + 1, 0);
      date.setUTCHours(23, 59, 59, 999);

      return date.toISOString();
    } else if (options?.modifier?.match(/alter-by-\(((-|\+|)\d+)\)-days/)) {
      const date = options?.time
        ? this.timeToDate(options.time)
        : this.timeToDate(this.timestampToTime(Date.now()));
      date.setUTCHours(0, 0, 0, 0);
      const alterBy = parseInt(options.modifier.match(/((-|\+|)\d+)/)!?.[0]);

      _iso =
        alterBy > 0
          ? addDays(date, alterBy).toISOString()
          : subDays(date, -alterBy).toISOString();
    } else {
      _iso = new Date().toISOString();
    }

    let iso = "";
    for (const char of _iso) {
      if (char === ":" || char === "-") continue;
      iso += char;
    }

    if (options?.representation === "dime") {
      return this.timeToDime(iso);
    }

    return iso;
  }
  static timestamp(options?: {
    modifier?: `alter-by-(${number})-days` | `start-of-month` | `end-of-month`;
  }) {
    let timestamp = 0;
    if (options?.modifier === "start-of-month") {
      const d = new Date();
      d.setUTCMonth(d.getUTCMonth(), 1);
      d.setUTCHours(0, 0, 0, 0);

      timestamp = d.getTime();
    } else if (options?.modifier === "end-of-month") {
      const d = new Date();
      d.setUTCMonth(d.getUTCMonth() + 1, 0);
      d.setUTCHours(23, 59, 59, 999);

      return d.getTime();
    } else if (options?.modifier?.match(/alter-by-\(((-|\+|)\d+)\)-days/)) {
      const d = new Date();
      d.setUTCHours(0, 0, 0, 0);
      const alterBy = parseInt(options.modifier.match(/((-|\+|)\d+)/)!?.[0]);

      timestamp =
        alterBy > 0
          ? addDays(d, alterBy).getTime()
          : subDays(d, -alterBy).getTime();
    } else {
      timestamp = Date.now();
    }

    return timestamp;
  }
  static DWM() {
    const D = getDate(new Date());
    const W = getWeek(new Date());
    const M = getMonth(new Date());

    return `${D}-${W}-${M}`;
  }
  static parseDWM(DWM: string) {
    const [D, W, M] = DWM.split("-");

    return { D: Number(D), W: Number(W), M: Number(M) };
  }
  static dateToTime(date: Date) {
    const _iso = date.toISOString();
    let iso = "";

    for (const char of _iso) {
      if (char === ":" || char === "-") continue;
      iso += char;
    }

    return iso;
  }
  static dimeToTimestamp(dime: string) {
    const timestamp = Date.UTC(
      Number(dime.slice(0, 4)),
      Number(dime.slice(4, 6)) - 1,
      Number(dime.slice(-2))
    );

    return timestamp;
  }
  static timeToDime(time: string) {
    return time.split("T")[0];
  }
  static timeToDate(time: string) {
    return parseISO(time);
  }
  static timeToInputDate(time: string) {
    return this.timeToDate(time).toISOString().slice(0, 10);
  }
  static timeToInputDateTime(time: string) {
    return this.timeToDate(time).toISOString().slice(0, 16);
  }
  static timeToTimestamp(time: string) {
    const timestamp = this.timeToDate(time).getTime();
    return timestamp;
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
}

/**
 *       24h before startDate(STARTS_SOON)                       *
 *                 |                                             *
 *                 |       24h before endDate(ENDS_SOON)         *
 *                 |                   |                         *
 *                 v                   v                         *
 * (NOT_STARTED)-- * -- * ============ * -- * ------             *
 *                      ^                   ^                    *
 *                      |                   |                    *
 *                      |           endDate(ENDED)               *
 *                      |                                        *
 *         startDate(STARTED_IN_BETWEEN)                         *
 *                                                               *
 *    = Our main event                                           *
 *    * Breakpoint                                               *
 *                                                               *
 */

/**
 * How code works internally
 *
 *  #Lifecycle
 *
 *  public events           internal
 *
 *                      constructor()     <---- inputs such as start and end DateII ...
 *                            |
 *                            v
 *  onStart()  <---------  start()
 *                            |      _____________________________________
 *                            |    /                                       \
 *                            v   v                            Yes         |
 *  onUpdate()  <--------  update() ?? (is time less then 24h) --->  some changes
 *                            |
 *                            | No
 *                            V
 *  onFinish()  <--------  finish()  == static time output like "Ends in 5h 12h"
 *                            |
 *                            v
 *                          kill()
 */

// types
type nullish = number | string | null;

// enum
export const TIMELINE_STATUS = {
  NOT_STARTED: 0,
  STARTS_SOON: 1, // show 24h clock
  STARTED_IN_BETWEEN: 2,
  ENDS_SOON: 3, // show 24h clock
  ENDED: 4,
  UNKNOWN: 5,
};
/**
 *
 * Important:
 * All timeline is based on GMT
 *
 * This Timeline class is only dynamic when
 * less 24 hours remaining, for rest case static
 * time values is shown.
 *
 * Eg: if 5 days is the timeline the output will
 *     be "Ends in 5d"
 * BUT if 24h is only remaining then output will
 *     be like "7h 23m" ... after 1 min "7h 22m"
 *     and so on ...
 */
export class Timeline {
  // private STATUS: number = TIMELINE_STATUS.UNKNOWN;
  // private time = 0;
  // private interval: 1000 | 60000 | undefined;
  // private timeString = " - ";
  // private start_time: string;
  // private finish_time: string;
  // // setInterval timer
  // private intervaler: any;
  // constructor(
  //   start_time: string,
  //   finish_time: string,
  //   /** It is time when it switches from 60s interval to 1s interval
  //    *  and this gives awesome ux, so if you provide value 120 it means
  //    * if 120 or less seconds remaining then update every 1s
  //    */
  //   private SWITCH_SECONDS = 120,
  //   private replacer = ["Starts in ", "Ends in ", "Ended"]
  // ) {
  //   this.start_time = start_time;
  //   this.finish_time = finish_time;
  //   this.onStart = this.onStart.bind(this);
  //   this.onUpdate = this.onUpdate.bind(this);
  //   this.onFinish = this.onFinish.bind(this);
  //   this.sleep = this.sleep.bind(this);
  //   this.restart = this.restart.bind(this);
  // }
  // // sleep
  // private async sleep(ms: number) {
  //   return new Promise((resolve) => {
  //     this.intervaler = setTimeout(() => {
  //       resolve(true);
  //     }, ms);
  //   });
  // }
  // private start = (nolog = false) => {
  //   // fresh start
  //   this.kill();
  //   if (this._onStart && !nolog) this._onStart();
  //   // assigning value
  //   this.STATUS = Timeline.getStatus(this.start_time, this.finish_time);
  //   this.time =
  //     this.STATUS === TIMELINE_STATUS.STARTS_SOON
  //       ? DateII.timeToTimestamp(this.start_time, { inSecs: true }) -
  //         DateII.timestamp({ inSecs: true })
  //       : this.STATUS === TIMELINE_STATUS.ENDS_SOON
  //       ? DateII.timeToTimestamp(this.finish_time, { inSecs: true }) -
  //         DateII.timestamp({ inSecs: true })
  //       : 0;
  //   this.interval =
  //     this.STATUS === TIMELINE_STATUS.STARTS_SOON ||
  //     this.STATUS === TIMELINE_STATUS.ENDS_SOON
  //       ? this.time <= this.SWITCH_SECONDS
  //         ? 1000
  //         : 60000
  //       : undefined;
  //   this.update(this.STATUS);
  //   return this.kill;
  // };
  // private update = async (status: number) => {
  //   // NOT_STARTED
  //   if (status === TIMELINE_STATUS.NOT_STARTED) {
  //     // remaining days
  //     const days = DateII.differenceInDays(
  //       DateII.timestamp(),
  //       DateII.timeToTimestamp(this.start_time)
  //     );
  //     const hours = Math.floor(
  //       ((DateII.timeToTimestamp(this.start_time, { inSecs: true }) -
  //         DateII.timestamp({ inSecs: true })) /
  //         (60 * 60)) %
  //         24
  //     );
  //     const time =
  //       this.replacer[0].trim() + " " + days + "d" + " " + hours + "h";
  //     if (this._onUpdate) this._onUpdate({ status, time });
  //     return this.finish();
  //     // STARTED_IN_BETWEEN
  //   } else if (status === TIMELINE_STATUS.STARTED_IN_BETWEEN) {
  //     // remaining days
  //     const days = DateII.differenceInDays(
  //       DateII.timestamp(),
  //       DateII.timeToTimestamp(this.finish_time)
  //     );
  //     const hours = Math.floor(
  //       ((DateII.timeToTimestamp(this.finish_time, { inSecs: true }) -
  //         DateII.timestamp({ inSecs: true })) /
  //         (60 * 60)) %
  //         24
  //     );
  //     const time =
  //       this.replacer[1].trim() + " " + days + "d" + " " + hours + "h";
  //     if (this._onUpdate) this._onUpdate({ status, time });
  //     return this.finish();
  //     // ENDED
  //   } else if (status === TIMELINE_STATUS.ENDED) {
  //     const days = DateII.differenceInDays(
  //       DateII.timestamp(),
  //       DateII.timeToTimestamp(this.finish_time)
  //     );
  //     const time = this.replacer[2].trim() + " " + (days ? days + "d" : "");
  //     if (this._onUpdate) this._onUpdate({ status, time });
  //     return this.finish();
  //     // ENDS_SOON
  //   } else if (status === TIMELINE_STATUS.ENDS_SOON) {
  //     // time string logic
  //     // in some case hour, mins are not required
  //     let hours: nullish =
  //       this.time <= this.SWITCH_SECONDS
  //         ? null
  //         : Math.floor((this.time / (60 * 60)) % 24);
  //     let minutes: nullish = Math.floor((this.time / 60) % 60);
  //     let seconds: nullish =
  //       this.time > this.SWITCH_SECONDS ? null : Math.floor(this.time % 60);
  //     // converting to double digits
  //     hours = this.toDoubleDigit(hours, "h");
  //     minutes = this.toDoubleDigit(minutes, "m");
  //     seconds = this.toDoubleDigit(seconds, "s");
  //     this.timeString =
  //       this.replacer[1].trim() + " " + hours + minutes + seconds;
  //     if (this._onUpdate)
  //       this._onUpdate({ status: this.STATUS, time: this.timeString });
  //     // time logic
  //     switch (true) {
  //       case this.time <= 1:
  //         await this.sleep(1000);
  //         this.update(TIMELINE_STATUS.ENDED);
  //         break;
  //       case this.time > this.SWITCH_SECONDS:
  //         this.time -= 60;
  //         await this.sleep(60000);
  //         this.update(TIMELINE_STATUS.ENDS_SOON);
  //         break;
  //       case this.time <= this.SWITCH_SECONDS && this.interval === 1000:
  //         this.time -= 1;
  //         await this.sleep(1000);
  //         this.update(TIMELINE_STATUS.ENDS_SOON);
  //         break;
  //       case this.time <= this.SWITCH_SECONDS && this.interval === 60000:
  //         // change the interval time from 60s to 1s
  //         this.interval = 1000;
  //         this.time -= 1;
  //         this.update(TIMELINE_STATUS.ENDS_SOON);
  //         break;
  //     }
  //     // STARTS_SOON
  //   } else if (status === TIMELINE_STATUS.STARTS_SOON) {
  //     // time string logic
  //     // in some case hour, mins are not required
  //     let hours: nullish =
  //       this.time <= this.SWITCH_SECONDS
  //         ? null
  //         : Math.floor((this.time / (60 * 60)) % 24);
  //     let minutes: nullish = Math.floor((this.time / 60) % 60);
  //     let seconds: nullish =
  //       this.time > this.SWITCH_SECONDS ? null : Math.floor(this.time % 60);
  //     // converting to double digits
  //     hours = this.toDoubleDigit(hours, "h");
  //     minutes = this.toDoubleDigit(minutes, "m");
  //     seconds = this.toDoubleDigit(seconds, "s");
  //     this.timeString =
  //       this.replacer[0].trim() + " " + hours + minutes + seconds;
  //     if (this._onUpdate)
  //       this._onUpdate({ status: this.STATUS, time: this.timeString });
  //     // time logic
  //     switch (true) {
  //       case this.time <= 1:
  //         await this.sleep(1000);
  //         this.update(TIMELINE_STATUS.STARTED_IN_BETWEEN);
  //         break;
  //       case this.time > this.SWITCH_SECONDS:
  //         this.time -= 60;
  //         await this.sleep(60000);
  //         this.update(TIMELINE_STATUS.STARTS_SOON);
  //         break;
  //       case this.time <= this.SWITCH_SECONDS && this.interval === 1000:
  //         this.time -= 1;
  //         await this.sleep(1000);
  //         this.update(TIMELINE_STATUS.STARTS_SOON);
  //         break;
  //       case this.time <= this.SWITCH_SECONDS && this.interval === 60000:
  //         // change the interval time from 60s to 1s
  //         this.interval = 1000;
  //         this.time -= 1;
  //         this.update(TIMELINE_STATUS.STARTS_SOON);
  //         break;
  //     }
  //   }
  // };
  // private finish = () => {
  //   this.kill();
  //   // user's onfinish method called
  //   if (this._onFinish) this._onFinish();
  // };
  // public restart(start_time: string, finish_time: string) {
  //   this.start_time = start_time;
  //   this.finish_time = finish_time;
  //   this.STATUS = TIMELINE_STATUS.UNKNOWN;
  //   this.time = 0;
  //   this.interval = undefined;
  //   this.start(true);
  // }
  // /** Call this function to stop the timeline
  //  *  and clear all timers
  //  */
  // private kill = () => {
  //   clearTimeout(this.intervaler);
  // };
  // // events that user can benefit
  // private _onStart?: Function;
  // public onStart(callback: Function) {
  //   this._onStart = callback;
  //   return {
  //     onUpdate: this.onUpdate,
  //     start: () => this.start(),
  //   };
  // }
  // private _onUpdate?: (result: { time: string; status: number }) => any;
  // public onUpdate(callback: (result: { time: string; status: number }) => any) {
  //   this._onUpdate = callback;
  //   return {
  //     onFinish: this.onFinish,
  //     start: () => this.start(),
  //   };
  // }
  // private _onFinish?: Function;
  // public onFinish(callback: Function) {
  //   this._onFinish = callback;
  //   return {
  //     start: this.start,
  //   };
  // }
  // private toDoubleDigit(digit: number | null, append: string) {
  //   if (digit === null) return "";
  //   return (
  //     (digit.toString().length === 1 ? "0" + digit : digit.toString()) +
  //     append +
  //     " "
  //   );
  // }
  // // usefull methods
  // public static getStatus(start_time: string, finish_time: string) {
  //   if (start_time > finish_time) {
  //     throw new RangeError("start_time > finish_time is not allowed!");
  //   }
  //   const _24h = 86400000;
  //   const now_time = DateII.ISO();
  //   switch (true) {
  //     case now_time < start_time:
  //       if (DateII.timeToTimestamp(start_time) - DateII.timestamp() <= _24h) {
  //         return TIMELINE_STATUS.STARTS_SOON;
  //       } else {
  //         return TIMELINE_STATUS.NOT_STARTED;
  //       }
  //     case now_time > finish_time:
  //       return TIMELINE_STATUS.ENDED;
  //     case now_time >= start_time && now_time <= finish_time:
  //       if (DateII.timeToTimestamp(finish_time) - DateII.timestamp() <= _24h) {
  //         return TIMELINE_STATUS.ENDS_SOON;
  //       } else {
  //         return TIMELINE_STATUS.STARTED_IN_BETWEEN;
  //       }
  //     default:
  //       return TIMELINE_STATUS.UNKNOWN;
  //   }
  // }
}
