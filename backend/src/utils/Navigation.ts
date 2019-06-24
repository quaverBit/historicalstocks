export function supportExtensions(consctructor: any) {
  const keys = Object.keys(consctructor);
  keys.forEach((key: string) => {
    consctructor[key] = `${consctructor[key]}\.?:ext?`;
  });
}