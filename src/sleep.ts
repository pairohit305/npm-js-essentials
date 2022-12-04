export async function sleep(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, timeout);
  });
}
