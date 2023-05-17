import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Student } from "../../models/Student";

interface StudentsState {
  students: Student[];
}

const initialState: StudentsState = { students: [] };

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    FETCH_STUDENTS: (state, action: PayloadAction<Student[]>) => {
      state.students = action.payload;
    },
    CREATE_STUDENT: (state, action: PayloadAction<Student>) => {
      state.students.push(action.payload);
    },
    UPDATE_STUDENT: (state, action: PayloadAction<Student>) => {
      const idx = state.students.findIndex((x) => x._id === action.payload._id);
      state.students[idx] = { ...state.students[idx], ...action.payload };
    },
    DELETE_STUDENT: (state, action: PayloadAction<string | number>) => {
      state.students.filter((x) => x._id !== action.payload);
    },
  },
});

export const { CREATE_STUDENT, UPDATE_STUDENT, DELETE_STUDENT } =
  studentsSlice.actions;
export default studentsSlice.reducer;
