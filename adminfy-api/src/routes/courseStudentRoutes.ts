import express from "express";
``;
import CourseStudent from "../models/courseStudent";

const router = express.Router();

router.get(`/courses/:courseid/students`, (request, response) => {
  CourseStudent.find({ course: request.params.courseid })
    .populate("student")
    .select("student")
    .then(
      (res) => {
        response.setHeader("content-type", "application/json");
        response.send(JSON.stringify(res));
      },
      (err) => {
        response.status(400);
        response.send(err);
      }
    )
    .catch(console.error);
});

router.get(`/courses/:courseid/students/:studentid`, (request, response) => {
  CourseStudent.find({
    course: request.params.courseid,
    student: request.params.studentid,
  })
    .populate("student")
    .select("student")
    .then(
      (res) => {
        response.setHeader("content-type", "application/json");
        response.send(JSON.stringify(res));
      },
      (err) => {
        response.status(400);
        response.send(err);
      }
    )
    .catch(console.error);
});

router.post(`/courses/:courseid/students`, (request, response) => {
  const students: string[] = request.body;

  CourseStudent.create(
    students.map((studentId) => ({
      course: request.params.courseid,
      student: studentId,
    }))
  )
    .then(
      (res) => {
        response.setHeader("content-type", "application/json");
        response.send(JSON.stringify(res));
      },
      (err) => {
        response.status(400);
        response.send(err);
      }
    )
    .catch(console.error);
});

export default router;
