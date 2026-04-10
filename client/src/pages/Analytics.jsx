import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
    LineChart, Line
} from 'recharts';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import { TrendingUp, Activity, Droplets, Terminal } from 'lucide-react';

export default function Analytics() {
    const [period, setPeriod] = useState('weekly');
    const [trendData, setTrendData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTrends = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await api.get(`/analytics/trends?period=${period}`);
                setTrendData(response.data.data);
            } catch (err) {
                console.error("Failed to fetch trends", err);
                setError('SYSERR: Could not retrieve log data.');
            } finally {
                setLoading(false);
            }
        };

        fetchTrends();
    }, [period]);

    const chartData = trendData?.labels?.map((label, index) => ({
        name: label,
        consumed: trendData.caloriesConsumed[index] || 0,
        burned: trendData.caloriesBurned[index] || 0,
        water: trendData.waterMl[index] || 0,
        workouts: trendData.workouts[index] || 0
    })) || [];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-mono">
            <Navbar />

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header & Controls */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
                            <Terminal className="text-cyan-500" size={32} />
                            System Logs
                        </h1>
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">
                            Historical Data Analysis & Evolution Tracking
                        </p>
                    </div>

                    <div className="inline-flex bg-slate-900 border-2 border-slate-800 p-1 rounded-lg">
                        <button
                            onClick={() => setPeriod('weekly')}
                            className={`px-6 py-2 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${period === 'weekly' ? 'bg-cyan-600 text-slate-950 shadow-[0_0_10px_rgba(34,211,238,0.3)]' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            Weekly
                        </button>
                        <button
                            onClick={() => setPeriod('monthly')}
                            className={`px-6 py-2 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${period === 'monthly' ? 'bg-cyan-600 text-slate-950 shadow-[0_0_10px_rgba(34,211,238,0.3)]' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            Monthly
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-900/20 border-2 border-red-500/50 p-4 rounded-lg mb-8 text-red-400 text-xs font-black uppercase">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24">
                        <div className="w-12 h-12 border-4 border-cyan-900 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
                        <p className="text-cyan-500 font-black animate-pulse uppercase text-xs tracking-[0.2em]">Processing Logs...</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* Calories Overview Chart */}
                        <div className="bg-slate-900/80 border-2 border-slate-800 p-6 rounded-2xl shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 bg-slate-800 text-[8px] font-black text-slate-500 uppercase tracking-tighter">
                                Data: Caloric-Sync
                            </div>

                            <div className="mb-8">
                                <h2 className="text-lg font-black text-white uppercase tracking-tighter flex items-center gap-2">
                                    Energy Transformation
                                </h2>
                                <p className="text-[10px] text-slate-500 font-bold uppercase">Resource Consumption vs Output</p>
                            </div>

                            <div className="h-[400px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10, fontWeight: 'bold' }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10, fontWeight: 'bold' }} dx={-10} />
                                        <Tooltip
                                            cursor={{ fill: '#1e293b', opacity: 0.4 }}
                                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', fontSize: '10px', color: '#fff' }}
                                        />
                                        <Legend iconType="square" wrapperStyle={{ paddingTop: '20px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }} />
                                        <Bar dataKey="consumed" name="Intake" fill="#22d3ee" radius={[2, 2, 0, 0]} maxBarSize={30} />
                                        <Bar dataKey="burned" name="Output" fill="#f97316" radius={[2, 2, 0, 0]} maxBarSize={30} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            {/* Activity Trend Line Chart */}
                            <div className="bg-slate-900/80 border-2 border-slate-800 p-6 rounded-2xl shadow-2xl">
                                <div className="mb-8">
                                    <h2 className="text-md font-black text-white uppercase tracking-tighter flex items-center gap-2">
                                        <Activity className="text-cyan-500" size={18} />
                                        Training Frequency
                                    </h2>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase">Operational cycles mapped</p>
                                </div>

                                <div className="h-[250px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.15} />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10 }} dy={10} />
                                            <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10 }} />
                                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', fontSize: '10px' }} />
                                            <Line type="monotone" dataKey="workouts" name="Sessions" stroke="#22d3ee" strokeWidth={3} dot={{ r: 4, fill: '#0891b2', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} shadow="0 0 10px rgba(34,211,238,0.5)" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Hydration Chart */}
                            <div className="bg-slate-900/80 border-2 border-slate-800 p-6 rounded-2xl shadow-2xl">
                                <div className="mb-8">
                                    <h2 className="text-md font-black text-white uppercase tracking-tighter flex items-center gap-2">
                                        <Droplets className="text-blue-500" size={18} />
                                        Vitality Maintenance
                                    </h2>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase">Hydration levels synchronization</p>
                                </div>

                                <div className="h-[250px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.15} />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10 }} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10 }} dx={-10} />
                                            <Tooltip
                                                cursor={{ fill: 'transparent' }}
                                                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', fontSize: '10px' }}
                                            />
                                            <Bar dataKey="water" name="Liquids (ML)" fill="#3b82f6" radius={[2, 2, 0, 0]} maxBarSize={30} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

