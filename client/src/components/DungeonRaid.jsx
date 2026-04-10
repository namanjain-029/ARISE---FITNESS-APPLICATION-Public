import React, { useState, useEffect, useContext } from 'react';
import { Skull, Swords, Flame } from 'lucide-react';
import { LevelingContext } from '../context/LevelingContext';

export default function DungeonRaid() {
    const { xp } = useContext(LevelingContext);

    // Simulate boss health: 3000 max. Depletes based on user XP.
    const maxBossHealth = 3000;
    const currentBossHealth = Math.max(0, maxBossHealth - (xp * 1.5));
    const isDefeated = currentBossHealth <= 0;

    // Calculate health percentage
    const healthPercent = (currentBossHealth / maxBossHealth) * 100;

    return (
        <div className="bg-slate-900 border-2 border-red-900/50 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(153,27,27,0.15)] flex flex-col relative">

            {/* Background Image / Blur */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-red-950/20 z-0"></div>

            <div className="relative z-10 p-6 border-b border-red-900/30 flex items-center justify-between">
                <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                    <Skull className={isDefeated ? "text-slate-500" : "text-red-500"} size={18} />
                    {isDefeated ? "Dungeon Cleared" : "Weekly Dungeon Raid"}
                </h3>
                <span className="text-[10px] font-black text-red-500/70 border border-red-900/50 px-2 py-0.5 rounded uppercase tracking-tighter bg-red-950/30">
                    A-Rank Gate
                </span>
            </div>

            <div className="relative z-10 p-6 flex flex-col items-center justify-center flex-1">
                <div className="text-center mb-6">
                    <h4 className={`text-xl font-black uppercase tracking-[0.2em] mb-1 ${isDefeated ? 'text-emerald-500 line-through' : 'text-red-400'}`}>
                        Ignis, The Bloodflame King
                    </h4>
                    <p className="text-xs font-medium text-slate-400 italic">
                        {isDefeated
                            ? "The boss has been defeated. Awaiting next week's gate."
                            : "Deal damage by logging workouts and hitting your calorie targets."}
                    </p>
                </div>

                {/* Boss Health Bar */}
                <div className="w-full max-w-sm">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1">
                            <Flame size={12} className="text-red-500" /> HP
                        </span>
                        <span className={`text-xs font-black ${isDefeated ? 'text-slate-600' : 'text-white'}`}>
                            {Math.floor(currentBossHealth)} / {maxBossHealth}
                        </span>
                    </div>

                    <div className="w-full h-4 bg-slate-950 rounded-full border border-slate-800 overflow-hidden relative">
                        {/* Damage underlying track */}
                        <div className="absolute top-0 left-0 h-full w-full bg-red-950/50"></div>

                        {/* Actual health fill */}
                        <div
                            className={`h-full transition-all duration-1000 ${isDefeated
                                ? 'bg-slate-800'
                                : 'bg-gradient-to-r from-red-700 to-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                                }`}
                            style={{ width: `${healthPercent}%` }}
                        ></div>
                    </div>
                </div>

                {isDefeated && (
                    <div className="mt-6 flex items-center gap-2 text-emerald-400 bg-emerald-950/30 border border-emerald-900/50 px-4 py-2 rounded-lg">
                        <Swords size={16} />
                        <span className="text-xs font-black uppercase tracking-widest">+5000 Bonus XP Awarded</span>
                    </div>
                )}
            </div>
        </div>
    );
}
