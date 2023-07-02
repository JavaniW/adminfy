import { Pagination } from "./models/Misc";
import { Option } from "./models/Option";

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
  limit: number = 6
): Pagination<T> {
  const firstElementIdx = 0 + page * limit;

  const hasPrev = firstElementIdx > 0;
  const hasNext = firstElementIdx + limit <= data.length - 1;

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

export const getOptionValue = <T extends Option>(options: T[], val: any) => {
  return options.filter((o) => o.value === val);
};

export const getOptionValues = <T extends Option>(
  options: T[],
  values: any[]
) => {
  return options.filter((o) => values.includes(o.value));
};
