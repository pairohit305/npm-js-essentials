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
