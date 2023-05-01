// import {useState} from "react";
import { Faculty } from "./models/Faculty";
import "./styles/FacultyPage.css";
import { FacultyList } from "./FacultyList";

export function FacultyPage() {
  const fac: Faculty[] = [
    {
      image: "/spongebob.png",
      name: "Frank",
      subject: "English",
      grade: 12,
    },
    {
      image: "/spongebob.png",
      name: "Sarah",
      subject: "Math",
      grade: 11,
    },
    {
      image: "/spongebob.png",
      name: "Tommy",
      subject: "Social Studies",
      grade: 12,
    },
  ];
  // const [faculty, _setFaculty] = useState<Faculty[]>(fac);

  return <FacultyList faculty={fac} />;
}
