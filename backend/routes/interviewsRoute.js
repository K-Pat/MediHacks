import express from 'express';
import {Interview} from '../models/interview.js';

const router = express.Router();

router.post('/', async (request, response) => {
    try {
        if(
            !request.body.interviewType ||
            !request.body.interviewLevel ||
            !request.body.selectedTime
        ){
            return response.status(400).send({
                message: 'send all required fields: Interview Type, Interview Level, Interview Time'
            });
        }
        const newInterview = {
            interviewType: request.body.interviewType,
            interviewLevel: request.body.interviewLevel,
            selectedTime: request.body.selectedTime
        };
        const interview = await Interview.create(newInterview);
        return response.status(201).send(interview)
    } catch (error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

router.get('/', async (request, response) => {
    try{
        //pass in an empty object to get a list of all interviews
        const interviews = await Interview.find({})

        return response.status(200).json({
            count: interviews.length,
            data: interviews
        });
    }catch (error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//route to get individual interview by the interviewID
router.get('/:id', async (request, response) => {
    try{

        const { id } = request.params;
        
        const interview = await Interview.findById(id);

        return response.status(200).json({
            count: interview.length,
            data: interview
        });
    }catch (error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

router.put('/:id', async (request, response) => {
    try{
        if(
            !request.body.interviewType ||
            !request.body.interviewLevel ||
            !request.body.selectedTime
        ){
            return response.status(400).send({
                message: 'send all required fields: Interview Type, Interview Level, Interview Time'
            });
        }
    
        const {id} = request.params;
        const result = await Interview.findByIdAndUpdate(id, request.body);

        if (!result){
            return response.status(404).json({message: 'Interview not found'});
        }
        return response.status(200).send({message: "Interview updated succsesfully"});
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});  
    }
});

router.delete('/:id', async (request, response) => {
    try{
        const {id} = request.params; 

        const result = await Interview.findByIdAndDelete(id);
        if (!result){
            return response.status(404).json({message: 'Interview not found'});
        }
        return response.status(200).send({message: "Interview deleted succsesfully"});
    }catch (error){
        console.log(error.message);
        response.status(500).send({message:error.message});  
    }
})

export default router;