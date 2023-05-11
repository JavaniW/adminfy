import { ChangeEvent } from "react";
import "../../styles/DateInput.css";

interface DateInputProps {
    label?: string;
    name: string;
    handleChange: (event: ChangeEvent<any>) => void;
}
export function DateInput(props : DateInputProps) {

    if (!props.label) return (
        <input className="date-input" name={props.name}  onChange={props.handleChange}/>
    )

    return (
        <label className="label-date-input">
            <p>{props.label}</p>
            <input type="date" name={props.name}  onChange={props.handleChange}/>
        </label>
    );
}