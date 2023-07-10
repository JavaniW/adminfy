import express from "express";
import Student from "../models/student";
const router = express.Router();

router.get(`/students`, (_request, response) => {
  Student.find()
    .exec()
    .then(
      (res) => {
        response.setHeader("content-type", "application/json");
        response.send(JSON.stringify(res));
      },
      (err) => {
        console.log(err);
        response.status(400).send(err);
      }
    )
    .catch(console.error);
});

router.get(`/students/:id`, (request, response) => {
  Student.findById(request.params.id)
    .exec()
    .then(
      (res) => {
        if (!res) {
          response
            .status(404)
            .send(
              `Invalid id: ${request.params.id}\n No student found with id.`
            );
        }
        response.setHeader("content-type", "application/json");
        response.send(res.toJSON());
      },
      (err) => response.status(400).send(err)
    )
    .catch(console.error);
});

router.post(`/students`, (request, response) => {
  const data = request.body;
  const newStudent = new Student({
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: data.dateOfBirth,
    gradeLevel: data.gradeLevel,
  });

  newStudent
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

router.put(`/students/:id`, (request, response) => {
  const data = request.body;
  Student.findOneAndUpdate(
    { _id: data._id },
    {
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      gradeLevel: data.gradeLevel,
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

router.delete(`/students/:id`, (request, response) => {
  Student.findByIdAndDelete(request.params.id)
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

export default router;
