import { useState } from "react";
import "./styles/CoursesPage.css";

export function CoursesPage() {

    // const [courses, setCourses] = useState<string[]>([]);
    // const [subjects, setsubjects] = useState<string[]>([]);

    const subjects = [
        "Math",
        "English",
        "Social Studies",
        "History"
    ];

    return (
        <table className="courses-list">
            <thead>
                <th>
                    <select name="subject" id="subject">
                        <option key={"all"} value={"all"} selected>All</option>
                        {subjects.map((x, idx) => (
                            <option key={idx} value={x}>{x}</option>
                        ))}
                    </select>
                </th>
            </thead>
        </table>
    )
}