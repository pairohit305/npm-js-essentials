`Helper function available:`

`Available functions`

| Core           | Function               |
| -------------- | ---------------------- |
| Array          | splitArrayInto         |
|                | arrayElmCounter        |
|                | contains               |
|                | isDistinctiveArray     |
|                | minArray               |
|                | maxArray               |
| Country        | getCountryEntries      |
|                | getCountryFullname     |
|                | getCountryList         |
| Email          | isEmail                |
| Express        | httpReqValidatorAsync  |
| Language       | getLanguageEntries     |
|                | getLanguageFullname    |
|                | getLanguageList        |
| Halt           | halt d -> HaltCounter  |
| HttpStatusCode | httpStatusCode         |
| Math           | minmax                 |
|                | mod                    |
| Parser         | videoORImage           |
|                | img2DMatrix            |
|                | plainText2HTML         |
|                | domaincomDetector      |
| Text           | textLimitor            |
|                | toStartCase            |
| Time           | dateString             |
|                | utcDate                |
|                | toLateDate             |
|                | toEarlyDate            |
|                | toFormateDate          |
|                | Timeline               |
|                | toTimestamp            |
|                | timestamp              |
|                | timeLeft24h            |
|                | lastseen               |
|                | dateStringDifference   |
|                | lastDateStringOfMonth  |
|                | firstDateStringOfMonth |
| Uid            | genUniqueId            |
|                | genRandomUniqueId      |
| Random         | randomInteger          |
|                | randomFloat            |
|                | randomAlphabet         |
|                | randomNaturalArray     |
| Sleep          | sleep                  |

d-> = depent on

**Examples**

[Timeline Demo](https://codesandbox.io/embed/tender-burnell-dbx3f?fontsize=14&hidenavigation=1&theme=dark")

```
import { httpReqValidatorAsync } from "@pairohit/helper";
import express from "express";
const app = express();

/**
 * let say you want to check "id" and "email"
 * present in req.body
 */
app.get("/", async (req, res) => {
  try {
    // rejects if id and email is not present in req.body
    await httpReqValidatorAsync(["id", "email"], req.body);

    return res.status(200).send("Well done!");
  } catch (err) {
    return res.send(err.code).end(err.message);
  }
});

app.listen(3000, () => console.log("Server started at PORT 3000"));

```

```

async function example2() {
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

example2();

```
