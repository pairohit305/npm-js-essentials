import * as helper from "../src";

(async () => {
  console.log("** started **\n\n");
  console.time("s");
  new helper.Timeline("20210228T120000.000Z", "20210328T121500.000Z")
    .onStart(() => {
      console.log("started", helper.Dates.dime());
    })
    .onUpdate((p) => console.log(p))
    .start();
  // console.log(
  // helper.Dates.timestamp({ alterBy: 1, inSecs: true })
  // helper.Dates.ISO({ alterBy: "final" })
  // helper.Dates.ISO()
  // helper.Dates.beautify("Fri, 22 Feb 2021 17:52:36 GMT", "UTC")
  // );

  console.timeEnd("s");
  console.log("\n\n** ended **");
})();
