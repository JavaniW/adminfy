export interface Pagination<T> {
  data: T[];
  hasPrevOrNext: { prevDisabled: boolean; nextDisabled: boolean };
}
