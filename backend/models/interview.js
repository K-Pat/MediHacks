// backend/models/interview.js
import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const interviewSchema = mongoose.Schema({
    uuid: {
        type: String,
        default: uuidv4,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    interviewType: {
        type: String,
        required: true,
    },
    interviewRole: {
        type: String,
        required: true,
    },
    selectedTime: {
        type: String,
        required: true,
    },
});

export const Interview = mongoose.model("Interview", interviewSchema);
