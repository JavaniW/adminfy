import mongoose from "mongoose";
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    teacher: { type: String, required: true},
    courseNumber: {type: Number, required: true},
    subject: { type: String, required: true},
    enrolled: Number
})