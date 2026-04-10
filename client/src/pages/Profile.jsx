import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { User, Settings, ShieldCheck, Flag, Cpu } from 'lucide-react';
import { nameValidation, ageValidation, weightValidation, heightValidation } from '../utils/validators';

export default function Profile() {
    const { user, setUser } = useContext(AuthContext);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const [loading, setLoading] = useState(false);
    const [goals, setGoals] = useState([]);
    const [goalsLoading, setGoalsLoading] = useState(true);
    const [msg, setMsg] = useState({ type: '', text: '' });

    // Load User Info into form
    useEffect(() => {
        if (user) {
            setValue('name', user.name || '');
            setValue('age', user.age || '');
            setValue('weight', user.weight || '');
            setValue('height', user.height || '');
            setValue('goal', user.goal || 'maintain');
        }
    }, [user, setValue]);

    // Load user goals
    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const res = await api.get('/goals');
                setGoals(res.data.data.goals || []);
            } catch (err) {
                console.error("Error loading goals", err);
            } finally {
                setGoalsLoading(false);
            }
        };
        fetchGoals();
    }, []);

    const onUpdateProfile = async (data) => {
        setLoading(true);
        setMsg({ type: '', text: '' });

        try {
            const payload = {
                name: data.name,
                age: parseInt(data.age, 10),
                weight: parseFloat(data.weight),
                height: parseFloat(data.height),
                goal: data.goal
            };

            const res = await api.put('/user/me', payload);
            setUser(res.data.data.user);
            setMsg({ type: 'success', text: 'SYNC SUCCESS: Player data updated.' });
        } catch (err) {
            setMsg({ type: 'error', text: err.response?.data?.error?.message || 'SYNC FAILED: Access Denied.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col font-mono text-slate-100">
            <Navbar />

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 bg-slate-900 border-2 border-cyan-500/50 text-cyan-400 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                        <User size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Player Profile</h1>
                        <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Internal System Identification & Stats</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Profile Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
                            <div className="absolute top-0 right-0 p-3 bg-slate-800/50 text-[8px] font-black text-slate-600 uppercase">SYS-CFG-001</div>

                            <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-2 bg-slate-800/20">
                                <Settings size={18} className="text-cyan-500" />
                                <h3 className="font-black text-xs text-white uppercase tracking-widest">Core Attributes</h3>
                            </div>

                            <div className="p-6">
                                {msg.text && (
                                    <div className={`mb-6 p-4 border-l-4 rounded-r-lg flex items-center gap-3 ${msg.type === 'error' ? 'bg-red-900/20 border-red-500 text-red-400' : 'bg-cyan-900/20 border-cyan-500 text-cyan-400'}`}>
                                        <p className="text-xs font-black uppercase tracking-widest">{msg.text}</p>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit(onUpdateProfile)} className="space-y-6">

                                    <div>
                                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 px-1">Identity Tag</label>
                                        <input
                                            {...register("name", nameValidation)}
                                            className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-700/50 rounded-lg focus:outline-none focus:border-cyan-500 text-white font-bold transition-all"
                                        />
                                        {errors.name && <p className="mt-2 text-[10px] font-black text-red-500 uppercase">{errors.name.message}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 px-1">Cycles (Age)</label>
                                            <input
                                                type="number"
                                                {...register("age", ageValidation)}
                                                className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-700/50 rounded-lg focus:outline-none focus:border-cyan-500 text-white font-bold transition-all"
                                            />
                                            {errors.age && <p className="mt-2 text-[10px] font-black text-red-500 uppercase">{errors.age.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 px-1">Mass (KG)</label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                {...register("weight", weightValidation)}
                                                className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-700/50 rounded-lg focus:outline-none focus:border-cyan-500 text-white font-bold transition-all"
                                            />
                                            {errors.weight && <p className="mt-2 text-[10px] font-black text-red-500 uppercase">{errors.weight.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 px-1">Scale (CM)</label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                {...register("height", heightValidation)}
                                                className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-700/50 rounded-lg focus:outline-none focus:border-cyan-500 text-white font-bold transition-all"
                                            />
                                            {errors.height && <p className="mt-2 text-[10px] font-black text-red-500 uppercase">{errors.height.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 px-1">Evolution Path</label>
                                            <select
                                                {...register("goal")}
                                                className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-700/50 rounded-lg focus:outline-none focus:border-cyan-500 text-white font-bold transition-all appearance-none italic"
                                            >
                                                <option value="lose">WEIGHT REDUCTION</option>
                                                <option value="maintain">MAINTENANCE</option>
                                                <option value="gain">STRENGTH EVOLUTION</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="pt-4 flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black uppercase tracking-widest rounded-lg shadow-[0_4px_0_rgb(8,145,178)] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-50"
                                        >
                                            {loading ? 'RE-SYNCING...' : 'Update System Data'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Read-Only Account Info */}
                        <div className="mt-8 bg-slate-900 border-2 border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl">
                            <div>
                                <h3 className="font-black text-xs text-white uppercase tracking-widest flex items-center gap-2 mb-2">
                                    <ShieldCheck size={18} className="text-cyan-400" /> Account Authorization
                                </h3>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.1em]">Registered ID: {user?.email}</p>
                            </div>
                            <button className="px-4 py-2 border-2 border-slate-800 text-slate-400 rounded-lg text-xs font-black uppercase tracking-widest hover:border-cyan-500/30 hover:text-cyan-400 transition-all">
                                Change Security Key
                            </button>
                        </div>
                    </div>

                    {/* Goals Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
                            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-cyan-500/5 to-transparent"></div>

                            <div className="p-6 relative z-10 border-b border-slate-800">
                                <h3 className="font-black text-sm text-white uppercase tracking-widest flex items-center gap-2">
                                    <Flag className="text-cyan-400" size={18} /> Active Quests
                                </h3>
                                <p className="text-[10px] font-bold text-slate-500 uppercase mt-1 tracking-widest">Target Verification</p>
                            </div>

                            <div className="p-6 relative z-10">
                                {goalsLoading ? (
                                    <div className="flex justify-center py-8">
                                        <div className="w-8 h-8 border-2 border-slate-800 border-t-cyan-500 rounded-full animate-spin"></div>
                                    </div>
                                ) : goals.length === 0 ? (
                                    <div className="text-center py-8 border-2 border-slate-800 border-dashed rounded-xl">
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">No Active Quests</p>
                                        <button className="mt-3 text-[10px] font-black text-cyan-500 hover:text-cyan-400 uppercase tracking-[0.2em] flex items-center justify-center gap-2 mx-auto">
                                            <Cpu size={12} /> New Assignment
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {goals.map(goal => {
                                            const progress = Math.min((goal.currentValue / goal.targetValue) * 100, 100).toFixed(0);
                                            return (
                                                <div key={goal.id} className="bg-slate-950/50 p-4 border border-slate-800 rounded-xl group hover:border-cyan-500/30 transition-all">
                                                    <div className="flex justify-between items-end mb-3">
                                                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest truncate">
                                                            {goal.goalType.replace('_', ' ')}
                                                        </span>
                                                        <span className="text-[10px] font-black text-cyan-400 italic">{progress}%</span>
                                                    </div>
                                                    <div className="w-full bg-slate-900 rounded-full h-1.5 mb-2 overflow-hidden border border-slate-800">
                                                        <div className="bg-cyan-500 h-full shadow-[0_0_10px_rgba(34,211,238,0.5)]" style={{ width: `${progress}%` }}></div>
                                                    </div>
                                                    <p className="text-[8px] font-black text-slate-500 text-right uppercase tracking-[0.1em]">
                                                        {goal.currentValue} / {goal.targetValue}
                                                    </p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}

