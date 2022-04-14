`Helper function available:`

`Available functions`

| Core           | Function              |
| -------------- | --------------------- |
| Array          | splitArrayInto        |
|                | arrayElmCounter       |
|                | containsInArray       |
|                | isDistinctiveArray    |
|                | minArray              |
|                | maxArray              |
|                | swapElmArray          |
| Email          | isEmail               |
| Halt           | halt d -> HaltCounter |
| HttpStatusCode | httpStatusCode        |
| Math           | minmax                |
| Text           | textLimitor           |
|                | humanReadableNumber   |
|                | Case                  |
|                | onlyAlphanumeric      |
| Time           | Dates                 |
|                | Timeline              |
| Uid            | genUniqueId           |
|                | genRandomUniqueId     |
| Random         | randomInteger         |
|                | randomFloat           |
|                | shuffleArray          |
|                | randomAlphabet        |
|                | randomNaturalArray    |
|                | RandomDropRateIndex   |
| Sleep          | sleep                 |

d-> = depent on

**Examples**

[Timeline Demo](https://codesandbox.io/s/timeline-demo-9wq5m)

```

async function example1() {
  console.log("** started **");
  let hc = new HaltCounter(0);

  let looper = setInterval(() => {
    hc.count++;
    console.log("count: " + hc.count);
  }, 1000);

  await halt(hc, 5, {
    every: 500, // check hc.count every 500ms
    maxTimeout: 10000, // after 10s if hc.count don't become 5 halt function will reject
  });

  // things below will be in halt untill the hc.count becomes 5
  console.log("** ended **");
  clearInterval(looper);
}

example1();

```
