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
      (err) => response.send(err)
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
      (err) => response.send(err)
    )
    .catch(console.error);
});

router.post(`/courses/:courseid/students/:studentid`, (request, response) => {
  const newCourseStudent = new CourseStudent({
    course: request.params.courseid,
    student: request.params.studentid,
  });
  newCourseStudent
    .save()
    .then(
      (res) => {
        response.setHeader("content-type", "application/json");
        response.send(res.toJSON());
      },
      (err) => response.send(err)
    )
    .catch(console.error);
});
