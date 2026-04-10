import React from 'react';
import { Calendar, CheckCircle, Clock } from 'lucide-react';

const WEEK_SCHEDULE = [
    { day: "Mon", type: "Strength", bodyPart: "Upper Body", completed: true },
    { day: "Tue", type: "Cardio", bodyPart: "Endurance", completed: false },
    { day: "Wed", type: "Rest", bodyPart: "Recovery", completed: false },
    { day: "Thu", type: "Strength", bodyPart: "Lower Body", completed: false },
    { day: "Fri", type: "Agility", bodyPart: "Core & Speed", completed: false },
    { day: "Sat", type: "Endurance", bodyPart: "Long Run", completed: false },
    { day: "Sun", type: "Rest", bodyPart: "Recovery", completed: false },
];

export default function WorkoutSchedule() {
    return (
        <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl overflow-hidden shadow-2xl h-full flex flex-col">
            <div className="bg-slate-800/50 p-6 border-b border-slate-800 flex items-center justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2 relative z-10">
                    <Calendar className="text-cyan-400" size={18} /> System Calendar
                </h3>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter relative z-10">Weekly Planner</span>
            </div>

            <div className="p-6 overflow-y-auto max-h-[400px]">
                <p className="text-xs text-slate-400 mb-6 font-medium italic">
                    Upcoming training assignments. Compliance determines XP allocation.
                </p>

                <div className="space-y-3">
                    {WEEK_SCHEDULE.map((schedule, idx) => (
                        <div
                            key={idx}
                            className={`flex items-center justify-between p-3 border-l-2 rounded-r-lg transition-all ${schedule.completed
                                    ? 'border-emerald-500 bg-emerald-950/20'
                                    : schedule.type === 'Rest'
                                        ? 'border-slate-700 bg-slate-800/20'
                                        : 'border-cyan-500/50 bg-slate-800/40 hover:bg-slate-800'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <span className={`text-xs font-black uppercase tracking-widest w-8 ${schedule.completed ? 'text-emerald-400' : 'text-slate-500'
                                    }`}>
                                    {schedule.day}
                                </span>
                                <div>
                                    <h4 className={`text-[11px] font-black uppercase tracking-tight ${schedule.completed ? 'text-white' : 'text-slate-300'
                                        }`}>
                                        {schedule.type}
                                    </h4>
                                    <span className="text-[9px] font-bold text-slate-500 uppercase">
                                        {schedule.bodyPart}
                                    </span>
                                </div>
                            </div>

                            <div>
                                {schedule.completed ? (
                                    <CheckCircle size={16} className="text-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
                                ) : schedule.type === 'Rest' ? (
                                    <span className="text-[9px] font-black text-slate-600 uppercase">Scheduled</span>
                                ) : (
                                    <Clock size={14} className="text-cyan-600" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
