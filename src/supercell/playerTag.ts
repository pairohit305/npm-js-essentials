export function validatePlayerTag(playerTag: string) {
  if (playerTag.startsWith("#")) return true;
  return false;
}
