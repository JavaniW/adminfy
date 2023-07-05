import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./slices/coursesSlice";
import teachersReducer from "./slices/teachersSlice";
import studentsReducer from "./slices/studentsSlice";
import { apiSlice } from "./apiSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    teachers: teachersReducer,
    students: studentsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
