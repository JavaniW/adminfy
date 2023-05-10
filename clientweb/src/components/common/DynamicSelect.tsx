import React, {ChangeEvent, PropsWithChildren} from 'react';

export type option = {
    label: any;
    value: any;
}

interface OptionProps {
    key: string | number;
    value: any;
}

interface DynamicSelectProps {
    label?: string | number;
    id?: string;
    name: string;
    onSelectChange: (value : any) => any;
    arrayOfOptions: option[];
    value: any;
}

function Option(props : PropsWithChildren<OptionProps>) {
    return (
        <option key={props.key} value={props.value}>
            {props.children}
        </option>
    )
}


export function DynamicSelect(props : DynamicSelectProps) {
    function handleChange(event : ChangeEvent<HTMLSelectElement>) {
        // debugger;
        props.onSelectChange({name: event.target.name, value :event.target.value});
    }

    if (!props.label) return (
        <select id={props.id} className='select' value={props.value} onChange={handleChange} name={props.name}>
            {
                props.arrayOfOptions.map((x, idx) => (
                    <DynamicSelect.Option key={idx} value={x.value}>{x.label}</DynamicSelect.Option>
                ))
            }
        </select>
    );

    return (
        <div className="label-select">
            <label>
                <p>{props.label}</p>
                <select id={props.id} value={props.value} onChange={handleChange} name={props.name}>
                    {
                        props.arrayOfOptions.map((x, idx) => (
                            <DynamicSelect.Option key={idx} value={x.value}>{x.label}</DynamicSelect.Option>
                        ))
                    }
                </select>
            </label>
        </div>
    )
}

DynamicSelect.Option = Option;
