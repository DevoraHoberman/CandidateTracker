import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Pending = () => {
    const [candidates, setCandidate] = useState([]);
    useEffect(() => {
        const getPending = async () => {
            const { data } = await axios.get('/api/candidatetracker/getpending');
            setCandidate(data);
        }
        getPending();
    }, []);
    return(
        <table className='col-md-12 table table-hover table-bordered table-striped'>
            <thead>
                <tr>
                    <th></th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {candidates.map((c, i)=>{
                    return(
                        <tr key={i}>
                            <td>
                                <Link to={`/pending/details/${c.id}`}>
                                    View Details                                    
                                </Link>
                            </td>
                            <td>{c.firstName}</td>
                            <td>{c.lastName}</td>
                            <td>{c.phoneNumber}</td>
                            <td>{c.email}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
export default Pending;