import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from './AuthContext';
import api from '../utils/api';

const rankByLevel = (level) => {
    if (level >= 50) return 'S-Rank';
    if (level >= 30) return 'A-Rank';
    if (level >= 20) return 'B-Rank';
    if (level >= 10) return 'C-Rank';
    return 'E-Rank';
};

const calcXpFromSummary = (summary) => {
    if (!summary) return 0;
    const burnXp = Math.floor((summary.caloriesBurned || 0) * 0.5);
    const sessionXp = (summary.workoutsToday || 0) * 20;
    return burnXp + sessionXp;
};

export const LevelingContext = createContext();

export const LevelingProvider = ({ children }) => {
    const { token } = useContext(AuthContext);
    const [xp, setXp] = useState(0);
    const [level, setLevel] = useState(1);
    const [rank, setRank] = useState(rankByLevel(1));
    const [summary, setSummary] = useState(null);

    const refreshAll = useCallback(async () => {
        if (!token) return;
        try {
            const response = await api.get('/analytics/summary');
            const data = response.data.data;
            setSummary(data);
            const earnedXp = calcXpFromSummary(data);
            setXp(earnedXp);
        } catch (err) {
            console.error('Failed to refresh stats', err);
        }
    }, [token]);

    // Initial load
    useEffect(() => {
        refreshAll();
    }, [refreshAll]);

    // Update level and rank when XP changes
    useEffect(() => {
        const newLevel = Math.floor(xp / 100) + 1;
        setLevel(newLevel);
        setRank(rankByLevel(newLevel));
    }, [xp]);

    return (
        <LevelingContext.Provider value={{ xp, level, rank, summary, refreshAll }}>
            {children}
        </LevelingContext.Provider>
    );
};
