import React, { useState, useContext } from 'react';
import { Sword, Zap, Trophy, CheckCircle, Loader2, X, ArrowRight, Star } from 'lucide-react';
import { LevelingContext } from '../context/LevelingContext';
import api from '../utils/api';

const SUGGESTED_QUESTS = [
    {
        id: 1,
        title: "Daily Strength Training",
        rank: "E-Rank",
        xp: "100 XP",
        type: "gym",
        estimatedDuration: 90,
        estimatedCalories: 400,
        waterMl: 500,
        tasks: ["100 Push-ups", "100 Sit-ups", "100 Squats", "10km Run"],
        reward: "Stat Boost: Strength +1"
    },
    {
        id: 2,
        title: "Dungeon Preparation: Core",
        rank: "D-Rank",
        xp: "250 XP",
        type: "gym",
        estimatedDuration: 45,
        estimatedCalories: 250,
        waterMl: 400,
        tasks: ["5m Plank", "50 Leg Raises", "100 Russian Twists"],
        reward: "Stat Boost: Endurance +2"
    },
    {
        id: 3,
        title: "Elite Hunter Cardio",
        rank: "C-Rank",
        xp: "500 XP",
        type: "running",
        estimatedDuration: 60,
        estimatedCalories: 600,
        waterMl: 750,
        tasks: ["5km Sprint (< 20m)", "20 Burpees x 5 sets", "Jump Rope 10m"],
        reward: "Stat Boost: Agility +3"
    }
];

export default function SuggestedWorkouts() {
    const { refreshAll } = useContext(LevelingContext);
    const [completedQuests, setCompletedQuests] = useState([]);
    const [activeQuestModal, setActiveQuestModal] = useState(null);
    const [modalState, setModalState] = useState('idle'); // 'idle' | 'loading' | 'done'

    const openModal = (quest) => {
        setActiveQuestModal(quest);
        setModalState('idle');
    };

    const closeModal = () => {
        setActiveQuestModal(null);
        setModalState('idle');
    };

    const completeQuest = async (quest) => {
        setModalState('loading');
        try {
            // Log the quest directly as a workout
            await api.post('/workouts', {
                type: quest.type,
                duration: quest.estimatedDuration,
                caloriesBurned: quest.estimatedCalories,
                waterMl: quest.waterMl,
                date: new Date().toISOString().split('T')[0],
                notes: `QUEST COMPLETE: ${quest.title} | ${quest.tasks.join(', ')}`
            });

            // Immediately refresh all stats on dashboard
            await refreshAll();

            setCompletedQuests(prev => [...prev, quest.id]);
            setModalState('done');
        } catch (err) {
            console.error('Failed to log quest', err);
            setModalState('idle');
        }
    };

    return (
        <>
            {/* Quest Modal */}
            {activeQuestModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                    <div className={`bg-slate-900 border-2 rounded-2xl p-8 max-w-md w-full shadow-2xl relative transition-all duration-500 ${
                        modalState === 'done'
                            ? 'border-emerald-500/60 shadow-[0_0_40px_rgba(52,211,153,0.2)]'
                            : 'border-cyan-500/50 shadow-[0_0_40px_rgba(6,182,212,0.15)]'
                    }`}>
                        {modalState !== 'loading' && (
                            <button onClick={closeModal} className="absolute top-4 right-4 text-slate-600 hover:text-white transition-colors">
                                <X size={18} />
                            </button>
                        )}

                        {modalState === 'done' ? (
                            /* ── COMPLETION STATE ── */
                            <div className="text-center py-4">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-900/40 border-2 border-emerald-500/50 mb-6 shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                                    <CheckCircle className="text-emerald-400" size={40} />
                                </div>
                                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Quest Complete</p>
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">{activeQuestModal.title}</h3>

                                <div className="bg-slate-950 rounded-xl p-4 mb-6 grid grid-cols-3 gap-3 text-center">
                                    <div>
                                        <p className="text-[9px] font-black text-slate-500 uppercase">Burned</p>
                                        <p className="text-sm font-black text-orange-400">+{activeQuestModal.estimatedCalories} kcal</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-slate-500 uppercase">Vitality</p>
                                        <p className="text-sm font-black text-blue-400">+{activeQuestModal.waterMl} ml</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-slate-500 uppercase">Session</p>
                                        <p className="text-sm font-black text-purple-400">+1 Agility</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-2 bg-emerald-950/30 border border-emerald-900/40 px-4 py-2 rounded-lg mb-6">
                                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                                    <span className="text-xs font-black text-yellow-400 uppercase tracking-widest">{activeQuestModal.reward}</span>
                                </div>

                                <button
                                    onClick={closeModal}
                                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-xl transition-all"
                                >
                                    Close & Return
                                </button>
                            </div>
                        ) : (
                            /* ── BRIEFING STATE ── */
                            <>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-cyan-900/30 rounded-xl border border-cyan-500/30">
                                        <Sword className="text-cyan-400" size={22} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-cyan-500 uppercase tracking-widest">
                                            {completedQuests.includes(activeQuestModal.id) ? 'Quest Completed' : 'Quest Accepted'}
                                        </p>
                                        <h3 className="text-lg font-black text-white uppercase tracking-tight">{activeQuestModal.title}</h3>
                                    </div>
                                </div>

                                <div className="bg-slate-950 rounded-xl p-4 mb-6 space-y-2">
                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Mission Objectives</p>
                                    {activeQuestModal.tasks.map((task, i) => (
                                        <div key={i} className="flex items-center gap-3 text-xs font-bold text-slate-300">
                                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[9px] font-black ${
                                                completedQuests.includes(activeQuestModal.id)
                                                    ? 'bg-emerald-900/40 border-emerald-500/50 text-emerald-400'
                                                    : 'bg-cyan-900/20 border-cyan-500/30 text-cyan-400'
                                            }`}>
                                                {completedQuests.includes(activeQuestModal.id) ? '✓' : i + 1}
                                            </div>
                                            <span className={completedQuests.includes(activeQuestModal.id) ? 'line-through text-slate-500' : ''}>
                                                {task}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-6 text-center">
                                    <div className="bg-slate-800 rounded-lg p-3">
                                        <p className="text-[9px] font-black text-slate-500 uppercase">Est. Duration</p>
                                        <p className="text-sm font-black text-white">{activeQuestModal.estimatedDuration} min</p>
                                    </div>
                                    <div className="bg-slate-800 rounded-lg p-3">
                                        <p className="text-[9px] font-black text-slate-500 uppercase">Est. Burn</p>
                                        <p className="text-sm font-black text-emerald-400">{activeQuestModal.estimatedCalories} kcal</p>
                                    </div>
                                </div>

                                {completedQuests.includes(activeQuestModal.id) ? (
                                    <button
                                        disabled
                                        className="w-full py-4 bg-emerald-900/40 border border-emerald-500/40 text-emerald-400 font-black uppercase tracking-widest rounded-xl cursor-default flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle size={16} /> Quest Finished
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => completeQuest(activeQuestModal)}
                                        disabled={modalState === 'loading'}
                                        className="w-full py-4 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-slate-950 font-black uppercase tracking-widest rounded-xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none"
                                    >
                                        {modalState === 'loading'
                                            ? <><Loader2 size={18} className="animate-spin" /> Logging Quest...</>
                                            : <>Start Quest <ArrowRight size={16} /></>
                                        }
                                    </button>
                                )}
                                <p className="text-center text-[9px] text-slate-600 font-bold uppercase tracking-widest mt-3">
                                    Stats update instantly on completion
                                </p>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Quest List */}
            <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl overflow-hidden shadow-2xl h-full flex flex-col">
                <div className="bg-slate-800/50 p-6 border-b border-slate-800 flex items-center justify-between">
                    <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                        <Sword className="text-cyan-400" size={18} /> System Training Quests
                    </h3>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Recommended for Rank</span>
                </div>

                <div className="p-6 space-y-4 overflow-y-auto max-h-[400px]">
                    {SUGGESTED_QUESTS.map((quest) => {
                        const isComplete = completedQuests.includes(quest.id);
                        return (
                            <div key={quest.id} className={`group border rounded-xl p-4 transition-all relative overflow-hidden ${
                                isComplete ? 'bg-emerald-900/5 border-emerald-500/30' : 'bg-slate-800/30 border-slate-700/50 hover:border-cyan-500/50'
                            }`}>
                                <div className="absolute top-0 right-0 p-2 bg-slate-700/50 text-[8px] font-black text-cyan-400 uppercase">{quest.rank}</div>

                                <div className="flex justify-between items-start mb-3">
                                    <h4 className={`font-black text-xs uppercase tracking-tight transition-colors ${isComplete ? 'text-emerald-400' : 'text-white group-hover:text-cyan-400'}`}>
                                        {quest.title}
                                    </h4>
                                    <span className="text-[10px] font-black text-emerald-400 flex items-center gap-1">
                                        <Zap size={10} fill="currentColor" /> {quest.xp}
                                    </span>
                                </div>

                                <ul className="space-y-2 mb-4">
                                    {quest.tasks.map((task, i) => (
                                        <li key={i} className="text-[10px] font-bold text-slate-400 flex items-center gap-2">
                                            <div className={`w-1 h-1 rounded-full ${isComplete ? 'bg-emerald-500' : 'bg-cyan-500'}`}></div>
                                            <span className={isComplete ? 'line-through text-slate-600' : ''}>{task}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="pt-3 border-t border-slate-700/50 flex items-center justify-between">
                                    <span className="text-[8px] font-black text-slate-500 uppercase flex items-center gap-1">
                                        <Trophy size={10} className="text-yellow-500" /> {quest.reward}
                                    </span>

                                    {isComplete ? (
                                        <span className="text-[10px] font-black text-emerald-400 flex items-center gap-1">
                                            <CheckCircle size={12} /> COMPLETE
                                        </span>
                                    ) : (
                                        <button
                                            onClick={() => openModal(quest)}
                                            className="text-[10px] font-black text-cyan-400 hover:text-cyan-300 uppercase underline decoration-cyan-500/30 underline-offset-4 hover:scale-105 transition-all"
                                        >
                                            Accept Quest
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
