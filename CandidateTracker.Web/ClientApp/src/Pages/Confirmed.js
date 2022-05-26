import axios from 'axios';
import React, {useState, useEffect} from 'react';
 
const Confirmed = () =>{
const [confirmed, setConfirmed] = useState([]);
const [toggle, setToggle] = useState(false);
useEffect(()=>{
    const getConfimred = async() =>{
        const {data} = await axios.get('/api/candidatetracker/getconfirmed');
        setConfirmed(data);        
    }
    getConfimred();
}, []);
const onToggleClick = () =>{
setToggle(!toggle);
}
return (
    <>
    <h1>Confirmed</h1>
    <button onClick={onToggleClick} className='btn btn-warning'>Toggle notes</button>
    <table className='table table-hover table-striped table-bordered'>
        <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Email</th>
                {!toggle && <th>Notes</th>}
            </tr>
        </thead>
        <tbody>
            {confirmed.map((c, i)=>{
               return <tr key={i}>
                    <td>{c.firstName}</td>
                    <td>{c.lastName}</td>
                    <td>{c.phoneNumber}</td>
                    <td>{c.email}</td>
                    {!toggle && <td>{c.notes}</td>}
                </tr>
            })}
        </tbody>
    </table>
    </>
)
}
export default Confirmed;