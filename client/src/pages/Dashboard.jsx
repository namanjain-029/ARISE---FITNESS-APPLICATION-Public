import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LevelingContext } from '../context/LevelingContext';
import { Activity, Flame, Droplets, Target, Plus, Shield, Zap, Star, Calendar, LogOut, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import BMICalculator from '../components/BMICalculator';
import DailyQuests from '../components/DailyQuests';
import SuggestedWorkouts from '../components/SuggestedWorkouts';
import MealPlans from '../components/MealPlans';
import SkillTree from '../components/SkillTree';
import WorkoutSchedule from '../components/WorkoutSchedule';
import ExerciseList from '../components/ExerciseList';
import DungeonRaid from '../components/DungeonRaid';
import SystemAnalyzer from '../components/SystemAnalyzer';
import ActivityHeatmap from '../components/ActivityHeatmap';

export default function Dashboard() {
    const { user, logout } = useContext(AuthContext);
    const { xp, level, rank, summary } = useContext(LevelingContext);
    const loading = summary === null;

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-cyan-900 border-t-cyan-400 rounded-full animate-spin"></div>
                    <p className="text-cyan-500 font-mono animate-pulse">INITIALIZING SYSTEM...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 py-8 font-mono">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Status Window Header */}
                <div className="border-2 border-cyan-500/30 bg-slate-900/50 p-6 rounded-2xl mb-8 relative overflow-hidden shadow-[0_0_20px_rgba(34,211,238,0.1)]">
                    <div className="absolute top-0 right-0 p-2 bg-cyan-500 text-slate-950 font-black text-xs">
                        {rank}
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <h1 className="text-4xl font-black text-white tracking-widest uppercase mb-0">
                                    Status Window
                                </h1>
                                <button onClick={logout} className="p-2 text-rose-500 hover:bg-rose-900/20 rounded-lg transition-all border border-rose-500/30 bg-slate-900 shadow-[0_0_10px_rgba(244,63,94,0.1)] active:scale-95 flex items-center gap-2" title="Disconnect System">
                                    <LogOut size={16} /> <span className="text-[10px] font-black tracking-widest uppercase hidden sm:inline">Logout</span>
                                </button>
                            </div>
                            <div className="flex items-center gap-4 text-cyan-400">
                                <span className="flex items-center gap-1"><Shield size={16} /> Player: {user?.name}</span>
                                <span className="flex items-center gap-1"><Star size={16} /> Level: {level}</span>
                                <span className="flex items-center gap-1"><Zap size={16} /> Rank: {rank}</span>
                            </div>
                        </div>
                        <div className="w-full md:w-64">
                            <div className="flex justify-between text-xs mb-1 text-cyan-500">
                                <span>XP PROGRESS</span>
                                <span>{xp % 100} / 100</span>
                            </div>
                            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-cyan-500/20">
                                <div
                                    className="h-full bg-gradient-to-r from-cyan-600 to-blue-400 shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all duration-500"
                                    style={{ width: `${xp % 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Suggestions (Premium Feature) */}
                <SystemAnalyzer />

                {/* Stats & Widgets Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Stats */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <StatCard
                                title="STRENGTH (Calories Burned)"
                                value={summary?.caloriesBurned || 0}
                                unit="KCAL"
                                icon={<Flame className="text-orange-400" size={24} />}
                                color="orange"
                            />
                            <StatCard
                                title="VITALITY (Water Intake)"
                                value={summary?.waterMl || 0}
                                unit="ML"
                                icon={<Droplets className="text-blue-400" size={24} />}
                                color="blue"
                            />
                            <StatCard
                                title="INTELLIGENCE (Calories Consumed)"
                                value={summary?.caloriesConsumed || 0}
                                unit="KCAL"
                                icon={<Target className="text-emerald-400" size={24} />}
                                color="emerald"
                            />
                            <StatCard
                                title="AGILITY (Active Workouts)"
                                value={summary?.workoutsToday || 0}
                                unit="SESSIONS"
                                icon={<Activity className="text-purple-400" size={24} />}
                                color="purple"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <Link to="/log-workout" className="flex-1 min-w-[150px] flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white py-4 rounded-xl font-bold uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-cyan-900/20">
                                <Plus size={20} /> Log Activity
                            </Link>
                            <Link to="/log-meal" className="flex-1 min-w-[150px] flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/30 py-4 rounded-xl font-bold uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95">
                                <Plus size={20} /> Collect Resources
                            </Link>
                            <Link to="/inventory" className="flex-1 min-w-[150px] flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-purple-400 border border-purple-500/30 py-4 rounded-xl font-bold uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95">
                                <Package size={20} /> System Gear
                            </Link>
                        </div>
                        
                        {/* Activity Heatmap placed in the empty space below action buttons */}
                        <ActivityHeatmap />
                    </div>

                    {/* Right Column: Quests & Assessment */}
                    <div className="space-y-8">
                        <DungeonRaid />
                        <DailyQuests />
                        <BMICalculator />
                    </div>
                </div>

                {/* Additional System Features */}
                <div className="mt-8 border-t border-slate-900 pt-8">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px bg-slate-800 flex-1"></div>
                        <h2 className="text-xl font-black text-white uppercase tracking-[0.3em] flex items-center gap-4 italic shrink-0">
                            <Shield className="text-cyan-500" size={24} /> System Expansion
                        </h2>
                        <div className="h-px bg-slate-800 flex-1"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                        <div id="system-quests">
                            <SuggestedWorkouts />
                        </div>
                        <MealPlans />
                        <SkillTree />
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px bg-slate-800 flex-1"></div>
                        <h2 className="text-xl font-black text-white uppercase tracking-[0.3em] flex items-center gap-4 italic shrink-0">
                            <Shield className="text-purple-500" size={24} /> Skill Training
                        </h2>
                        <div className="h-px bg-slate-800 flex-1"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <WorkoutSchedule />
                        <ExerciseList />
                    </div>
                </div>

            </div>
        </div>
    );
}

function StatCard({ title, value, unit, icon, color }) {
    const colorClasses = {
        orange: 'border-orange-500/30 shadow-orange-950/20',
        blue: 'border-blue-500/30 shadow-blue-950/20',
        emerald: 'border-emerald-500/30 shadow-emerald-950/20',
        purple: 'border-purple-500/30 shadow-purple-950/20',
        cyan: 'border-cyan-500/30 shadow-cyan-950/20',
    };

    return (
        <div className={`bg-slate-900/80 border-2 ${colorClasses[color]} p-6 rounded-2xl shadow-xl transition-transform hover:translate-y-[-4px]`}>
            <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-slate-800 rounded-xl border border-white/5">
                    {icon}
                </div>
                <div className="text-[10px] text-slate-500 font-black tracking-tighter uppercase">Stat Point</div>
            </div>
            <div>
                <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">{title}</p>
                <div className="flex items-baseline gap-2">
                    <h4 className="text-4xl font-black text-white">{value}</h4>
                    <span className="text-xs font-bold text-slate-500">{unit}</span>
                </div>
            </div>
        </div>
    );
}



function ArrowRight(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}
