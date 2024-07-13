// backend/routes/interviewRoutes.js
import express from 'express';
import { Interview } from '../models/interview.js';

const router = express.Router();

router.post('/', async (request, response) => {
    try {
        const { email, interviewType, interviewRole, selectedTime } = request.body;
        if (!email || !interviewType || !interviewRole || !selectedTime) {
            return response.status(400).send({
                message: 'All fields are required: Email, Interview Type, Interview Level, Selected Time'
            });
        }

        const newInterview = { email, interviewType, interviewRole, selectedTime };
        const interview = await Interview.create(newInterview);
        return response.status(201).send(interview);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get('/', async (request, response) => {
    try {
        const { email } = request.query;
        const filter = email ? { email } : {};
        const interviews = await Interview.find(filter);
        return response.status(200).json({
            count: interviews.length,
            data: interviews
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const interview = await Interview.findById(id);
        return response.status(200).json(interview);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.put('/:id', async (request, response) => {
    try {
        const { email, interviewType, interviewRole, selectedTime } = request.body;
        if (!email || !interviewType || !interviewRole || !selectedTime) {
            return response.status(400).send({
                message: 'All fields are required: Email, Interview Type, Interview Level, Selected Time'
            });
        }

        const { id } = request.params;
        const updatedInterview = await Interview.findByIdAndUpdate(id, request.body, { new: true });

        if (!updatedInterview) {
            return response.status(404).json({ message: 'Interview not found' });
        }
        return response.status(200).send({ message: "Interview updated successfully" });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const deletedInterview = await Interview.findByIdAndDelete(id);
        if (!deletedInterview) {
            return response.status(404).json({ message: 'Interview not found' });
        }
        return response.status(200).send({ message: "Interview deleted successfully" });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
