import { ChangeEvent } from "react";
import "../../styles/DateInput.css";

interface Props {
  label?: string;
  name: string;
  handleChange: (event: ChangeEvent<any>) => void;
  value: any;
}

export const DateInput : React.FunctionComponent<Props> = (props) => {
  if (!props.label)
    return (
      <input
        className="date-input"
        name={props.name}
        onChange={props.handleChange}
      />
    );

  return (
    <label className="label-date-input">
      <p>{props.label}</p>
      <input
        type="date"
        name={props.name}
        onChange={props.handleChange}
        value={props.value}
      />
    </label>
  );
}
