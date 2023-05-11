import { ChangeEvent, SyntheticEvent, useState } from "react";
import StudentApi from "../../api/studentApi";
import { DynamicSelect, option } from "../common/DynamicSelect";
import { TextInput } from "../common/TextInput";
import Student from "../../models/Student";
import GradeLevel, { GradeLevels } from "../../enums/GradeLevel";
import { toast } from "react-toastify";
import { DateInput } from "../common/DateInput";

interface AddEditStudentFormProps {
    onAfterSubmit: () => void;
}

export function AddEditStudentForm(props : AddEditStudentFormProps) {

    const [student, setStudent] = useState<Student>({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gradeLevel: "" as GradeLevel
    })

    function handleSubmit(event : SyntheticEvent) {
        event.preventDefault();
        console.log(student);
        StudentApi.saveStudent(student)
            .then((addedStudent : Student) => {
                console.log(addedStudent);
                toast("successfully added", {
                    position: "top-right",
                    autoClose: 3000
                });
                props.onAfterSubmit();
            })
            .catch(console.error);
    }

    function handleSelectChange ({name, value} : {name: string, value: any}) {
        setStudent({...student, [name]: value});
    };

    function handleChange (event : ChangeEvent<any>) {
        setStudent({...student, [event.target.name]: event.target.value});
    };

    const gradeLevelOptions : option[] = [
        {
            label: "",
            value: ""
        },
        ...GradeLevels.map(x => ({label: x, value: x}))
    ];

    return (
        <form onSubmit={handleSubmit} id="add-edit-course-form" className="add-edit-form course-form">
            <TextInput label='First Name:' handleChange={handleChange} value={student.firstName} name='firstName' required={true}/>
            <TextInput label='Last Name:' handleChange={handleChange} value={student.lastName} name='lastName' required={true}/>
            <DateInput label="Birth Date:" name="dateOfBirth" handleChange={handleChange}/>
            <DynamicSelect label="Grade Level" name='gradeLevel' onSelectChange={handleSelectChange} arrayOfOptions={gradeLevelOptions} value={student.gradeLevel}/>
        </form>
    )
}