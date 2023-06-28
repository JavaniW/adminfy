import Select, { GroupBase, Props } from "react-select";
import "../../styles/DynamicSelect.css";

interface DynamicSelectProps {
  label?: string;
}

export function DynamicSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group> & DynamicSelectProps) {
  if (!props.label)
    return (
      <Select
        className="select"
        {...props}
        isClearable={props.isClearable ?? true}
      />
    );

  return (
    <div className="label-select">
      <label className="label-select-label">
        {props.label}
        <Select {...props} isClearable={props.isClearable ?? true} />
      </label>
    </div>
  );
}
