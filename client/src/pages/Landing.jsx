import React from 'react';
import Navbar from '../components/Navbar';
import { ArrowRight, Activity, Flame, HeartPulse, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Landing() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-mono">
            <Navbar />

            <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">

                {/* Cyber Background elements */}
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] -z-10"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>

                <div className="max-w-4xl mx-auto py-20 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-900/30 text-cyan-400 font-bold text-xs mb-8 border border-cyan-500/30 uppercase tracking-[0.2em]">
                        <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-ping"></span>
                        System Awakening Imminent
                    </div>

                    <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 uppercase italic">
                        Level Up<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                            Your Reality.
                        </span>
                    </h1>

                    <p className="mt-4 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed tracking-tight">
                        Log your daily quests, increase your stats, and transcend your limits. The only fitness tracker designed for those who want to reach <span className="text-cyan-400 border-b border-cyan-400/50">S-Rank</span>.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link to="/register" className="w-full sm:w-auto px-10 py-5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 rounded-lg font-black text-xl uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                            Awaken Now
                            <ArrowRight size={24} strokeWidth={3} />
                        </Link>
                        <Link to="/login" className="w-full sm:w-auto px-10 py-5 bg-slate-900 border-2 border-slate-800 hover:border-cyan-500/50 text-white rounded-lg font-bold text-xl uppercase tracking-widest transition-all flex items-center justify-center">
                            Continue Quest
                        </Link>
                    </div>
                </div>

                {/* System Assets */}
                <div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 px-4 pb-24 relative z-10">
                    <FeatureCard
                        icon={<Shield className="text-cyan-400" size={32} />}
                        title="DEFENSE (Workouts)"
                        desc="Fortify your body. Log sessions and track your power growth through detailed analytics."
                    />
                    <FeatureCard
                        icon={<Flame className="text-orange-400" size={32} />}
                        title="STRENGTH (Nutrition)"
                        desc="Fuel the inner fire. Monitor calories and macros to optimize your evolution."
                    />
                    <FeatureCard
                        icon={<Zap className="text-yellow-400" size={32} />}
                        title="AGILITY (Hydration)"
                        desc="Stay fluid. Level up your vitality by maintaining perfect hydration synchronization."
                    />
                </div>
            </main>
        </div>
    );
}

function FeatureCard({ icon, title, desc }) {
    return (
        <div className="bg-slate-900/50 backdrop-blur-md border-2 border-slate-800/50 p-8 rounded-2xl shadow-2xl hover:border-cyan-500/30 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-cyan-500/10 to-transparent"></div>
            <div className="bg-slate-800/50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 border border-white/5 group-hover:scale-110 group-hover:bg-cyan-900/20 transition-all">
                {icon}
            </div>
            <h3 className="text-lg font-black text-white mb-3 uppercase tracking-tighter">{title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-semibold italic">{desc}</p>
        </div>
    );
}

