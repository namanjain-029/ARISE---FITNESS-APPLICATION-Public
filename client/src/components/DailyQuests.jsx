import React, { useContext } from 'react';
import { LevelingContext } from '../context/LevelingContext';
import { CheckCircle, XCircle, Zap, Star, Shield } from 'lucide-react';

export default function DailyQuests() {
    const { xp, level, rank, summary } = useContext(LevelingContext);

    // Derive quest completion from today's real summary data
    const workoutsToday = summary?.workoutsToday || 0;
    const caloriesBurned = summary?.caloriesBurned || 0;
    const caloriesConsumed = summary?.caloriesConsumed || 0;
    const waterMl = summary?.waterMl || 0;

    const dailyQuests = [
        {
            id: 1,
            title: 'Complete a Strength Session',
            detail: `${workoutsToday} / 1 session logged today`,
            completed: workoutsToday >= 1,
            xp: 50
        },
        {
            id: 2,
            title: 'Log a Meal',
            detail: caloriesConsumed > 0 ? `${caloriesConsumed} kcal consumed` : 'No meal logged yet',
            completed: caloriesConsumed > 0,
            xp: 30
        },
        {
            id: 3,
            title: 'Burn 400+ kcal',
            detail: `${caloriesBurned} / 400 kcal burned`,
            completed: caloriesBurned >= 400,
            xp: 80
        },
        {
            id: 4,
            title: 'Hydrate — Log 1000ml Water',
            detail: `${waterMl} / 1000 ml logged`,
            completed: waterMl >= 1000,
            xp: 40
        },
        {
            id: 5,
            title: 'Train Twice Today',
            detail: `${workoutsToday} / 2 sessions done`,
            completed: workoutsToday >= 2,
            xp: 100
        }
    ];

    const completedCount = dailyQuests.filter(q => q.completed).length;
    const totalXpAvailable = dailyQuests.reduce((acc, q) => acc + q.xp, 0);

    return (
        <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="bg-slate-800/50 p-5 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                    <Shield className="text-yellow-400" size={18} /> Daily System Requirements
                </h3>
                <span className="text-[10px] font-black text-slate-500 uppercase">
                    {completedCount}/{dailyQuests.length} done
                </span>
            </div>

            {/* Progress bar */}
            <div className="px-5 pt-4">
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-yellow-500 to-emerald-400 transition-all duration-700 rounded-full"
                        style={{ width: `${(completedCount / dailyQuests.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Quest List */}
            <ul className="p-5 space-y-3">
                {dailyQuests.map((q) => (
                    <li
                        key={q.id}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                            q.completed
                                ? 'bg-emerald-900/10 border-emerald-500/30'
                                : 'bg-slate-800/30 border-slate-700/50'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            {q.completed ? (
                                <CheckCircle className="text-emerald-400 flex-shrink-0" size={18} />
                            ) : (
                                <XCircle className="text-slate-600 flex-shrink-0" size={18} />
                            )}
                            <div>
                                <p className={`text-xs font-black uppercase tracking-tight ${q.completed ? 'text-emerald-400 line-through' : 'text-white'}`}>
                                    {q.title}
                                </p>
                                <p className="text-[10px] font-bold text-slate-500 mt-0.5">{q.detail}</p>
                            </div>
                        </div>
                        <span className={`text-[9px] font-black flex items-center gap-1 ml-3 flex-shrink-0 ${q.completed ? 'text-emerald-400' : 'text-slate-600'}`}>
                            <Zap size={9} fill="currentColor" /> +{q.xp} XP
                        </span>
                    </li>
                ))}
            </ul>

            {/* Footer Stats */}
            <div className="px-5 pb-5 pt-1 border-t border-slate-800 mt-1">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest pt-3">
                    <span className="text-slate-500 flex items-center gap-1">
                        <Zap size={10} className="text-yellow-400" fill="currentColor" /> XP: {xp}
                    </span>
                    <span className="text-slate-500 flex items-center gap-1">
                        <Star size={10} className="text-cyan-400" /> Level: {level}
                    </span>
                    <span className="text-slate-500 flex items-center gap-1">
                        <Shield size={10} className="text-purple-400" /> {rank}
                    </span>
                </div>
            </div>
        </div>
    );
}
