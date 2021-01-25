import React, { useState, useEffect, useRef, useMemo } from "react";
import { Timeline, TIMELINE_STATUS, dateString, sleep, timeLeft24h } from "@pairohit/helper";

// Example 1
export function Deadline24h() {
  const today = useMemo(() => dateString(), []);

  const [time, updateTime] = useState("");
  const timeline = useRef(
    new Timeline(today, today, 120, 0, ["", "Refreshs in", ""])
  ).current;

  useEffect(() => {
    const stopTimeline = timeline
      .onStart(() => {
        console.log("Starting now");
      })
      .onUpdate(({ time, status }) => {
        console.log("Updating", time, status);

        updateTime(time);
      }).onFinish(async () => {
        console.log("Finished.");

        console.log("Restarting in 2 secs");
        await sleep(2000);

        const today = dateString();
        timeline.restart(today, today);
      }).start();

    return () => {
      stopTimeline();
    };
  }, []);

  return (
    <div>
      <p>{time}</p>
    </div>
  );
}
// if you want to use as countdown 
export function Countdown20S({
  countdown = 20
}) {
  const today = useMemo(() => dateString(), []);

  const [time, updateTime] = useState("");
  const timeline = useRef(
    new Timeline(today, today, 120, -timeLeft24h(true) + countdown, ["", "Time:", ""])
  ).current;

  useEffect(() => {
    const stopTimeline = timeline
      .onStart(() => {
        console.log("Starting now");
      })
      .onUpdate(({ time, status }) => {
        console.log("Updating", time, status);

        updateTime(time);
      }).onFinish(async () => {
        console.log("Finished.");

        console.log("Restarting in 2 secs");
        updateTime("Restarting ...");
        await sleep(2000);

        const today = dateString();
        timeline.restart(today, today);
      }).start();

    return () => {
      stopTimeline();
    };
  }, []);

  return (
    <div>
      <p>{time}</p>
    </div>
  );
}

// Example 2 (Pratical Example)
export function Range10d() {
  const { start, end } = useMemo(() => {
    return {
      start: dateString(),
      end: dateString(9),
    };
  }, []);

  const [time, updateTime] = useState("");
  const timeline = useRef(
    new Timeline(start, end, 150, 0, [
      "Wait for",
      "Hurry, Sales ending in",
      "Oppies, Sales over",
    ])
  ).current;

  useEffect(() => {
    const stopTimeline = timeline
    .onStart(() => {
      console.log("Starting now");
    })
    .onUpdate(({ time, status }) => {
      console.log("Updating", time, status);

      updateTime(time);
    }).onFinish(async () => {
      console.log("Finished.");
    }).start();

    return () => {
      stopTimeline();
    };
  }, []);

  return (
    <div>
      <p>{time}</p>
    </div>
  );
}
