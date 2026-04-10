import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Calendar as CalendarIcon, Zap } from 'lucide-react';

export default function ActivityHeatmap() {
    const [heatmapData, setHeatmapData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHeatmap = async () => {
            try {
                const response = await api.get('/analytics/heatmap');
                setHeatmapData(response.data.data);
            } catch (err) {
                console.error("Failed to fetch heatmap data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchHeatmap();
    }, []);

    // Generate last 150 days mapping
    const getDays = () => {
        const days = [];
        const today = new Date();
        for (let i = 149; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            
            const existingData = heatmapData.find(x => x.date === dateStr);
            const count = existingData ? existingData.count : 0;
            
            days.push({ date: dateStr, count });
        }
        return days;
    };

    const days = getDays();

    // Map counts to intensity levels (0, 1, 2, 3+)
    const getIntensityClass = (count) => {
        if (count === 0) return 'bg-slate-800 border-slate-700 hover:border-slate-600';
        if (count === 1) return 'bg-cyan-900 border-cyan-800 shadow-[0_0_8px_rgba(8,145,178,0.2)] hover:border-cyan-600';
        if (count === 2) return 'bg-cyan-600 border-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.4)] hover:border-cyan-400';
        return 'bg-cyan-400 border-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.6)] hover:border-white';
    };

    return (
        <div className="bg-slate-900 border-2 border-slate-800 shadow-2xl rounded-2xl p-6 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 bg-cyan-900/10 rounded-bl-3xl">
                <Zap size={20} className="text-cyan-500/30" />
            </div>
            
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-800 rounded border border-slate-700 text-cyan-400">
                    <CalendarIcon size={16} />
                </div>
                <div>
                    <h3 className="text-sm font-black text-white uppercase tracking-widest leading-none">System Heatmap</h3>
                    <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">150 Days Consistency Log</p>
                </div>
            </div>

            {loading ? (
                <div className="h-[80px] animate-pulse bg-slate-800 rounded-lg w-full"></div>
            ) : (
                <div className="overflow-x-auto pb-4 custom-scrollbar">
                    <div className="grid grid-rows-5 gap-1.5 grid-flow-col w-max">
                        {days.map((day, ix) => (
                            <div 
                                key={ix} 
                                title={`${day.count} activities on ${day.date}`}
                                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-[3px] border transition-all duration-300 cursor-pointer ${getIntensityClass(day.count)}`}
                            ></div>
                        ))}
                    </div>
                </div>
            )}
            
            <div className="mt-4 flex items-center justify-end gap-2 text-[8px] font-black text-slate-500 uppercase tracking-widest">
                <span>Less</span>
                <div className="w-3 h-3 rounded-[2px] bg-slate-800 border border-slate-700"></div>
                <div className="w-3 h-3 rounded-[2px] bg-cyan-900 border border-cyan-800"></div>
                <div className="w-3 h-3 rounded-[2px] bg-cyan-600 border border-cyan-500"></div>
                <div className="w-3 h-3 rounded-[2px] bg-cyan-400 border border-cyan-300"></div>
                <span>More</span>
            </div>
        </div>
    );
}
