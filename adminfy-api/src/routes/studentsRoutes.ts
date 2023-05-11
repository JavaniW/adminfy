import express from "express";
import Student from "../models/student";
const router = express.Router();

router.get(`/students`, (_request, response) => {
    Student.find().then(res => {
        response.setHeader("content-type", "application/json");
        response.send(JSON.stringify(res));
    }, (err) => response.send(err)).catch(console.error);
})

router.get(`/students/:id`, (request, response) => {
    Student.findById(request.params.id).then(res => {
        response.setHeader("content-type", "application/json");
        response.send(JSON.stringify(res));
    }, (err) => response.send(err)).catch(console.error);
})

router.post(`/students`, (request, response) => {
    const data = request.body;
    const newStudent = new Student({
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        gradeLevel: data.gradeLevel 
    })

    newStudent.save()
        .then(res => {
            response.setHeader("content-type", "application/json");
            response.send(res.toJSON());
        }, (err) => { console.log(err); response.send(err)})
        .catch(console.error);
})

router.post(`/students/:id/courses/:id`, (request, response) => {
    const data = request.body;
    const newStudent = new Student({
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        gradeLevel: data.gradeLevel 
    })

    newStudent.save()
        .then(res => {
            response.setHeader("content-type", "application/json");
            response.send(res.toJSON());
        }, (err) => response.send(err))
        .catch(console.error);
})

router.put(`/students/:id`, (request, response) => {
    const data = request.body;
    Student.findOneAndUpdate({_id: data._id}, {
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        gradeLevel: data.gradeLevel 
    }, {new: true})
    .then(res => {
        response.setHeader("content-type", "application/json");
        response.send(res);
    }, (err) => response.send(err))
    .catch(console.error);
})

export default router;