import {
  timestamp as Ctimestamp,
  dateString,
  dateStringDifference,
  timeLeft24h,
} from "./dates";

/** 1604247241_000 -> yesterday */
export function lastseen(timestamp: number) {
  var differenceTime = Ctimestamp() - timestamp;
  var seconds = differenceTime / 1000;
  var minutes = Math.floor(seconds / 60); // value 60 is seconds
  var hours = Math.floor(seconds / 3600); //value 3600 is 60 minutes * 60 sec
  var days = Math.floor(seconds / 86400); //86400 = 24 * 60 * 60;
  var weeks = Math.floor(seconds / 604800); // 7*24*60*60;
  var months = Math.floor(seconds / 2629440); //((365+365+365+365+366)/5/12)*24*60*60
  var years = Math.floor(seconds / 31553280); //(365+365+365+365+366)/5 * 24 * 60 * 60

  if (seconds <= 60) {
    return "Just Now";
  } else if (minutes <= 60) {
    if (minutes == 1) {
      return "one minute ago";
    } else {
      return `${minutes} minutes ago`;
    }
  } else if (hours <= 24) {
    if (hours == 1) {
      return "an hour ago";
    } else {
      return `${hours} hrs ago`;
    }
  } else if (days <= 7) {
    if (days == 1) {
      return "yesterday";
    } else {
      return `${days} days ago`;
    }
  } else if (weeks <= 4.3) {
    //4.3 == 52/12
    if (weeks == 1) {
      return "a week ago";
    } else {
      return `${weeks} weeks ago`;
    }
  } else if (months <= 12) {
    if (months == 1) {
      return "a month ago";
    } else {
      return `${months} months ago`;
    }
  } else {
    if (years == 1) {
      return "one year ago";
    } else {
      return `${years} years ago`;
    }
  }
}


/**
 *       24h before startDate(STARTS_TOMARROW)                   *
 *                 |                                             *
 *                 |       24h before endDate(ENDS_TODAY)        *
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
 *                      constructor()     <---- inputs such as start and end dates ...
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
type numish = number | string | null;

// enum
const TIMELINE_MODE = {
  OFF: 0,
  ON: 1,
  UNKNOWN: 2
};
export const TIMELINE_STATUS = {
  NOT_STARTED: 0,
  STARTS_TOMARROW: 1, // show 24h clock
  STARTED_IN_BETWEEN: 2,
  ENDS_TODAY: 3, // show 24h clock
  ENDED: 4,
  UNKNOWN: 5,
  INVALID: 6
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
  private STATUS: number = TIMELINE_STATUS.UNKNOWN;
  private MODE: number = TIMELINE_MODE.UNKNOWN;
  private time = 0;
  private interval: 1000 | 60000 | undefined;
  private timeString = " - ";

  private startD: string;
  private endD: string;

  // setInterval timer
  private intervaler: any;
  constructor(
    startDateString: string,
    endDateString: string,
    /** It is time when it switches from 60s interval to 1s interval
     *  and this gives awesome ux, so if you provide value 120 it means
     * if 120 or less seconds remaining then update every 1s
     */
    private SWITCH_SECONDS = 120,
    /** 
     * All time related is based on GMT if you 
     * want add some init delays before calulating
     * go ahead and add it
     */
    private INITIAL_DELAY = 0,
    private replacer = ["Starts in ", "Ends in ", "Ended"]
  ) {
    this.startD = startDateString;
    this.endD = endDateString;

    this.onStart = this.onStart.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onFinish = this.onFinish.bind(this);

    this.sleep = this.sleep.bind(this);
    this.restart = this.restart.bind(this);
  }
  // sleep
  private async sleep(ms: number) {
    return new Promise((resolve) => {
      this.intervaler = setTimeout(() => {
        resolve(true);
      }, ms);
    });
  }

  private start = (nolog = false) => {
    // fresh start
    this.kill();

    if (this._onStart && !nolog) this._onStart();

    // assigning value
    this.STATUS = Timeline.getStatus(this.startD, this.endD);
    if (this.STATUS === TIMELINE_STATUS.INVALID) throw new RangeError("endDateString > startDateString is not allowed!")

    this.MODE = this.getMode(this.STATUS);
    this.time =
      this.MODE === TIMELINE_MODE.ON ? timeLeft24h(true) + this.INITIAL_DELAY : 0;

    this.interval =
      this.MODE === TIMELINE_MODE.OFF
        ? undefined
        : this.time <= this.SWITCH_SECONDS
          ? 1000
          : 60000;

    this.update(this.STATUS);
    return this.kill;
  };
  private update = async (status: number) => {
    // NOT_STARTED
    if (status === TIMELINE_STATUS.NOT_STARTED) {
      // remaining days
      const days = dateStringDifference(dateString(), this.startD);
      const hours = Math.floor((timeLeft24h(true) / (60 * 60)) % 24);

      const time = this.replacer[0].trim() + " " + days + "d" + " " + hours + "h";

      if (this._onUpdate) this._onUpdate({ status, time });
      return this.finish();

      // STARTED_IN_BETWEEN
    } else if (status === TIMELINE_STATUS.STARTED_IN_BETWEEN) {
      // remaining days
      const days = dateStringDifference(dateString(), this.endD);
      const hours = Math.floor((timeLeft24h(true) / (60 * 60)) % 24);

      const time = this.replacer[1].trim() + " " + days + "d" + " " + hours + "h";

      if (this._onUpdate) this._onUpdate({ status, time });
      return this.finish();

      // ENDED
    } else if (status === TIMELINE_STATUS.ENDED) {
      const time = this.replacer[2].trim();

      if (this._onUpdate) this._onUpdate({ status, time });
      return this.finish();
      // ENDS_TODAY
    } else if (status === TIMELINE_STATUS.ENDS_TODAY) {
      // time string logic

      // in some case hour, mins are not required
      let hours: numish =
        this.time <= this.SWITCH_SECONDS
          ? null
          : Math.floor((this.time / (60 * 60)) % 24);
      let minutes: numish = Math.floor((this.time / 60) % 60);
      let seconds: numish =
        this.time > this.SWITCH_SECONDS ? null : Math.floor(this.time % 60);

      // converting to double digits
      hours = this.toDoubleDigit(hours, "h");
      minutes = this.toDoubleDigit(minutes, "m");
      seconds = this.toDoubleDigit(seconds, "s");

      this.timeString =
        this.replacer[1].trim() + " " + hours + minutes + seconds;

      if (this._onUpdate)
        this._onUpdate({ status: this.STATUS, time: this.timeString });
      // time logic
      switch (true) {
        case this.time <= 1:
          await this.sleep(1000);

          this.update(TIMELINE_STATUS.ENDED);
          break;
        case this.time > this.SWITCH_SECONDS:
          this.time -= 60;
          await this.sleep(60000);

          this.update(TIMELINE_STATUS.ENDS_TODAY);
          break;
        case this.time <= this.SWITCH_SECONDS && this.interval === 1000:
          this.time -= 1;
          await this.sleep(1000);

          this.update(TIMELINE_STATUS.ENDS_TODAY);
          break;
        case this.time <= this.SWITCH_SECONDS && this.interval === 60000:
          // change the interval time from 60s to 1s
          this.interval = 1000;
          this.time -= 1;

          this.update(TIMELINE_STATUS.ENDS_TODAY);
          break;
      }
      // STARTS_TOMARROW
    } else if (status === TIMELINE_STATUS.STARTS_TOMARROW) {
      // time string logic

      // in some case hour, mins are not required
      let hours: numish =
        this.time <= this.SWITCH_SECONDS
          ? null
          : Math.floor((this.time / (60 * 60)) % 24);
      let minutes: numish = Math.floor((this.time / 60) % 60);
      let seconds: numish =
        this.time > this.SWITCH_SECONDS ? null : Math.floor(this.time % 60);

      // converting to double digits
      hours = this.toDoubleDigit(hours, "h");
      minutes = this.toDoubleDigit(minutes, "m");
      seconds = this.toDoubleDigit(seconds, "s");

      this.timeString =
        this.replacer[0].trim() + " " + hours + minutes + seconds;

      if (this._onUpdate)
        this._onUpdate({ status: this.STATUS, time: this.timeString });
      // time logic
      switch (true) {
        case this.time <= 1:
          await this.sleep(1000);

          this.update(TIMELINE_STATUS.STARTED_IN_BETWEEN);
          break;
        case this.time > this.SWITCH_SECONDS:
          this.time -= 60;
          await this.sleep(60000);

          this.update(TIMELINE_STATUS.STARTS_TOMARROW);
          break;
        case this.time <= this.SWITCH_SECONDS && this.interval === 1000:
          this.time -= 1;
          await this.sleep(1000);

          this.update(TIMELINE_STATUS.STARTS_TOMARROW);
          break;
        case this.time <= this.SWITCH_SECONDS && this.interval === 60000:
          // change the interval time from 60s to 1s
          this.interval = 1000;
          this.time -= 1;

          this.update(TIMELINE_STATUS.STARTS_TOMARROW);
          break;
      }
    }
  };
  private finish = () => {
    this.kill();

    // user's onfinish method called
    if (this._onFinish) this._onFinish();
  };
  public restart(startDateString: string, endDateString: string) {
    this.startD = startDateString;
    this.endD = endDateString;
    this.STATUS = TIMELINE_STATUS.UNKNOWN;
    this.MODE = TIMELINE_MODE.UNKNOWN;
    this.time = 0;
    this.interval = undefined;
    this.INITIAL_DELAY = 0;

    this.start(true);
  }
  /** Call this function to stop the timeline
   *  and clear all timers
   */
  private kill = () => {
    clearTimeout(this.intervaler);
  };

  // events that user can benefit
  private _onStart?: Function;
  public onStart(callback: Function) {
    this._onStart = callback;

    return {
      onUpdate: this.onUpdate,
      start: () => this.start(),
    };
  }

  private _onUpdate?: (result: { time: string; status: number }) => any;
  public onUpdate(callback: (result: { time: string; status: number }) => any) {
    this._onUpdate = callback;
    return {
      onFinish: this.onFinish,
      start: () => this.start(),
    };
  }

  private _onFinish?: Function;
  public onFinish(callback: Function) {
    this._onFinish = callback;

    return {
      start: this.start
    };
  }

  private toDoubleDigit(digit: number | null, append: string) {
    if (digit === null) return "";
    return (
      (digit.toString().length === 1 ? "0" + digit : digit.toString()) +
      append +
      " "
    );
  }
  private getMode(status: number) {
    switch (status) {
      case TIMELINE_STATUS.STARTS_TOMARROW:
      case TIMELINE_STATUS.ENDS_TODAY:
        return TIMELINE_MODE.ON;
      default:
        return TIMELINE_MODE.OFF;
    }
  }
  // usefull methods
  public static getStatus(startDateString: string, endDateString: string) {
    if (startDateString > endDateString) return TIMELINE_STATUS.INVALID;
    const today = dateString();

    switch (true) {
      case endDateString === today:
        return TIMELINE_STATUS.ENDS_TODAY;

      case startDateString > today:
        const remaining = dateStringDifference(today, startDateString);
        if (remaining === 1) {
          return TIMELINE_STATUS.STARTS_TOMARROW;
        } else {
          return TIMELINE_STATUS.NOT_STARTED;
        }

      case today >= startDateString && today <= endDateString:
        return TIMELINE_STATUS.STARTED_IN_BETWEEN;

      case today > endDateString:
        return TIMELINE_STATUS.ENDED;

      default:
        return TIMELINE_STATUS.INVALID;
    }
  }
}