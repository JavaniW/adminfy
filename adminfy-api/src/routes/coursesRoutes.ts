import express from "express";
import Course from "../models/course";
const router = express.Router();

router.get(`/courses`, (_request, response) => {
    Course.find().then(response.send).catch(console.log);
})

router.get(`/courses/:id`, (request, response) => {
    Course.findById(request.params.id).then(response.send).catch(console.log);
})

export default router;