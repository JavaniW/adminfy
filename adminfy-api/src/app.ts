import express from "express";
import mongoose from "mongoose";
import courseRouter from "./routes/coursesRoutes";
import studentRouter from "./routes/studentsRoutes";
import teacherrouter from "./routes/teacherRoutes";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = 8080; // default port to listen
const baseRoute = "/api";
const mongoDbUri = process.env.DB_STRING;
mongoose
  .connect(mongoDbUri)
  .then((_result) => console.log("connected to db"))
  .catch((err) => console.error(err));

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// registering routers
app.use(baseRoute, courseRouter);
app.use(baseRoute, studentRouter);
app.use(baseRoute, teacherrouter);
