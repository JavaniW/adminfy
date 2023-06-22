import "../../styles/DynamicSelect.css";
import React, { ChangeEvent, PropsWithChildren } from "react";

export type option = {
  label: any;
  value: any;
};

interface OptionProps {
  value: any;
}

interface Props {
  disabled?: boolean;
  label?: string | number;
  id?: string;
  name: string;
  onSelectChange: (value: any) => any;
  arrayOfOptions: option[];
  value: any;
  multiple?: boolean;
}

export const DynamicSelect: React.FunctionComponent<Props> & {
  Option: React.FunctionComponent<PropsWithChildren<OptionProps>>;
} = (props) => {
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    // debugger;
    props.onSelectChange({
      name: event.target.name,
      value: event.target.value,
    });
  }

  if (!props.label)
    return (
      <select
        disabled={!!props.disabled}
        id={props.id}
        className="select"
        value={props.value}
        onChange={handleChange}
        name={props.name}
        multiple={!!props.multiple}
      >
        {props.arrayOfOptions.map((x, idx) => (
          <DynamicSelect.Option key={idx} value={x.value}>
            {x.label}
          </DynamicSelect.Option>
        ))}
      </select>
    );

  return (
    <div className="label-select">
      <label>
        <p>{props.label + ":"}</p>
        <select
          disabled={!!props.disabled}
          id={props.id}
          value={props.value}
          onChange={handleChange}
          name={props.name}
          multiple={!!props.multiple}
        >
          {props.arrayOfOptions.map((x, idx) => (
            <DynamicSelect.Option key={idx} value={x.value}>
              {x.label}
            </DynamicSelect.Option>
          ))}
        </select>
      </label>
    </div>
  );
};

DynamicSelect.Option = (props) => {
  return <option value={props.value}>{props.children}</option>;
};
