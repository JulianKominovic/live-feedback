export async function sha256(str: string) {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    // @ts-expect-error no errors here
    new TextEncoder("utf-8").encode(str)
  );
  return Array.prototype.map
    .call(new Uint8Array(buf), (x) => ("00" + x.toString(16)).slice(-2))
    .join("");
}
