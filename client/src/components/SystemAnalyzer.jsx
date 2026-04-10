import React, { useContext, useState, useEffect } from 'react';
import { BrainCircuit, Loader2, ArrowRight, Crown, Sparkles, Lock, Sword, Zap, ChevronRight } from 'lucide-react';
import api from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LevelingContext } from '../context/LevelingContext';

export default function SystemAnalyzer() {
    const { user } = useContext(AuthContext);
    const { summary } = useContext(LevelingContext);
    const [suggestion, setSuggestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const isPremium = user?.isPremium === true;

    // Re-fetch suggestion whenever stats refresh (after quest/workout log)
    useEffect(() => {
        if (!isPremium) { setLoading(false); return; }
        const fetchSuggestion = async () => {
            setLoading(true);
            try {
                const response = await api.get('/analytics/suggestions');
                setSuggestion(response.data.data);
            } catch (err) {
                console.error('Failed to fetch suggestion', err);
            } finally {
                setLoading(false);
            }
        };
        fetchSuggestion();
    }, [isPremium, summary]); // re-runs when summary changes (after a quest complete)

    if (loading) {
        return (
            <div className="bg-slate-900 border-2 border-amber-500/20 rounded-2xl p-6 shadow-2xl flex items-center justify-center min-h-[120px] mb-8">
                <Loader2 className="animate-spin text-amber-500" size={32} />
            </div>
        );
    }

    if (!isPremium) {
        return (
            <div className="bg-slate-900 border-2 border-amber-900/50 rounded-2xl p-8 shadow-2xl mb-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 group">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600/5 to-amber-900/20 pointer-events-none"></div>
                
                <div className="flex items-center gap-6 relative z-10 w-full md:w-auto">
                    <div className="p-4 bg-slate-950 rounded-xl border border-amber-900/50 relative shadow-[0_0_15px_rgba(251,191,36,0.1)]">
                        <Crown className="text-amber-500/50" size={40} />
                        <Lock className="text-amber-400 absolute bottom-2 right-2 drop-shadow-md" size={16} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest bg-amber-950/40 px-2 py-0.5 rounded border border-amber-900/30">
                                Premium Feature Locked
                            </span>
                        </div>
                        <h3 className="text-xl font-black text-white uppercase tracking-tight mb-1">System Analyzer AI</h3>
                        <p className="text-xs font-bold text-slate-400 max-w-md">
                            Unlock advanced AI diagnostics, recovery meal recommendations, and dynamic training blueprints tailored to your real-time stats.
                        </p>
                    </div>
                </div>

                <div className="relative z-10 w-full md:w-auto shrink-0 flex flex-col gap-2">
                    <Link 
                        to="/premium/checkout"
                        className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-amber-950 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-[0_5px_20px_rgba(245,158,11,0.2)] flex items-center justify-center gap-2"
                    >
                        <Sparkles size={16} /> Unlock Premium
                    </Link>
                    <div className="text-center">
                        <span className="text-[11px] font-black text-amber-500/70 tracking-widest">
                            ₹399 / MONTH
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    if (!suggestion) return null;

    // Determine color scheme based on action type, but keep amber as the primary premium glow
    let actionStyleClass = "";
    let linkTo = "#";
    if (suggestion.action.includes("RECOVERY")) {
        actionStyleClass = "border-emerald-500/30 text-emerald-400 bg-emerald-900/20";
        linkTo = "/log-meal";
    } else if (suggestion.action.includes("TRAINING") || suggestion.action.includes("CALORIC SURGE")) {
        actionStyleClass = "border-orange-500/30 text-orange-400 bg-orange-900/20";
        linkTo = "/log-workout";
    } else {
        actionStyleClass = "border-cyan-500/30 text-cyan-400 bg-cyan-900/20";
    }

    return (
        <div className="bg-slate-900/90 border border-amber-500/40 p-[1px] rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.15)] mb-8 relative overflow-hidden group">
            {/* Animated Premium Border Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-400/50 to-amber-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-[pulse_3s_ease-in-out_infinite]" />
            
            <div className="bg-slate-950/80 backdrop-blur-xl p-6 rounded-2xl h-full relative z-10 border border-white/5">

                {/* Top Row: Icon + Suggestion + Button */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/10 blur-[60px] rounded-full -translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
                    
                    <div className="flex items-start gap-5 relative z-10">
                        <div className="relative flex-shrink-0">
                            <div className="absolute inset-0 bg-amber-500 blur-md opacity-40 rounded-xl animate-pulse"></div>
                            <div className="p-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-amber-500/30 relative z-10 shadow-lg">
                                <BrainCircuit className="text-amber-400" size={32} />
                                <Crown className="text-amber-300 absolute -top-2 -right-2 drop-shadow-[0_0_8px_rgba(252,211,77,1)]" size={16} />
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className="flex items-center gap-1 text-[9px] font-black text-amber-950 uppercase tracking-[0.2em] bg-gradient-to-r from-amber-400 to-amber-600 px-2.5 py-1 rounded shadow-[0_0_10px_rgba(251,191,36,0.3)]">
                                    <Sparkles size={10} /> Premium Analyzer
                                </span>
                                <span className={`text-[9px] font-black uppercase tracking-[0.1em] px-2 py-1 rounded border ${actionStyleClass}`}>
                                    ACTION: {suggestion.action.split(' ')[0]}
                                </span>
                            </div>
                            <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 uppercase tracking-tight mb-2">
                                {suggestion.action}
                            </h3>
                            <p className="text-sm font-medium text-slate-300 max-w-2xl leading-relaxed">
                                {suggestion.message}
                            </p>
                        </div>
                    </div>

                    {linkTo !== "#" && (
                        <Link to={linkTo} className="flex-shrink-0 flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-amber-950 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-[0_5px_20px_rgba(245,158,11,0.3)] relative z-10">
                            Execute Protocol <ArrowRight size={16} />
                        </Link>
                    )}
                </div>

                {/* Quest Recommendation */}
                {suggestion.quest && (
                    <div className="mt-5 pt-5 border-t border-slate-800/80 relative z-10">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Sword size={11} className="text-cyan-500" /> System Quest Recommendation
                        </p>
                        <div className="bg-slate-900 border border-cyan-500/20 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between hover:border-cyan-500/40 transition-all group/quest">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-xs font-black text-white uppercase tracking-tight group-hover/quest:text-cyan-400 transition-colors">
                                        {suggestion.quest.title}
                                    </span>
                                    <span className="text-[9px] font-black text-emerald-400 flex items-center gap-1">
                                        <Zap size={9} fill="currentColor" /> {suggestion.quest.xp}
                                    </span>
                                </div>
                                <p className="text-[10px] font-bold text-slate-500 mb-2 italic">{suggestion.questReason}</p>
                                <div className="flex flex-wrap gap-2">
                                    {suggestion.quest.tasks.map((task, i) => (
                                        <span key={i} className="text-[9px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                                            {task}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <a
                                href="#system-quests"
                                className="flex-shrink-0 flex items-center gap-1 px-4 py-2 bg-cyan-900/30 hover:bg-cyan-900/50 border border-cyan-500/30 hover:border-cyan-500/60 text-cyan-400 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all"
                            >
                                View Quest <ChevronRight size={12} />
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
