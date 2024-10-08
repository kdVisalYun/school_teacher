export const generate = (length: number) => {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);

  for (let i = 0; i < length; i++) {
    result += charset[array[i] % charset.length];
  }

  return result;
};
