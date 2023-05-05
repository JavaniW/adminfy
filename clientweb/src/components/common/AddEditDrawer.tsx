import { ReactElement } from "react";
import ModelType from "../../enums/ModelType";
// import { AddEditCourseForm } from "./AddEditCourseForm";
import { AddEditFacultyForm } from "./AddEditFacultyForm";

interface AddEditDrawerProps {
    model: ModelType;
    trigger: ReactElement | JSX.Element;
}



export function AddEditDrawer(props: AddEditDrawerProps) {

    const [openDrawer, setOpenDrawer] = useState<boolean>(false);

    return (

        <div className="add-edit-drawer">
            {props.model === ModelType.Faculty && (
                <AddEditFacultyForm />
            )}
            {/* {props.model === ModelType.Course && (
                <AddEditCourseForm />
            )}
            {props.model === ModelType.Student && (
                <AddEditStudentForm />
            )} */}
        </div>
    )
}