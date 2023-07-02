import { SyntheticEvent } from "react";
import "../../styles/TextInput.css";

interface Props {
  label: string;
  onChange: (e: SyntheticEvent) => void;
  value: any;
  name: string;
  required: boolean;
  placeholder?: string;
}

export const TextInput: React.FunctionComponent<Props> = (props) => {
  return (
    <label className="text-label">
      {props.label}
      <input
        placeholder={props.placeholder}
        className="text-input"
        onChange={props.onChange}
        value={props.value}
        type="text"
        name={props.name}
        required={props.required}
      />
    </label>
  );
};
