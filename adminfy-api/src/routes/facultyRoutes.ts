import express from "express";
import Faculty from "../models/faculty";
const router = express.Router();

router.get(`/faculty`, (_request, response) => {
    Faculty.find().then(response.send).catch(console.log);
})

router.get(`/faculty/:id`, (request, response) => {
    Faculty.findById(request.params.id).then(response.send).catch(console.log);
})

router.post(`/faculty`, (request, response) => {
    const _faculty = JSON.parse(request.body);
    const newFaculty = new Faculty(
        request.body
        // {
        // firstName: _faculty.firstName,
        // lastName: _faculty.lastName,
        // subject: _faculty.subject,
        // grade: _faculty.grade
        //  }
    );
    newFaculty.save()
        .then(res => {
            response.redirect("localhost:3000/courses");
        })
        .catch(console.log);
}); 

router.put(`/faculty/:id`, (request, response) => {
    const _faculty = JSON.parse(request.body);
    Faculty.findOneAndUpdate({_id: _faculty._id}, {
        firstName: _faculty.firstName,
        lastName: _faculty.lastName,
        subject: _faculty.subject,
        grade: _faculty.grade,
        image: _faculty.image
    }, {new: true});
}); 

export default router;