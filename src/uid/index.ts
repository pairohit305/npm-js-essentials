import { v5 as uuidv5 } from "uuid";
import { randomInteger } from "../random";

// generate uid base on version uuid v5
export function generateUniqueId(lock: string, key: string) {
  let uid = uuidv5(lock + key, uuidv5.URL);
  return uid;
}

export function generateRandomUniqueId() {
  return uuidv5(randomInteger(Math.pow(2, 64)).toString(), uuidv5.URL);
}
