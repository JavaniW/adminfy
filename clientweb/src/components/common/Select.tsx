import { ChangeEvent } from "react";
import "../../styles/Select.css";

interface SelectProps {
    options: (string | number | undefined)[] | readonly any[];
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    label: string | number;
    default?: string | number;
    value?: any;
}

export function Select(props: SelectProps) {
    return (
        <div className="select">
            <label className="select-label">
                <p>{props.label.toString()[0].toUpperCase() + props.label.toString().slice(1)}:</p>
                <select
                    className="select-component"
                    name={props.label.toString()}
                    onChange={props.onChange}
                    value={props.value}
                >
                    <option key={props.default} value={props.default}>
                    {props.default}
                    </option>
                    {props.options.map((x, idx) => (
                    <option key={idx} value={x}>
                        {x}
                    </option>
                    ))}
                </select>
            </label>
        </div>
    );
}