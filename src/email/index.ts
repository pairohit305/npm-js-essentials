import { jsFuncErrDetector } from "../parser";

export function validateEmail(email: string) {
  jsFuncErrDetector(["string"], arguments, validateEmail);

  let tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  if (!email) return false;

  if (email.length > 254) return false;

  let valid = tester.test(email);
  if (!valid) return false;

  // Further checking of some things regex can't handle
  let parts = email.split("@");
  if (parts[0].length > 64) return false;

  let domainParts = parts[1].split(".");
  if (
    domainParts.some(function (part) {
      return part.length > 63;
    })
  )
    return false;

  return true;
}
