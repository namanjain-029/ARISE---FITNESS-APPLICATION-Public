import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import { Activity, Calendar, Clock, Flame, FileText, Sword, Droplets } from 'lucide-react';
import { LevelingContext } from '../context/LevelingContext';

export default function LogWorkout() {
    const location = useLocation();
    const prefill = location.state?.prefill || {};
    const { refreshAll } = useContext(LevelingContext);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            date: new Date().toISOString().split('T')[0],
            type: prefill.type || '',
            duration: prefill.duration || '',
            caloriesBurned: prefill.caloriesBurned || '',
            notes: prefill.notes || '',
            waterMl: ''
        }
    });
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true);
        setServerError('');
        setSuccessMsg('');
        try {
            const payload = {
                type: data.type,
                duration: parseInt(data.duration, 10),
                caloriesBurned: parseFloat(data.caloriesBurned),
                date: data.date,
                notes: data.notes || '',
                waterMl: data.waterMl ? parseInt(data.waterMl, 10) : 0
            };

            await api.post('/workouts', payload);
            // Refresh XP + Boss HP immediately
            await refreshAll();
            setSuccessMsg('TRAINING COMPLETE: Experience points synchronized.');
            setTimeout(() => navigate('/dashboard'), 1500);
        } catch (err) {
            setServerError(err.response?.data?.error?.message || 'SYNC ERROR: Training data verification failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col font-mono text-slate-100">
            <Navbar />

            <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className="w-full max-w-2xl bg-slate-900 border-2 border-slate-800 rounded-2xl shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 bg-slate-800/50 text-[8px] font-black text-slate-600 uppercase tracking-tighter">TRN-LOG-V2</div>

                    {/* Header */}
                    <div className="bg-slate-800/50 p-8 sm:p-10 border-b border-slate-800 relative">
                        <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                        <h1 className="text-3xl font-black relative z-10 flex items-center gap-4 uppercase tracking-tighter">
                            <Sword className="text-cyan-400" size={32} /> Training Log
                        </h1>
                        <p className="mt-2 text-slate-500 font-bold uppercase text-xs tracking-widest relative z-10">
                            Synchronize physical activity results to the System
                        </p>
                    </div>

                    <div className="p-8 sm:p-10">
                        {serverError && (
                            <div className="mb-6 bg-red-900/20 border-2 border-red-500/50 p-4 rounded-lg flex items-center gap-3">
                                <p className="text-xs font-black text-red-400 uppercase tracking-tighter">{serverError}</p>
                            </div>
                        )}
                        {successMsg && (
                            <div className="mb-6 bg-cyan-900/20 border-2 border-cyan-500/50 p-4 rounded-lg flex items-center gap-3">
                                <p className="text-xs font-black text-cyan-400 uppercase tracking-tighter">{successMsg}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

                                {/* Type Selection */}
                                <div>
                                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 px-1 flex items-center gap-2">
                                        <Activity size={12} /> Exercise Type
                                    </label>
                                    <select
                                        {...register('type', { required: 'Type required' })}
                                        className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-700/50 rounded-lg focus:outline-none focus:border-cyan-500 text-white font-bold transition-all appearance-none italic"
                                    >
                                        <option value="">Select Protocol...</option>
                                        <option value="running">STAMINA: RUNNING</option>
                                        <option value="cycling">STAMINA: CYCLING</option>
                                        <option value="gym">STRENGTH: GYM / WEIGHTS</option>
                                        <option value="swimming">AGILITY: SWIMMING</option>
                                        <option value="walking">STAMINA: WALKING</option>
                                        <option value="yoga">FLEXIBILITY: YOGA</option>
                                        <option value="other">PROTOCOL: OTHER</option>
                                    </select>
                                    {errors.type && <p className="mt-2 text-[10px] font-black text-red-500 uppercase">{errors.type.message}</p>}
                                </div>

                                {/* Date Selection */}
                                <div>
                                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 px-1 flex items-center gap-2">
                                        <Calendar size={12} /> Timestamp
                                    </label>
                                    <input
                                        type="date"
                                        {...register('date', { required: 'Date required' })}
                                        className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-700/50 rounded-lg focus:outline-none focus:border-cyan-500 text-white font-bold transition-all"
                                    />
                                    {errors.date && <p className="mt-2 text-[10px] font-black text-red-500 uppercase">{errors.date.message}</p>}
                                </div>

                                {/* Duration */}
                                <div>
                                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 px-1 flex items-center gap-2">
                                        <Clock size={12} /> Intensity Duration (MIN)
                                    </label>
                                    <input
                                        type="number"
                                        {...register('duration', {
                                            required: 'Required',
                                            min: { value: 1, message: 'Min 1 cycle' }
                                        })}
                                        placeholder="e.g. 45"
                                        className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-700/50 rounded-lg focus:outline-none focus:border-cyan-500 text-white font-bold transition-all"
                                    />
                                    {errors.duration && <p className="mt-2 text-[10px] font-black text-red-500 uppercase">{errors.duration.message}</p>}
                                </div>

                                {/* Calories Burned */}
                                <div>
                                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 px-1 flex items-center gap-2">
                                        <Flame size={12} /> Energy Purged (KCAL)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        {...register('caloriesBurned', {
                                            required: 'Required',
                                            min: { value: 0, message: 'Non-negative' }
                                        })}
                                        placeholder="e.g. 350"
                                        className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-700/50 rounded-lg focus:outline-none focus:border-cyan-500 text-white font-bold transition-all"
                                    />
                                    {errors.caloriesBurned && <p className="mt-2 text-[10px] font-black text-red-500 uppercase">{errors.caloriesBurned.message}</p>}
                                </div>
                            </div>

                            {/* Notes */}
                            <div>
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 px-1 flex items-center gap-2">
                                    <FileText size={12} /> Tactical Observations
                                </label>
                                <textarea
                                    {...register('notes')}
                                    rows={3}
                                    placeholder="Enter performance anomalies or achievements..."
                                    className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-700/50 rounded-lg focus:outline-none focus:border-cyan-500 text-white font-bold transition-all resize-none"
                                />
                            </div>

                            {/* Water Intake */}
                            <div>
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 px-1 flex items-center gap-2">
                                    <Droplets size={12} className="text-blue-400" /> Vitality Intake (Water — ML)
                                </label>
                                <input
                                    type="number"
                                    {...register('waterMl', { min: { value: 0, message: 'Cannot be negative' } })}
                                    placeholder="e.g. 500 (optional)"
                                    className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-700/50 rounded-lg focus:outline-none focus:border-blue-500 text-white font-bold transition-all"
                                />
                                {errors.waterMl && <p className="mt-2 text-[10px] font-black text-red-500 uppercase">{errors.waterMl.message}</p>}
                            </div>

                            {/* Submit Action */}
                            <div className="pt-6 flex flex-col sm:flex-row items-center justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => navigate('/dashboard')}
                                    className="w-full sm:w-auto px-8 py-3 text-xs font-black text-slate-500 hover:text-white uppercase tracking-widest transition-all"
                                >
                                    Abort
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full sm:w-auto px-10 py-4 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black uppercase tracking-widest rounded-lg shadow-[0_4px_0_rgb(8,145,178)] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin"></div>
                                            SYNCING...
                                        </>
                                    ) : (
                                        'Commit Log'
                                    )}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}

