import mongoose from "mongoose";
const Schema = mongoose.Schema;

const facultySchema = new Schema({
    image: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    subject: {type: String, required: true},
    grade: {type: String, enum: ['9', '10', '11', '12'], required: true}
})