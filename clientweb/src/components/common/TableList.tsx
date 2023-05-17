import { SyntheticEvent } from "react";
import { Course } from "../../models/Course";
import Student from "../../models/Student";
import { Teacher } from "../../models/Teacher";
import { Action } from "./ActionMenu";

type TableListModel = Teacher | Student | Course;
export interface Header<T> {
  label: string;
  referenceData: (x: T) => any;
  show?: () => boolean;
}

interface TableListProps<T> {
  key: keyof T;
  data: T[];
  headers: Header<T>[];
  filterSource: keyof T;
  filterValue: any;
  actions?: Action[];
  onClick?: (event: SyntheticEvent<HTMLTableElement>) => any;
}

export function TableList<T extends TableListModel>(props: TableListProps<T>) {
  if (!props.data.length) return <p>{`No Data...`}</p>;

  function renderTableListItem(item: T, key: number) {
    return (
      <table
        onClick={props.onClick}
        key={key}
        className="table-list-item"
        data-id={item._id}
      >
        <thead className="table-list-item-header">
          <tr>
            {props.headers.map(
              (header) =>
                (!header.show || header.show()) && (
                  <th key={header.label}>{header.label}</th>
                )
            )}
            {/* <ActionMenu actions={props.actions || []}/> */}
          </tr>
        </thead>
        <tbody className="table-list-item-body">
          <tr>
            {props.headers.map(
              (header, idx) =>
                (!header.show || header.show()) && (
                  <td key={`${idx} + ${header.label}`}>
                    {header.referenceData(item)}
                  </td>
                )
            )}
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <>
      {props.data
        .filter(
          (x) =>
            props.filterValue === "All" ||
            x[props.filterSource] === props.filterValue
        )
        .map(renderTableListItem)}
    </>
  );
}
