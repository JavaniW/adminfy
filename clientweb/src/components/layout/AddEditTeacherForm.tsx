import '../../styles/AddEditModal.css';

import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { toast } from 'react-toastify';

import TeacherApi from '../../api/teacherApi';
import CourseSubject, { CourseSubjects } from '../../enums/CourseSubject';
import GradeLevel, { GradeLevels } from '../../enums/GradeLevel';
import { Teacher } from '../../models/Teacher';
import { TextInput } from '../common/TextInput';
import { DynamicSelect } from '../common/DynamicSelect';

interface AddEditTeacherFormProps {
    onAfterSubmit : () => any;
}

export function AddEditTeacherForm(props : AddEditTeacherFormProps) {
    const [teacher, setTeacher] = useState<Teacher>({
        _id: "",
        firstName: "",
        lastName: "",
        subject: CourseSubject.English as CourseSubject,
        grade: GradeLevel.Nine as GradeLevel
     } as Teacher);

    function handleChange (event : ChangeEvent<any>) {
        setTeacher({...teacher, [event.target.name]: event.target.value});
    };

    function handleSelectChange ({name, value} : {name: string, value: any}) {
        setTeacher({...teacher, [name]: value});
    };
    

    function handleSubmit(event : SyntheticEvent) {
        event.preventDefault();
        console.log("Pressed");
        TeacherApi.saveTeacher(teacher)
            .then((addedTeacher : Teacher) => {
                console.log("X baby ");
                console.log(addedTeacher);
                toast("successfully added", {
                    position: "top-right",
                    autoClose: 3000
                });
                props.onAfterSubmit();
            }, () => {
                console.log("Rejected");
            })
            .catch(console.error);
    }

    return (
        <form onSubmit={handleSubmit} id="add-edit-teacher-form" className="add-edit-form course-form">
            <TextInput required={true} label='First Name:' handleChange={handleChange} value={teacher.firstName}  name='firstName'/>
            <TextInput required={true} label='Last Name:' handleChange={handleChange} value={teacher.lastName}  name='lastName'/>
            <DynamicSelect name='subject' onSelectChange={handleSelectChange} value={teacher.subject} label={"Subject"} arrayOfOptions={CourseSubjects.map(x => ({label: x, value: x}))} />
            <DynamicSelect name='grade' onSelectChange={handleSelectChange} value={teacher.grade} label={"Grade"} arrayOfOptions={GradeLevels.map(x => ({label: x, value: x}))}/>
        </form>
    )
}