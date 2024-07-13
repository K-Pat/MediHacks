/*
import React, { useEffect, useState} from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const TestDataView = () => {

    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/interviews')
            .then((response) => {
                setInterviews(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);


    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Interview List</h1>
                <Link to='/interviews/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <table className='w-full border-seperate border-spacing-2'>
                    <thead>
                        <tr>
                            <th className='border border-slate-600 rounded-md'>No</th>
                            <th className='border border-slate-600 rounded-md'>Title</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Author</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Publisher</th>
                            <th className='border border-slate-600 rounded-md'>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {interviews.map((interview, index) => (
                            <tr key ={interview._id} className ='h-8'>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {index+1}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {interview.interviewType}
                                </td>
                                <td className="border border-slate-700 rounded-md text-center">
                                    {interview.interviewTime}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
export default TestDataView;

*/

