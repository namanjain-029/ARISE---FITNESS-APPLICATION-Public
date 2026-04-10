import React from 'react';
import { Award, Lock, CheckCircle2, Zap } from 'lucide-react';

const SKILLS = [
    {
        id: 1,
        name: "Endurance Hunter",
        level: "LV. 4",
        desc: "Cardio efficiency increased. Reduces fatigue build-up.",
        unlocked: true,
        icon: <Zap size={16} className="text-cyan-400" />
    },
    {
        id: 2,
        name: "Restoration Master",
        level: "LV. 2",
        desc: "Increases calorie utilization for muscle repair.",
        unlocked: true,
        icon: <CheckCircle2 size={16} className="text-emerald-400" />
    },
    {
        id: 3,
        name: "Shadow Step",
        level: "LOCKED",
        desc: "Unlock after 30 consecutive training days.",
        unlocked: false,
        icon: <Lock size={16} className="text-slate-600" />
    },
    {
        id: 4,
        name: "Monarch's Vigor",
        level: "LOCKED",
        desc: "Unlock after reaching S-Rank.",
        unlocked: false,
        icon: <Lock size={16} className="text-slate-600" />
    }
];

export default function SkillTree() {
    return (
        <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl overflow-hidden shadow-2xl h-full flex flex-col">
            <div className="bg-slate-800/50 p-6 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                    <Award className="text-purple-400" size={18} /> Player Passive Skills
                </h3>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Skill Tree</span>
            </div>

            <div className="p-6 space-y-4">
                {SKILLS.map((skill) => (
                    <div key={skill.id} className={`flex items-center gap-4 p-3 rounded-xl border-2 transition-all ${skill.unlocked ? 'bg-slate-800/50 border-slate-700/50 hover:border-purple-500/30' : 'bg-slate-950/50 border-slate-900 opacity-60'}`}>
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${skill.unlocked ? 'bg-slate-900 border-purple-500/30' : 'bg-slate-950 border-slate-800'}`}>
                            {skill.icon}
                        </div>

                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <h4 className={`text-[10px] font-black uppercase tracking-tight ${skill.unlocked ? 'text-white' : 'text-slate-500'}`}>{skill.name}</h4>
                                <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${skill.unlocked ? 'bg-purple-900/40 text-purple-400' : 'bg-slate-900 text-slate-600'}`}>{skill.level}</span>
                            </div>
                            <p className="text-[9px] font-medium text-slate-500 leading-tight italic">{skill.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-auto p-4 bg-slate-800/20 border-t border-slate-800">
                <div className="flex justify-between items-center text-[8px] font-black text-slate-500 uppercase mb-2">
                    <span>Skill Point Availability</span>
                    <span>0 Points</span>
                </div>
                <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden">
                    <div className="w-0 h-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)] transition-all duration-1000"></div>
                </div>
            </div>
        </div>
    );
}
