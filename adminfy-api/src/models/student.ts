import mongoose from "mongoose";
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    dateOfBirth: {type: String, required: true},
    gradeLevel: {type: String, enum: ['9', '10', '11', '12'], required: true}
})