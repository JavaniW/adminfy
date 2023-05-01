import { ReactNode, useEffect } from "react";
import { nameof } from "./extensions";

export type Header<T> = {
    headerLabel?: string;
    isOptional: boolean;
    dependentValue?: boolean | (() => boolean);
    referenceData : keyof T;
}

interface TableListProps<T extends Object> {
    data: T[];
    headers: Header<T>[];
    filterSource: keyof T;
    filterValue: any;
}

export function TableList<T extends Object>(props : TableListProps<T>) {

    function debug(args : any) {
        debugger;
        return true;
   }
    
    return (
        <>
        {props.data
            .filter((x) => {return props.filterValue === "All" ? true : x[props.filterSource] === props.filterValue })
            .map((x, idx) => (
            <table key={idx} className="table-list-item">
                <thead key={idx} className="table-list-item-header">
                    <tr key={idx}>
                        {
                            props.headers.map((header, idx1) => (
                                header.isOptional ? (header.dependentValue ? <th key={idx1}>{header.headerLabel}</th> : null) : <th key={idx1}>{header.headerLabel}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                <tr>
                    {
                        props.headers.filter(y => !y.isOptional || y.dependentValue).map((header, idx2) => (
                            <td key={idx2}>{x[header.referenceData] as ReactNode}</td>
                        ))
                    }
                </tr>
                </tbody>
            </table>
            ))}
        </>
    )
}