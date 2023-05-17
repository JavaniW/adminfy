import { SyntheticEvent } from "react";
import "../../styles/TextLabel.css";

interface Props {
  label: string;
  handleChange: (e: SyntheticEvent) => void;
  value: any;
  name: string;
  required: boolean;
}

export const TextInput: React.FunctionComponent<Props> = (props) => {
  return (
    <label className="text-label">
      <p>{props.label}</p>
      <input
        onChange={props.handleChange}
        value={props.value}
        type="text"
        name={props.name}
        required={props.required}
      />
    </label>
  );
};
