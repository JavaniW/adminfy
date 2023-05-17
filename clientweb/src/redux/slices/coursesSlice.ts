import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Course } from "../../models/Course";

interface CoursesState {
  courses: Course[];
}

const initialState: CoursesState = { courses: [] };

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    FETCH_COURSES: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
    CREATE_COURSE: (state, action: PayloadAction<Course>) => {
      state.courses.push(action.payload);
    },
    UPDATE_COURSE: (state, action: PayloadAction<Course>) => {
      const idx = state.courses.findIndex((x) => x._id === action.payload._id);
      state.courses[idx] = {
        ...state.courses[idx],
        ...action.payload,
        teacher: { ...action.payload.teacher },
        students: [...action.payload.students],
      };
    },
    DELETE_COURSE: (state, action: PayloadAction<string | number>) => {
      state.courses.filter((x) => x._id !== action.payload);
    },
  },
});

export const { CREATE_COURSE, UPDATE_COURSE, DELETE_COURSE } =
  coursesSlice.actions;
export default coursesSlice.reducer;
