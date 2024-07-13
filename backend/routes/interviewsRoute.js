// backend/routes/interviewRoutes.js
import express from 'express';
import { Interview } from '../models/interview.js';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/', async (request, response) => {
    try {
        const { email, interviewType, interviewRole, selectedTime } = request.body;
        if (!email || !interviewType || !interviewRole || !selectedTime) {
            return response.status(400).send({
                message: 'All fields are required: Email, Interview Type, Interview Role, Selected Time'
            });
        }
        const matched = "false";
        const newInterview = { email, interviewType, interviewRole, selectedTime, matched };
        const interview = await Interview.create(newInterview);

        // Check for potential match
        const potentialMatch = await Interview.findOne({
            interviewType,
            interviewRole: interviewRole === 'Interviewer' ? 'Interviewee' : 'Interviewer',
            selectedTime,
            email: { $ne: email },
            matched: "false"
        });

        if (potentialMatch) {
            // Update the matched property for both interviews
            await Interview.findByIdAndUpdate(interview._id, { matched: potentialMatch.email }, { new: true });
            await Interview.findByIdAndUpdate(potentialMatch._id, { matched: interview.email }, { new: true });

            // Send email notifications
            await sendMatchEmails(interview, potentialMatch);
        }

        return response.status(201).send(interview);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

const sendMatchEmails = async (interview, match) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kavyanpatel1104@gmail.com',
            pass: 'zjpf lhgy uozj zdof'
        }
    });

    const mailOptions1 = {
        from: 'kavyanpatel1104@gmail.com',
        to: interview.email,
        subject: 'Interview Match Found',
        text: `You have been matched for an interview on ${interview.selectedTime} with ${match.email}.`
    };

    const mailOptions2 = {
        from: 'kavyanpatel1104@gmail.com',
        to: match.email,
        subject: 'Interview Match Found',
        text: `You have been matched for an interview on ${match.selectedTime} with ${interview.email}.`
    };

    await transporter.sendMail(mailOptions1);
    await transporter.sendMail(mailOptions2);
};

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
