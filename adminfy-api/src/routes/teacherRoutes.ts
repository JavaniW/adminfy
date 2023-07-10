import express from "express";
import Teacher from "../models/teacher";
import Course from "../models/course";
// import Course fro
const router = express.Router();

router.get(`/teachers`, (_request, response) => {
  Teacher.find()
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

router.get(`/teachers/:id`, (request, response) => {
  Teacher.findById(request.params.id)
    .exec()
    .then(
      (res) => {
        if (!res) {
          response
            .status(404)
            .send(
              `Invalid id: ${request.params.id}\n No teacher found with id.`
            );
        }
        response.setHeader("content-type", "application/json");
        response.send(res.toJSON());
      },
      (err) => response.send(err)
    )
    .catch(console.error);
});

router.post(`/teachers`, (request, response) => {
  const data = request.body;
  const newTeacher = new Teacher({
    firstName: data.firstName,
    lastName: data.lastName,
    subject: data.subject,
    grade: data.grade,
  });
  newTeacher
    .save()
    .then(
      (res) => {
        response.setHeader("content-type", "application/json");
        response.send(res.toJSON());
      },
      (err) => response.status(400).send(err)
    )
    .catch(console.error);
});

router.put(`/teachers/:id`, (request, response) => {
  const data = request.body;
  Teacher.findOneAndUpdate(
    { _id: data._id },
    {
      firstName: data.firstName,
      lastName: data.lastName,
      subject: data.subject,
      grade: data.grade,
      image: data.image,
    },
    { new: true }
  )
    .exec()
    .then(
      (res) => {
        response.setHeader("content-type", "application/json");
        response.send(res.toJSON());
      },
      (err) => response.status(400).send(err)
    )
    .catch(console.error);
});

router.delete(`/teachers/:id`, (request, response) => {
  Course.exists({ teacher: request.params.id })
    .exec()
    .then(
      (res) => {
        if (res) {
          return response
            .status(400)
            .send("Cannot remove teacher that is assigned to a course.");
        }
        Teacher.findByIdAndDelete(request.params.id)
          .exec()
          .then(
            (res) => {
              response.setHeader("content-type", "application/json");
              response.send(res.toJSON());
            },
            (err) => response.status(400).send(err)
          );
      },
      (err) => response.status(400).send(err)
    )
    .catch(console.error);
});

export default router;
