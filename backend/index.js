import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";

const app = express();

app.get('/', (request, response) =>{
    console.log(request);
    return response.status(234).send("TEST GET ROUTE");
});

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