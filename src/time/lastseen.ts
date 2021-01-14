import {
  timestamp as Ctimestamp,
  dateString as today,
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
export const TIMELINE_STATUS = {
  NOT_STARTED: 0,
  STARTS_TOMARROW: 1, // show 24h clock
  STARTED_IN_BETWEEN: 2,
  ENDS_TODAY: 3, // show 24h clock
  ENDED: 4,

  UNKNOWN: 5,
  INVALID: 6,
};

type OP = { time: Timeline["timeString"]; status: number };
export class Timeline {
  // user based
  private startCB?: () => any;
  private updateCB?: (stats: OP) => any;
  private finishCB?: () => any;
  // internal
  private timer: any;
  private MODE: 0 | 1 | undefined;
  private STATUS: number = TIMELINE_STATUS.UNKNOWN;
  private intervalPeriod: 1000 | 60000 | undefined;
  private time: number | undefined;
  private timeString = " - ";

  constructor(
    private startDateString: string,
    private endDateString: string,
    /** It is time when it switches from 60s interval to 1s interval
     *  and this gives awesome ux, so if you provide value 120 it means
     * if 120 or less seconds remaining then update every 1s  
      */
    private SWITCH_SECONDS = 120,
    /**
     * IF you provide number in this, then it will work 
     * just like any other countdown ex 20 secs count down
     * 
     */
    private COUNTDOWN_SECONDS: number | undefined = undefined,
    private text?: {
      NOT_STARTED?: string;
      STARTS_TOMARROW?: string;
      ENDS_TODAY?: string;
      STARTED?: string;
      ENDED?: string;
    }
  ) {
    this.updateTime = this.updateTime.bind(this);
  }
  private init() {

    if (this.COUNTDOWN_SECONDS) {
      this.STATUS = TIMELINE_STATUS.ENDS_TODAY;
      this.MODE = 0;
      this.time = this.COUNTDOWN_SECONDS;
      this.intervalPeriod = 1000;
    } else {
      // set the status
      this.STATUS = this.getStatus();
      // set MODE
      this.MODE =
        this.STATUS === TIMELINE_STATUS.STARTS_TOMARROW ||
          this.STATUS === TIMELINE_STATUS.ENDS_TODAY
          ? 0
          : 1;
      // set time
      this.time = timeLeft24h(true) + 100;

      //  set interval
      this.intervalPeriod =
        this.MODE === 0
          ? this.time <= this.SWITCH_SECONDS
            ? 1000
            : 60000
          : undefined;
    }

    if (this.intervalPeriod) {
      // start the timer on logic
      if (this.updateCB) {
        this.updateTimeString();
        this.updateCB({ time: this.timeString, status: this.STATUS });
      }

      this.timer = setInterval(this.updateTime, this.intervalPeriod);
    } else {
      // no timer required hence static o/p
      switch (this.STATUS) {
        case TIMELINE_STATUS.NOT_STARTED: {
          const diff = dateStringDifference(today(), this.startDateString);
          this.timeString = `${this.text?.NOT_STARTED || "Starts in"} ${diff}d`;
          break;
        }
        case TIMELINE_STATUS.STARTED_IN_BETWEEN: {
          const diff = dateStringDifference(today(), this.endDateString);
          this.timeString = `${this.text?.STARTED || "Ends in"} ${diff + 1}d`;
          break;
        }
        case TIMELINE_STATUS.ENDED: {
          this.timeString = this.text?.ENDED || "Ended";
          break;
        }
      }

      if (this.updateCB) {
        this.updateCB({ time: this.timeString, status: this.STATUS });
      }
    }
  }
  static getStatus(startDateString: string, endDateString: string) {
    const aj = today();

    if (startDateString > endDateString) return TIMELINE_STATUS.INVALID;
    if (endDateString === aj) {
      return TIMELINE_STATUS.ENDS_TODAY;
    } else if (startDateString > aj) {
      const diff = dateStringDifference(aj, startDateString);
      if (diff === 1) {
        return TIMELINE_STATUS.STARTS_TOMARROW;
      } else {
        return TIMELINE_STATUS.NOT_STARTED;
      }
    } else if (aj >= startDateString && aj <= endDateString) {
      return TIMELINE_STATUS.STARTED_IN_BETWEEN;
    } else if (aj > endDateString) {
      return TIMELINE_STATUS.ENDED;
    } else {
      return TIMELINE_STATUS.INVALID;
    }
  }
  private getStatus() {
    const { startDateString, endDateString } = this;
    const aj = today();

    if (startDateString > endDateString) return TIMELINE_STATUS.INVALID;
    if (endDateString === aj) {
      return TIMELINE_STATUS.ENDS_TODAY;
    } else if (startDateString > aj) {
      const diff = dateStringDifference(aj, startDateString);
      if (diff === 1) {
        return TIMELINE_STATUS.STARTS_TOMARROW;
      } else {
        return TIMELINE_STATUS.NOT_STARTED;
      }
    } else if (aj >= startDateString && aj <= endDateString) {
      return TIMELINE_STATUS.STARTED_IN_BETWEEN;
    } else if (aj > endDateString) {
      return TIMELINE_STATUS.ENDED;
    } else {
      return TIMELINE_STATUS.INVALID;
    }
  }
  private updateTime() {
    // err checking
    if (!this.intervalPeriod || !this.time) return;

    // time logic
    if (this.time <= this.SWITCH_SECONDS && this.time > 1) {
      if (this.intervalPeriod !== 1000) {
        clearInterval(this.timer);

        this.intervalPeriod = 1000;
        this.time = this.time - 60;

        this.timer = setInterval(this.updateTime, 1000);
      } else {
        this.time = this.time - 1;
      }
    } else if (this.time <= 1) {
      clearInterval(this.timer);

      this.timer = undefined;
      this.MODE = undefined;
      this.STATUS = TIMELINE_STATUS.ENDED;
      this.intervalPeriod = undefined;
      this.time = 0;
      this.timeString = ' - ';

      if (this.updateCB)
        this.updateCB({ time: this.timeString, status: this.STATUS });

      if (this.finishCB) {
        this.finishCB();
      }

      return;
    } else {
      this.time = this.time - 60;
      if (this.time <= this.SWITCH_SECONDS && this.time > 1) {
        clearInterval(this.timer);

        this.intervalPeriod = 1000;
        this.timer = setInterval(this.updateTime, 1000);
      }
    }

    this.updateTimeString();
    if (this.updateCB) {
      this.updateCB({ time: this.timeString, status: this.STATUS });
    }
  }
  private updateTimeString() {
    if (!this.time) return;

    let hours: number | null | string = Math.floor(
      (this.time / (60 * 60)) % 24
    );
    let minutes: number | string = Math.floor((this.time / 60) % 60);
    let seconds: number | null | string = Math.floor(this.time % 60);

    if (this.time <= this.SWITCH_SECONDS) hours = null;
    if (this.time > this.SWITCH_SECONDS) seconds = null;

    hours = this.setDoubleDigit(hours, "h");
    minutes = this.setDoubleDigit(minutes, "m");
    seconds = this.setDoubleDigit(seconds, "s");

    if (this.STATUS === TIMELINE_STATUS.ENDS_TODAY) {
      this.timeString = `${this.text?.ENDS_TODAY || "Ends in"
        } ${hours}${minutes}${seconds}`.trim();
    } else {
      this.timeString = `${this.text?.STARTS_TOMARROW || "Starts in"
        } ${hours}${minutes}${seconds}`.trim();
    }
  }
  private setDoubleDigit(digit: number | null, append: string) {
    if (digit === null) return "";
    return (
      (digit.toString().length === 1 ? "0" + digit : digit.toString()) +
      append +
      " "
    );
  }
  /** events */
  onStart(callback?: Timeline["startCB"]) {
    this.startCB = callback;
  }
  onUpdate(callback?: Timeline["updateCB"]) {
    this.updateCB = callback;
  }
  onFinish(callback: Timeline["finishCB"]) {
    this.finishCB = callback;
  }
  /** pause the time */
  public pause() {
    clearInterval(this.timer);
  }
  /** resume the time */
  public resume() {
    this.init();
  }
  /** start the time */
  public start() {
    if (this.startCB) {
      this.startCB();
    }
    this.init();
  }
  /** stop the time */
  public stop() {
    clearInterval(this.timer);
  }
  /** Restart the timer with new */
  public restart(startDateString: string, endDateString: string) {
    this.startDateString = startDateString;
    this.endDateString = endDateString;

    // init again
    this.init();
  }
}
