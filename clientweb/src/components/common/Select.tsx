import '../../styles/Select.css';

import { ChangeEvent } from 'react';

interface SelectProps {
    label: string;
    options: (string | number | undefined)[] | readonly any[];
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    default?: string | number;
    value?: any;
    name: string;
}

export function Select(props: SelectProps) {
    return (
        <div className="select">
            <label className="select-label">
                <p>{props.label}:</p>
                <select
                    className="select-component"
                    name={props.name}
                    onChange={props.onChange}
                    value={props.value}
                >
                    {props.default && <option key={props.default} value={props.default}>
                    {props.default}
                    </option> }
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