import express from "express";
import Teacher from "../models/teacher";
const router = express.Router();

router.get(`/teachers`, (_request, response) => {
  Teacher.find()
    .then(
      (res) => {
        response.setHeader("content-type", "application/json");
        response.send(JSON.stringify(res));
      },
      (err) => response.send(err)
    )
    .catch(console.error);
});

router.get(`/teachers/:id`, (request, response) => {
  Teacher.findById(request.params.id)
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
      (err) => response.send(err)
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
    .then(
      (res) => {
        response.setHeader("content-type", "application/json");
        response.send(res.toJSON());
      },
      (err) => response.send(err)
    )
    .catch(console.error);
});

export default router;
