import { halt, HaltTracker } from "@pairohit305/js-essentials";

// Halt function can be useful if you have many async function which are
// independent of each other, use halt to make them in sequence.

// Example 1
async function example1() {
  console.log("** started **");
  const haltTracker = new HaltTracker();

  setTimeout(() => {
    haltTracker.stop();
  }, 1000);

  console.log("** mid way **");
  await halt(haltTracker, 5);

  // things below will be in halt untill the hc.count becomes 5
  console.log("** ended **");
}

example1();
