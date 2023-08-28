import { GroupBase } from "react-select";
import AsyncSelect, { AsyncProps } from "react-select/async";
import "../../styles/DynamicSelect.css";

interface AsyncDynamicSelectProps {
  label?: string;
}

export function AsyncDynamicSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: AsyncProps<Option, IsMulti, Group> & AsyncDynamicSelectProps) {
  if (!props.label) return <AsyncSelect className="select" {...props} />;

  return (
    <div className="label-select">
      <label className="label-select-label">
        {props.label}
        <AsyncSelect menuPlacement="auto" menuPosition="fixed" {...props} />
      </label>
    </div>
  );
}
