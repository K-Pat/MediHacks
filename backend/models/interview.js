import mongoose from "mongoose";

const interviewSchema = mongoose.Schema()

export const interview = mongoose.model("interview", {type: String}, {level: String}, {time: String});