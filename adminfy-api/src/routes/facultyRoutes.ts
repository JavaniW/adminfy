import express from "express";
import Faculty from "../models/faculty";
const router = express.Router();

router.get(`/faculty`, (_request, response) => {
    Faculty.find().then(response.send).catch(console.log);
})

router.get(`/faculty/:id`, (request, response) => {
    Faculty.findById(request.params.id).then(response.send).catch(console.log);
})

export default router;