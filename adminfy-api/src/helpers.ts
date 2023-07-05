export const getPagination = (page: string, size: string) => {
  const limit = size ? +size : 3;
  const offset = page ? +page * limit : 0;

  return { limit, offset };
};

export function difference(A: string[], B: string[]) {
  // const arrA = Array.isArray(A) ? A.map((x) => x.toString()) : [A.toString()];
  // const arrB = Array.isArray(B) ? B.map((x) => x.toString()) : [B.toString()];

  const result = [];
  for (const p of A) {
    if (B.indexOf(p) === -1) {
      result.push(p);
    }
  }

  return result;
}
