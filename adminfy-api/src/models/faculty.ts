import mongoose from "mongoose";
const Schema = mongoose.Schema;

const facultySchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    image: {type: String, required: false},
    subject: {type: String, enum: ["Math", "History", "Social Studies", "English", 'Science'], required: true},
    grade: {type: String, enum: ['9', '10', '11', '12'], required: true}
}, {timestamps: true, collection: `Faculty`})

const Faculty = mongoose.model(`Faculty`, facultySchema);
export default Faculty;