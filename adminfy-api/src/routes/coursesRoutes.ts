import express from "express";
``;
import Course from "../models/course";

const router = express.Router();

router.get(`/courses`, (_request, response) => {
  Course.find()
    .populate("teacher")
    .populate("students")
    .exec()
    .then(
      (res) => {
        response.setHeader("content-type", "application/json");
        response.send(JSON.stringify(res));
      },
      (err) => {
        response.status(400).send(err);
      }
    )
    .catch(console.error);
});

router.get(`/courses/:id/students`, (request, response) => {
  Course.findById(request.params.id)
    .populate("students")
    .select("students")
    .exec()
    .then(
      (res) => {
        response.setHeader("content-type", "application/json");
        response.send(JSON.stringify(res));
      },
      (err) => response.status(400).send(err)
    )
    .catch(console.error);
});

router.get(`/courses/:id`, (request, response) => {
  Course.findById(request.params.id)
    .populate("teacher")
    .populate("students")
    .exec()
    .then(
      (res) => {
        if (!res) {
          response
            .status(404)
            .send(
              `Invalid id: ${request.params.id}\n No course found with id.`
            );
        }
        response.setHeader("content-type", "application/json");
        response.send(res.toJSON());
      },
      (err) => response.status(400).send(err)
    )
    .catch(console.error);
});

router.post(`/courses`, (request, response) => {
  const data = request.body;
  const newCourse = new Course({
    name: data.name,
    symbol: data.symbol,
    teacher: data.teacher,
    subject: data.subject,
    students: data.students,
  });
  newCourse
    .save()
    .then(
      (res) => {
        response.setHeader("content-type", "application/json");
        response.send(JSON.stringify(res));
      },
      (err) => {
        response.status(400).send(err);
      }
    )
    .catch(console.error);
});

router.put(`/courses/:id`, (request, response) => {
  const data = request.body;
  Course.findOneAndUpdate(
    { _id: data._id },
    {
      name: data.name,
      courseNumber: data.courseNumber,
      teacher: data.teacher,
      subject: data.subject,
      students: data.students,
    },
    { new: true }
  )
    .exec()
    .then(
      (res) => {
        response.setHeader("content-type", "application/json");
        response.send(JSON.stringify(res));
      },
      (err) => response.status(400).send(err)
    )
    .catch(console.error);
});

router.delete(`/courses/:id`, (request, response) => {
  Course.findByIdAndDelete(request.params.id)
    .then(
      (res) => {
        response.setHeader("content-type", "application/json");
        response.send(JSON.stringify(res));
      },
      (err) => response.status(400).send(err)
    )
    .catch(console.error);
});
export default router;
