import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import interviewsRoute from "./routes/interviewsRoute.js";
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/interviews', interviewsRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("app connected to database");
    const port = process.env.PORT || PORT;
    app.listen(port, () => {
      console.log(`app is listening to port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
