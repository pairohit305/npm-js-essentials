import { v5 as uuidv5 } from "uuid";
import crypto from "crypto";

// generate uid base on version uuid v5
export function genUniqueId(appName: string, key: string) {
  let uid = uuidv5(appName + key, uuidv5.URL);
  return uid;
}

export function genRandomUniqueId() {
  return uuidv5(crypto.randomBytes(8).toString("hex"), uuidv5.URL);
}
