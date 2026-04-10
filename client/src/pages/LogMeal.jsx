import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import { Calendar, Target, PlusCircle, Zap } from 'lucide-react';

export default function LogMeal() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            date: new Date().toISOString().split('T')[0]
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
                foodName: data.foodName,
                calories: parseFloat(data.calories),
                protein: data.protein ? parseFloat(data.protein) : 0,
                carbs: data.carbs ? parseFloat(data.carbs) : 0,
                fats: data.fats ? parseFloat(data.fats) : 0,
                mealType: data.mealType,
                date: data.date
            };

            await api.post('/meals', payload);
            setSuccessMsg('RECOVERY SYNCED: Mana and health points restored.');
            setTimeout(() => navigate('/dashboard'), 1500);
        } catch (err) {
            setServerError(err.response?.data?.error?.message || 'SYNC ERROR: Identification of resources failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col font-mono text-slate-100">
            <Navbar />

            <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className="w-full max-w-2xl bg-slate-900 border-2 border-slate-800 rounded-2xl shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 bg-slate-800/50 text-[8px] font-black text-slate-600 uppercase tracking-tighter">RES-LOG-V1</div>

                    {/* Header */}
                    <div className="bg-slate-800/50 p-8 sm:p-10 border-b border-slate-800 relative">
                        <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                        <h1 className="text-3xl font-black relative z-10 flex items-center gap-4 uppercase tracking-tighter">
                            <Zap className="text-emerald-400" size={32} /> Resource Intake
                        </h1>
                        <p className="mt-2 text-slate-500 font-bold uppercase text-xs tracking-widest relative z-10">
                            Log nutrients to maintain optimal player condition
                        </p>
                    </div>

                    <div className="p-8 sm:p-10">
                        {serverError && (
                            <div className="mb-6 bg-red-900/20 border-2 border-red-500/50 p-4 rounded-lg flex items-center gap-3">
                                <p className="text-xs font-black text-red-400 uppercase tracking-tighter">{serverError}</p>
                            </div>
                        )}
                        {successMsg && (
                            <div className="mb-6 bg-emerald-900/20 border-2 border-emerald-500/50 p-4 rounded-lg flex items-center gap-3">
                                <p className="text-xs font-black text-emerald-400 uppercase tracking-tighter">{successMsg}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                            {/* Primary Settings */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pb-8 border-b border-slate-800">
                                <div className="sm:col-span-2">
                                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 px-1">Resource Name</label>
                                    <input
                                        type="text"
                                        {...register('foodName', { required: 'Resource name required' })}
                                        placeholder="e.g., High-Protein Mana Pot..."
                                        className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-700/50 rounded-lg focus:outline-none focus:border-emerald-500 text-white font-bold transition-all"
                                    />
                                    {errors.foodName && <p className="mt-2 text-[10px] font-black text-red-500 uppercase">{errors.foodName.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 px-1">Intake Category</label>
                                    <select
                                        {...register('mealType', { required: 'Category required' })}
                                        className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-700/50 rounded-lg focus:outline-none focus:border-emerald-500 text-white font-bold transition-all appearance-none italic"
                                    >
                                        <option value="">Select Category...</option>
                                        <option value="breakfast">MORNING RECOVERY</option>
                                        <option value="lunch">MID-DAY FUEL</option>
                                        <option value="dinner">EVENING RESTORATION</option>
                                        <option value="snack">VITALITY SNACK</option>
                                    </select>
                                    {errors.mealType && <p className="mt-2 text-[10px] font-black text-red-500 uppercase">{errors.mealType.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 px-1 flex items-center gap-2">
                                        <Calendar size={12} /> Consumption Date
                                    </label>
                                    <input
                                        type="date"
                                        {...register('date', { required: 'Date required' })}
                                        className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-700/50 rounded-lg focus:outline-none focus:border-emerald-500 text-white font-bold transition-all"
                                    />
                                    {errors.date && <p className="mt-2 text-[10px] font-black text-red-500 uppercase">{errors.date.message}</p>}
                                </div>
                            </div>

                            {/* Macros */}
                            <div className="pt-2">
                                <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                    <Target size={14} className="text-emerald-500" /> Molecular Breakdown
                                </h3>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="block text-[8px] font-black text-slate-600 uppercase tracking-widest mb-3">Energy (KCAL)</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            {...register('calories', { required: 'Req', min: 0 })}
                                            placeholder="kcal"
                                            className="w-full px-3 py-3 bg-slate-800 border-2 border-slate-700/50 rounded-lg focus:border-emerald-500 outline-none text-white font-bold text-sm"
                                        />
                                        {errors.calories && <p className="mt-2 text-[8px] font-black text-red-500 uppercase">{errors.calories.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-[8px] font-black text-slate-600 uppercase tracking-widest mb-3">Muscle (P)</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            {...register('protein', { min: 0 })}
                                            placeholder="g"
                                            className="w-full px-3 py-3 bg-slate-800 border-2 border-slate-700/50 rounded-lg focus:border-emerald-500 outline-none text-white font-bold text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[8px] font-black text-slate-600 uppercase tracking-widest mb-3">Stamina (C)</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            {...register('carbs', { min: 0 })}
                                            placeholder="g"
                                            className="w-full px-3 py-3 bg-slate-800 border-2 border-slate-700/50 rounded-lg focus:border-emerald-500 outline-none text-white font-bold text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[8px] font-black text-slate-600 uppercase tracking-widest mb-3">Vitality (F)</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            {...register('fats', { min: 0 })}
                                            placeholder="g"
                                            className="w-full px-3 py-3 bg-slate-800 border-2 border-slate-700/50 rounded-lg focus:border-emerald-500 outline-none text-white font-bold text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submit Action */}
                            <div className="pt-8 flex flex-col sm:flex-row items-center justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => navigate('/dashboard')}
                                    className="w-full sm:w-auto px-8 py-3 text-xs font-black text-slate-500 hover:text-white uppercase tracking-widest transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full sm:w-auto px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black uppercase tracking-widest rounded-lg shadow-[0_4px_0_rgb(5,150,105)] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin"></div>
                                            SYNCING...
                                        </>
                                    ) : (
                                        'Sync Resources'
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

