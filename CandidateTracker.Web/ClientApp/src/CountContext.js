import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CountContext = createContext();

const CountContextComponent = ({ children }) => {
    const [pendingCount, setPendingCount] = useState(0);
    const [refusedCount, setRefusedCount] = useState(0);
    const [confirmedCount, setConfirmedCount] = useState(0);

    const updatePendingCount = async () => {
        const { data } = await axios.get('/api/candidatetracker/getpendingcount');
        setPendingCount(data.count);
    }

    const updateConfirmedCount = async () => {
        const { data } = await axios.get('/api/candidatetracker/getconfirmedcount');
        setConfirmedCount(data.count);
    }

    const updateRefusedCount = async () => {
        const { data } = await axios.get('/api/candidatetracker/getrefusedcount');
        setRefusedCount(data.count);
    }

    useEffect(() => {
        const updateCounts = async () => {
            await updatePendingCount();
            await updateConfirmedCount();
            await updateRefusedCount();
        }
        updateCounts();
    }, []);

    return (
        <CountContext.Provider value={{ pendingCount, setPendingCount, refusedCount, setRefusedCount, confirmedCount, setConfirmedCount }}>
            {children}
        </CountContext.Provider>
    )
}
const useCountContext = () => {
    return useContext(CountContext);
}

export { CountContextComponent, useCountContext };