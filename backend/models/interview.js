import mongoose from "mongoose";

const interviewSchema = mongoose.Schema({
    interviewType: {
        type: String,
        required: true,
    },
    interviewLevel: {
        type: String,
        required: true,
    },
    selectedTime: {
        type: String,
        required: true,
    },
});

export const Interview = mongoose.model("interview", interviewSchema);