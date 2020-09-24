import { halt, HaltCounter } from "@pairohit/helper";

// Halt functon can be usefull if you have many async function which are
// independent of each other, use halt to make them in sequence.

// Example 1
async function example1() {
  console.log("** started **");
  let hc = new HaltCounter(0);

  setTimeout(() => {
    hc.count = 5;
  }, 1000);

  console.log("** mid way **");
  await halt(hc, 5);

  // things below will be in halt untill the hc.count becomes 5
  console.log("** ended **");
}
example1();

// Example 2
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
