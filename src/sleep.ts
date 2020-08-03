export async function sleep(timeout: number) {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}
