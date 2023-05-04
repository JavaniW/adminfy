import express from "express";
import mongoose from "mongoose";
import courseRouter from "./routes/coursesRoutes";
import studentRouter from "./routes/studentsRoutes";
import facultyrouter from "./routes/facultyRoutes";


const app = express();
const port = 8080; // default port to listen
const baseRoute ="/api";
const mongoDbUri = "mongodb+srv://adminfyuser:$Lilwood12@cluster0.vonxhzd.mongodb.net/adminfy?retryWrites=true&w=majority";
mongoose.connect(mongoDbUri).then((_result) => console.log("connected to db")).catch(err => console.error(err));
// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );

// registering routers
app.use(baseRoute, courseRouter);
app.use(baseRoute, studentRouter);
app.use(baseRoute, facultyrouter);
