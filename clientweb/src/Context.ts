import { createContext } from "react";
import { Teacher } from "./models/Teacher";

export const TeachersContext = createContext<Teacher[]>([]);