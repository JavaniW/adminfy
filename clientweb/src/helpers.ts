import { Pagination } from "./models/Misc";

export function getFullName<T extends Object, K extends keyof T>(
  entity: T,
  ...fields: K[]
): string {
  const names = fields.map((x) => entity[x]).join(" ");
  return names;
}

export function paginate<T>(
  data: T[],
  page: number,
  limit: number = 7
): Pagination<T> {
  const firstElementIdx = 0 + page * limit;

  const hasPrev = firstElementIdx > 0;
  const hasNext = firstElementIdx + limit < data.length - 1;

  return firstElementIdx > data.length - 1
    ? {
        data: [],
        hasPrevOrNext: { prevDisabled: !hasPrev, nextDisabled: !hasNext },
      }
    : {
        data: data.slice(0 + page * limit, firstElementIdx + limit),
        hasPrevOrNext: { prevDisabled: !hasPrev, nextDisabled: !hasNext },
      };
}
