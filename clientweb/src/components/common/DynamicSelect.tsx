import Select, { GroupBase, Props } from "react-select";
import "../../styles/DynamicSelect.css";

interface DynamicSelectProps {
  label?: string;
  disabled?: boolean;
}

export function DynamicSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group> & DynamicSelectProps) {
  if (!props.label)
    return <Select isDisabled={props.disabled} className="select" {...props} />;

  return (
    <div className="label-select">
      <label className="label-select-label">
        {props.label}
        <Select isDisabled={props.disabled} {...props} />
      </label>
    </div>
  );
}
