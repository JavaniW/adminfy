import express from "express";
import Student from "../models/student";
const router = express.Router();

router.get(`/courses`, (_request, response) => {
    Student.find().then(response.send).catch(console.log);
})

router.get(`/courses/:id`, (request, response) => {
    Student.findById(request.params.id).then(response.send).catch(console.log);
})

export default router;