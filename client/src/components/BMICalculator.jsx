import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function BMICalculator() {
    const { user } = useContext(AuthContext);
    // Expect weight in kg and height in cm from user profile
    const weight = user?.weight || 0;
    const heightCm = user?.height || 0;
    const heightM = heightCm / 100;
    const bmi = heightM > 0 ? (weight / (heightM * heightM)).toFixed(1) : 0;

    const getCategory = (bmiValue) => {
        if (bmiValue < 18.5) return 'Underweight';
        if (bmiValue < 24.9) return 'Normal weight';
        if (bmiValue < 29.9) return 'Overweight';
        return 'Obesity';
    };

    return (
        <div className="bg-slate-900 dark:bg-blue-900/20 rounded-3xl p-6 border border-slate-800 dark:border-blue-800/30 shadow-sm text-white">
            <h3 className="text-lg font-bold mb-2">Physical Assessment (BMI)</h3>
            <p className="text-sm mb-2">Weight: {weight} kg</p>
            <p className="text-sm mb-2">Height: {heightCm} cm</p>
            <p className="text-xl font-semibold">BMI: {bmi}</p>
            <p className="text-sm mt-1">Category: {getCategory(bmi)}</p>
        </div>
    );
}
