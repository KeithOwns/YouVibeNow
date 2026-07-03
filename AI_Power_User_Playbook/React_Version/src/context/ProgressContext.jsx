import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const ProgressContext = createContext();

export function useProgress() {
    return useContext(ProgressContext);
}

export function ProgressProvider({ children }) {
    const [progress, setProgress] = useState([]);
    const [syncCode, setSyncCode] = useState(() => localStorage.getItem('syncCode') || '');

    // Load from local storage initially
    useEffect(() => {
        const local = localStorage.getItem('aiPlaybookProgress');
        if (local) setProgress(JSON.parse(local));
    }, []);

    // Load from Firebase when syncCode changes
    useEffect(() => {
        if (!syncCode) return;
        
        async function fetchCloudData() {
            try {
                const docRef = doc(db, 'progress', syncCode);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data().completed;
                    setProgress(data);
                    localStorage.setItem('aiPlaybookProgress', JSON.stringify(data));
                }
            } catch (err) {
                console.error("Error fetching from Firebase:", err);
            }
        }
        fetchCloudData();
    }, [syncCode]);

    const markCompleted = async (moduleId) => {
        const newProgress = [...new Set([...progress, moduleId])];
        setProgress(newProgress);
        localStorage.setItem('aiPlaybookProgress', JSON.stringify(newProgress));

        if (syncCode) {
            try {
                await setDoc(doc(db, 'progress', syncCode), { completed: newProgress }, { merge: true });
            } catch (err) {
                console.error("Error saving to Firebase:", err);
            }
        }
    };

    const updateSyncCode = (code) => {
        setSyncCode(code);
        localStorage.setItem('syncCode', code);
    };

    return (
        <ProgressContext.Provider value={{ progress, markCompleted, syncCode, updateSyncCode }}>
            {children}
        </ProgressContext.Provider>
    );
}
