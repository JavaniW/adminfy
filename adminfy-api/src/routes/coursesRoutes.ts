import express from "express";
``;
import Course from "../models/course";
const router = express.Router();

router.get(`/courses`, (_request, response) => {
  Course.find()
    .populate("teacher")
    .then(
      (res) => {
        response.setHeader("content-type", "application/json");
        response.send(JSON.stringify(res));
      },
      (err) => response.send(err)
    )
    .catch(console.error);
});

router.get(`/courses/:id`, (request, response) => {
  Course.findById(request.params.id)
    .populate("teacher")
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
      (err) => response.send(err)
    )
    .catch(console.error);
});

router.post(`/courses`, (request, response) => {
  const data = request.body;
  const newCourse = new Course({
    name: data.name,
    number: data.number,
    teacher: data.teacher,
    subject: data.subject,
  });
  newCourse
    .save()
    .then(
      (res) => {
        response.setHeader("content-type", "application/json");
        response.send(res.toJSON());
      },
      (err) => {
        console.log("Error on backend");
        console.log(data);
        console.log(err);
        response.send(err);
      }
    )
    .catch(console.error);
});

router.put(`/courses/:id`, (request, response) => {
  const data = request.body;
  Course.findOneAndUpdate(
    { _id: data._id },
    {
      courseNumber: data.courseNumber,
      teacher: data.teacher,
      subject: data.subject,
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
