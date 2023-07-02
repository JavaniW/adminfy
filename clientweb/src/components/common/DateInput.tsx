import { ChangeEvent } from "react";
import "../../styles/DateInput.css";

interface Props {
  label?: string;
  name: string;
  handleChange: (event: ChangeEvent<any>) => void;
  value: any;
  placeholder?: string;
}

export const DateInput: React.FunctionComponent<Props> = (props) => {
  if (!props.label)
    return (
      <input
        placeholder={props.placeholder}
        className="date-input"
        name={props.name}
        onChange={props.handleChange}
      />
    );

  return (
    <label className="label-date-input">
      {props.label}
      <input
        className="date-input"
        placeholder={props.placeholder}
        type="date"
        name={props.name}
        onChange={props.handleChange}
        value={props.value}
      />
    </label>
  );
};
