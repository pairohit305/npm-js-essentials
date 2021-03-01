import * as helper from "../src";

(async () => {
  console.log("** started **\n\n");
  console.time("s");
  // new helper.Timeline("20210228T120000.000Z", "20210328T121500.000Z")
  //   .onStart(() => {
  //     console.log("started", helper.Dates.dime());
  //   })
  //   .onUpdate((p) => console.log(p))
  //   .start();
  console.log(helper.Dates.timealterBy("20210301T000000.000Z", 7));

  console.timeEnd("s");
  console.log("\n\n** ended **");
})();
