import React, { useState, useContext } from 'react';
import { useForm as useReactHookForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { emailValidation, passwordValidation, nameValidation, ageValidation, weightValidation, heightValidation } from '../utils/validators';
import { UserPlus, Shield, Info, Activity } from 'lucide-react';

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useReactHookForm();
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true);
        setServerError('');
        try {
            const response = await api.post('/auth/register', {
                name: data.name,
                email: data.email,
                password: data.password,
                age: parseInt(data.age, 10),
                weight: parseFloat(data.weight),
                height: parseFloat(data.height),
                goal: data.goal
            });

            const { token, user } = response.data.data;
            login(token, user);
            navigate('/dashboard');
        } catch (err) {
            setServerError(err.response?.data?.error?.message || 'Access Denied: Sync Failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-mono">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <div className="mx-auto w-16 h-16 bg-slate-900 border-2 border-cyan-500/50 rounded-lg flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                    <UserPlus className="w-8 h-8 text-cyan-400" />
                </div>
                <h2 className="text-3xl font-black text-white uppercase tracking-widest">
                    New Player Sync
                </h2>
                <p className="mt-2 text-sm text-cyan-500 font-bold uppercase tracking-tight">
                    Establish Connection to the System
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-slate-900 border-2 border-slate-800 py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-24 h-24 bg-cyan-500/5 rounded-full -translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

                    {serverError && (
                        <div className="mb-6 bg-red-900/20 border border-red-500/50 p-4 rounded-lg">
                            <p className="text-xs font-bold text-red-400 uppercase tracking-tighter">{serverError}</p>
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <Info size={14} /> Full Name
                            </label>
                            <input
                                {...register("name", nameValidation)}
                                type="text"
                                className="block w-full px-4 py-2.5 bg-slate-800 border-2 border-slate-700/50 rounded-lg focus:outline-none focus:border-cyan-500 text-white placeholder-slate-600 transition-all font-bold"
                                placeholder="SUNG JIN-WOO"
                            />
                            {errors.name && <p className="mt-2 text-[10px] font-black text-red-500 uppercase tracking-tighter">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <Shield size={14} /> System ID (Email)
                            </label>
                            <input
                                {...register("email", emailValidation)}
                                type="email"
                                className="block w-full px-4 py-2.5 bg-slate-800 border-2 border-slate-700/50 rounded-lg focus:outline-none focus:border-cyan-500 text-white placeholder-slate-600 transition-all font-bold"
                                placeholder="sung_jin_woo@gmail.com"
                            />
                            {errors.email && <p className="mt-2 text-[10px] font-black text-red-500 uppercase tracking-tighter">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <Activity size={14} /> Access Key (Password)
                            </label>
                            <input
                                {...register("password", passwordValidation)}
                                type="password"
                                className="block w-full px-4 py-2.5 bg-slate-800 border-2 border-slate-700/50 rounded-lg focus:outline-none focus:border-cyan-500 text-white placeholder-slate-600 transition-all font-bold"
                                placeholder="••••••••"
                            />
                            {errors.password && <p className="mt-2 text-[10px] font-black text-red-500 uppercase tracking-tighter">{errors.password.message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Age</label>
                                <input
                                    {...register("age", ageValidation)}
                                    type="number"
                                    className="block w-full px-4 py-2 bg-slate-800 border-2 border-slate-700/50 rounded-lg focus:outline-none focus:border-cyan-500 text-white transition-all font-bold"
                                />
                                {errors.age && <p className="mt-1 text-[10px] font-black text-red-500 uppercase">{errors.age.message}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Weight (KG)</label>
                                <input
                                    {...register("weight", weightValidation)}
                                    type="number"
                                    step="0.1"
                                    className="block w-full px-4 py-2 bg-slate-800 border-2 border-slate-700/50 rounded-lg focus:outline-none focus:border-cyan-500 text-white transition-all font-bold"
                                />
                                {errors.weight && <p className="mt-1 text-[10px] font-black text-red-500 uppercase">{errors.weight.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Height (CM)</label>
                                <input
                                    {...register("height", heightValidation)}
                                    type="number"
                                    step="0.1"
                                    className="block w-full px-4 py-2 bg-slate-800 border-2 border-slate-700/50 rounded-lg focus:outline-none focus:border-cyan-500 text-white transition-all font-bold"
                                />
                                {errors.height && <p className="mt-1 text-[10px] font-black text-red-500 uppercase">{errors.height.message}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Path (Goal)</label>
                                <select
                                    {...register("goal", { required: 'Path selection required' })}
                                    className="block w-full px-4 py-2 bg-slate-800 border-2 border-slate-700/50 rounded-lg focus:outline-none focus:border-cyan-500 text-white transition-all font-bold appearance-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"
                                >
                                    <option value="lose">WEIGHT REDUCTION</option>
                                    <option value="maintain">MAINTENANCE</option>
                                    <option value="gain">STRENGTH EVOLUTION</option>
                                </select>
                                {errors.goal && <p className="mt-1 text-[10px] font-black text-red-500 uppercase">{errors.goal.message}</p>}
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-4 px-4 bg-cyan-600 hover:bg-cyan-500 text-slate-950 rounded-lg font-black uppercase tracking-widest transition-all shadow-[0_4px_0_rgb(8,145,178)] active:translate-y-[2px] active:shadow-none disabled:opacity-50"
                            >
                                {loading ? 'SYNCING...' : 'Initiate Awakening'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                        <Link to="/login" className="text-xs font-black text-cyan-400 hover:text-cyan-300 uppercase tracking-widest">
                            Existing Player? Continue Sync
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

