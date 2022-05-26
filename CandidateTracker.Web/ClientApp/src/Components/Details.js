import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {useCountContext} from '../CountContext';

const Details = () => {
    const [candidate, setCandidate] = useState({});
    const [confirmOrRefuse, setConfirmOrRefuse] = useState(false);
    const { id } = useParams();
    const {setConfirmedCount, setRefusedCount, setPendingCount} = useCountContext();

    useEffect(() => {
        const getCandidate = async () => {
            const { data } = await axios.get(`/api/candidatetracker/getcandidatebyid?id=${id}`);            
            setCandidate(data);           
        }
        getCandidate();
    }, [confirmOrRefuse]);
    const onConfirmClick = async () => {
        await axios.post('api/candidatetracker/confirm', candidate);
        setConfirmedCount();
        setPendingCount();
        setRefusedCount();
        setConfirmOrRefuse(true);      
    }
    const onRefuseClick = async () => {
        await axios.post('/api/candidatetracker/refuse', candidate);
        setRefusedCount();
        setPendingCount();
        setConfirmedCount();
        setConfirmOrRefuse(true)
    }    
    const {firstName, lastName, email, phoneNumber, registrationStatus, notes}= candidate;
    return (
        <div className='container'>
            <div className='card card-body card-light col-md-6 offset-md-3'>
                <h4>Name: {firstName} {lastName}</h4>
                <h4>Email: {email}</h4>
                <h4>Phone Number: {phoneNumber}</h4>
                <h4>Status: {registrationStatus}</h4>
                <h4>Notes:</h4>
                <p className="font-weight-normal">{notes}</p>                
                {!confirmOrRefuse && <div className='row md-2'>
                    <button onClick={onConfirmClick} className='btn btn-primary'>Confirm</button>
                    <button onClick={onRefuseClick} className='btn btn-danger'>Refuse</button>
                </div>}
            </div>
        </div>
    )

}
export default Details;