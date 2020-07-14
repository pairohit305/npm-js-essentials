import { v5 as uuidv5 } from "uuid";

// generate uid base on version uuid v5
export const genUniqueId = (applicationName: string, key: string) => {
  let uid = uuidv5(applicationName + key, uuidv5.URL);
  return uid;
};
