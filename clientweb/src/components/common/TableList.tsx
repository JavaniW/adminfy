import { ActionMenu } from './ActionMenu';

export interface Header<T> {
  label: string;
  referenceData: ((x : T) => any);
  show?: (() => boolean);
}

interface TableListProps<T extends Object> {
  data: T[];
  headers: Header<T>[];
  filterSource: keyof T;
  filterValue: any;
}

export function TableList<T extends Object>(props: TableListProps<T>) {

  if (!props.data.length) return <p>{`No Data...`}</p>

  function renderTableListItem(item : T, key: number) {
    return (
      <table key={key} className="table-list-item">
            <thead className="table-list-item-header">
            <tr>
                {props.headers.map((header, idx) => (
                  (!header.show || header.show()) && 
                    <th key={idx}>
                        {header.label}
                    </th>
                ))}
                <ActionMenu />
            </tr>
            </thead>
            <tbody className="table-list-item-body">
              <tr>
                {
                  props.headers.map((header, idx) => (
                    (!header.show || header.show()) && 
                    <td key={idx}>
                      {header.referenceData(item)}
                    </td>
                  ))
                }
                <td></td>
              </tr>
            </tbody>
        </table>
    );
  }

  return (
    <>
      {
        props.data
          .filter((x) => props.filterValue === "All" ||  x[props.filterSource] === props.filterValue)
          .map(renderTableListItem)
      }
    </>
  );
}
