import React, { useState } from 'react';
import { BookOpen, Search, Filter } from 'lucide-react';

const EXERCISE_LIBRARY = [
    { id: 1, name: "Push-ups", category: "Chest / Triceps", diff: "Beginner", description: "Standard bodyweight exercise for pushing strength." },
    { id: 2, name: "Squats", category: "Legs", diff: "Beginner", description: "Fundamental lower body movement." },
    { id: 3, name: "Pull-ups", category: "Back / Biceps", diff: "Intermediate", description: "Bodyweight pulling movement. Essential for back width." },
    { id: 4, name: "Plank", category: "Core", diff: "Beginner", description: "Static core hold to build isometric endurance." },
    { id: 5, name: "Burpees", category: "Full Body / Cardio", diff: "Intermediate", description: "Explosive movement combining squat, push-up, and jump." },
    { id: 6, name: "Deadlift", category: "Full Body", diff: "Advanced", description: "Compound barbell movement for posterior chain strength." },
    { id: 7, name: "Bench Press", category: "Chest / Triceps", diff: "Intermediate", description: "Standard barbell pressing for upper body mass." },
    { id: 8, name: "Muscle-ups", category: "Full Upper Body", diff: "Advanced", description: "Advanced bodyweight movement combining a pull-up and a dip." },
    { id: 9, name: "Lunges", category: "Legs / Core", diff: "Beginner", description: "Unilateral leg training for balance and thigh strength." },
    { id: 10, name: "Dips", category: "Chest / Triceps", diff: "Intermediate", description: "Parallel bar pushing movement to strengthen triceps and lower chest." },
    { id: 11, name: "Shadow Step (Sprint)", category: "Cardio / Agility", diff: "Advanced", description: "High-intensity interval sprints targeting explosive speed." }
];

export default function ExerciseList() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredExercises = EXERCISE_LIBRARY.filter(ex =>
        ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ex.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl overflow-hidden shadow-2xl h-full flex flex-col">
            <div className="bg-slate-800/50 p-6 border-b border-slate-800 flex items-center justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2 relative z-10">
                    <BookOpen className="text-purple-400" size={18} /> Skill Library
                </h3>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter relative z-10">Exercise Manual</span>
            </div>

            <div className="p-4 border-b border-slate-800 bg-slate-900 flex gap-2">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                    <input
                        type="text"
                        placeholder="Search skill..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-800 border-2 border-slate-700/50 rounded-lg py-2 pl-9 pr-4 text-xs font-bold text-white focus:outline-none focus:border-purple-500 transition-colors"
                    />
                </div>
            </div>

            <div className="p-4 overflow-y-auto max-h-[350px] space-y-3">
                {filteredExercises.length > 0 ? (
                    filteredExercises.map((ex) => (
                        <div key={ex.id} className="group p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl hover:border-purple-500/50 transition-all">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-xs font-black text-white uppercase tracking-tight group-hover:text-purple-400 transition-colors">{ex.name}</h4>
                                <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${ex.diff === 'Beginner' ? 'bg-emerald-900/40 text-emerald-400' :
                                        ex.diff === 'Intermediate' ? 'bg-yellow-900/40 text-yellow-400' :
                                            'bg-rose-900/40 text-rose-400'
                                    }`}>
                                    {ex.diff}
                                </span>
                            </div>
                            <div className="mb-2">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{ex.category}</span>
                            </div>
                            <p className="text-[10px] text-slate-400 font-medium italic leading-relaxed">
                                {ex.description}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8">
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">No skill found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
