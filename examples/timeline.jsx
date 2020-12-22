import React, {useState, useEffect, useRef} from 'react';
import {Timeline, TIMELINE_STATUS, dateString} from '@pairohit/helper'

// Example 1 
function Deadline24h() {
  const today = dateString();

  const [time, updateTime] = useState("");
  const timeline = useRef(
    new Timeline(today, today, undefined, undefined, {
      ENDS_TODAY: "Ends in"
    })
  ).current;

  timeline.onStart(() => {
    console.log("Starting now");
  });
  timeline.onUpdate(({ time, status }) => {
    console.log("Updating", time, status);
    updateTime(time);
  });
  timeline.onFinish(() => {
    console.log("Finished.");
  });

  useEffect(() => {
    timeline.start();

    return () => {
      timeline.stop();
    };
  }, []);

  return (
    <div>
      <p>{time}</p>
    </div>
  );
}
// Example 2
function Coolddown150s() {
  const [time, updateTime] = useState("");
  const timeline = useRef(
    /** Remember to put same value in SWITCH_SECONDS as COUNTDOWN_SECONDS
     *  as SWITCH_SECONDS is responsible for switching interval per 1s
     */
    new Timeline("", "", 150, 150, {
      ENDS_TODAY: "Ends in"
    })
  ).current;

  timeline.onStart(() => {
    console.log("Starting now");
  });
  timeline.onUpdate(({ time, status }) => {
    console.log("Updating", time, status);
    updateTime(time);
  });
  timeline.onFinish(() => {
    console.log("Finished.");
  });

  useEffect(() => {
    timeline.start();

    return () => {
      timeline.stop();
    };
  }, []);

  return (
    <div>
      <p>{time}</p>
    </div>
  );
}
// Example 3 (Pratical Example)
function Range10d() {
  const start = dateString(); 
  const end = dateString(10);

  const [time, updateTime] = useState("");
  const timeline = useRef(
    new Timeline(start, end, undefined, undefined, {
      NOT_STARTED:"Wait for",
      STARTS_TOMARROW:"Wait for only",
      STARTED:"Hurry, Sales ending in",
      ENDS_TODAY:"Hurry, ending in",
      ENDED:"Oppies, Sales over"
    })
  ).current;

  timeline.onStart(() => {
    console.log("Starting now");
  });
  timeline.onUpdate(({ time, status }) => {
    console.log("Updating", time, status);
    updateTime(time);
  });
  timeline.onFinish(() => {
    console.log("Finished.");
  });

  useEffect(() => {
    timeline.start();

    return () => {
      timeline.stop();
    };
  }, []);

  return (
    <div>
      <p>{time}</p>
    </div>
  );
}
