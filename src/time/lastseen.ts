import { timestamp as Ctimestamp, dateString as today, dateStringDifference } from "./utc";

/** 1604247241_000 -> yesterday */
export function lastseen(timestamp: number) {
  var differenceTime = Ctimestamp() - timestamp;
  var seconds = differenceTime;
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

export const TIMELINE_STATUS = {
  NOT_STARTED:0,
  STARTS_TOMARROW: 1, // show 24h clock
  STARTED:2,
  ENDS_TODAY: 3, // show 24h clock
  ENDED: 4,
  INVALID: 5,
}
interface Timeline {
  status: number
  value: string
}
export function timeline(startDateString: string, endDateString: string): Timeline {
  if(startDateString > endDateString) return {
    status: TIMELINE_STATUS.INVALID,
    value: "Invalid"
  };
  
  const aj = today();
  
  if(endDateString === aj) {
    return {
      status: TIMELINE_STATUS.ENDS_TODAY,
      value: "Ends today"
    }
  } else if(startDateString > aj) {
    const diff = dateStringDifference(aj, startDateString);
    if(diff === 1) {
      return {
        status: TIMELINE_STATUS.STARTS_TOMARROW,
        value: "Starts tomarrow",
      };
    }else {
      return {
        status: TIMELINE_STATUS.NOT_STARTED,
        value: "Starts in " + diff + "d",
      };
    }
  }else if(aj >= startDateString && aj <= endDateString) {
    const diff = dateStringDifference(aj, endDateString) + 1;
    if(diff === 2) {
      return {
        status: TIMELINE_STATUS.STARTED,
        value: "Ends tomarrow"
      };
    }else {
      return {
        status: TIMELINE_STATUS.STARTED,
        value: "Ends in " + diff + "d"
      };
    }
  }else if(aj > endDateString) {
    return {
      status: TIMELINE_STATUS.ENDED,
      value: "Ended"
    };
  } else {
    return {
      status: TIMELINE_STATUS.INVALID,
      value:"Invalid"
    }
  }
}