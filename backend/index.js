import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import {Interview} from "./models/interview.js";
import interviewsRoute from "./routes/interviewsRoute.js";

const app = express();

app.use(express.json());

app.get('/', (request, response) =>{
    console.log(request);
    return response.status(234).send("TEST GET ROUTE");
});

app.use('/interviews', interviewsRoute);

mongoose
    .connect(mongoDBURL)
    .then(() =>{
        console.log("app connected to database")
        app.listen(PORT, ()=>{
            console.log(`app is listening to port: ${PORT}`);
        })
    })
    .catch((error) =>{
        console.log(error)
    })