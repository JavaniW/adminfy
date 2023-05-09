import { SyntheticEvent } from "react";
import "../../styles/TextLabel.css";

interface TextLabelProps {
    label: string;
    handleChange: (e : SyntheticEvent) => void;
    value: any;
    name: string;
    id: string
    required: boolean;
}

export function TextLabel(props : TextLabelProps) {
    return (
        <label className="text-label">
            <p>{props.label}</p>
            <input onChange={props.handleChange} value={props.value} type="text" name={props.name} id={props.id} required={props.required}/>
        </label>
    );
}