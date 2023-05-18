export function getFullName<T extends Object, K extends keyof T>(
  entity: T,
  ...fields: K[]
) {
  const names = fields.map((x) => entity[x]).join(" ");
  return names;
}
