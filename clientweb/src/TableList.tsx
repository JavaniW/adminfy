import { ReactNode } from "react";

export type Header<T> = {
  headerLabel?: string;
  isOptional: boolean;
  dependentValue?: boolean | (() => boolean);
  referenceData: keyof T;
  isImg?: boolean;
};

interface TableListProps<T extends Object> {
  data: T[];
  headers: Header<T>[];
  filterSource: keyof T;
  filterValue: any;
}

export function TableList<T extends Object>(props: TableListProps<T>) {
  return (
    <>
      {props.data
        .filter((x) => {
          //   debugger;
          return props.filterValue === "All"
            ? true
            : x[props.filterSource] === props.filterValue;
        })
        .map((x, idx) => (
          <table key={idx} className="table-list-item">
            <thead key={idx} className="table-list-item-header">
              <tr key={idx}>
                {props.headers.map((header, idx) =>
                  header.isOptional ? (
                    header.dependentValue ? (
                      <th key={idx}>{header.headerLabel}</th>
                    ) : null
                  ) : (
                    <th key={idx}>{header.headerLabel}</th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              <tr>
                {props.headers
                  .filter((y) => !y.isOptional || y.dependentValue)
                  .map((header, idx) => (
                    <td key={idx}>
                      {header.isImg ? (
                        <img
                          className="table-list-item-img"
                          src={x[header.referenceData] as string}
                          alt="faculty"
                        ></img>
                      ) : (
                        (x[header.referenceData] as ReactNode)
                      )}
                    </td>
                  ))}
              </tr>
            </tbody>
          </table>
        ))}
    </>
  );
}
