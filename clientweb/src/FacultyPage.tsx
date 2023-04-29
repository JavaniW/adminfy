// import {useState} from "react";
import { Faculty } from "./models/Faculty";
import { FacultyListItem } from "./FacultyListItem";
import "./styles/FacultyPage.css";

export function FacultyPage() {
    const fac : Faculty[] = [
        {
            image: "/spongebob.png",
            name: "Frank",
            subject: "English",
            grade: 12
        },
        {
            image: "/spongebob.png",
            name: "Sarah",
            subject: "Math",
            grade: 11
        },
        {
            image: "/spongebob.png",
            name: "Tommy",
            subject: "Social Studies",
            grade: 12
        }
    ];
    // const [faculty, _setFaculty] = useState<Faculty[]>(fac);
    
    
    return (
        <table className="faculty-list">
            <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Subject</th>
                    <th>Grade</th>
                </tr>
            </thead>
            <tbody>
                {
                    fac.map((x, idx) => <FacultyListItem key={idx} faculty={x}/>)   
                }
            </tbody>
        </table>
    )
}