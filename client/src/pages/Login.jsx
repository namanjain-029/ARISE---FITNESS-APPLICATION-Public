import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { emailValidation, passwordValidation } from '../utils/validators';
import { Shield, Lock, Mail } from 'lucide-react';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true);
        setServerError('');
        try {
            const response = await api.post('/auth/login', {
                email: data.email,
                password: data.password
            });

            const { token, user } = response.data.data;
            login(token, user);
            navigate('/dashboard');
        } catch (err) {
            setServerError(err.response?.data?.error?.message || 'Access Denied: Invalid credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-mono">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="mx-auto w-16 h-16 bg-slate-900 border-2 border-cyan-500/50 rounded-lg flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                    <Shield className="w-8 h-8 text-cyan-400" />
                </div>
                <h2 className="text-center text-3xl font-black text-white uppercase tracking-widest">
                    Identify Player
                </h2>
                <p className="mt-2 text-center text-sm text-cyan-500 font-bold uppercase tracking-tight">
                    Synchronize with System
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-slate-900 border-2 border-slate-800 py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>

                    {serverError && (
                        <div className="mb-6 bg-red-900/20 border border-red-500/50 p-4 rounded-lg">
                            <p className="text-xs font-bold text-red-400 uppercase tracking-tighter">{serverError}</p>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <Mail size={14} /> Email Address
                            </label>
                            <div className="mt-1">
                                <input
                                    {...register("email", emailValidation)}
                                    type="email"
                                    className="block w-full px-4 py-3 bg-slate-800 border-2 border-slate-700/50 rounded-lg focus:outline-none focus:border-cyan-500 text-white placeholder-slate-600 transition-all font-bold"
                                    placeholder="sung_jin_woo@gmail.com"
                                />
                                {errors.email && <p className="mt-2 text-[10px] font-black text-red-500 uppercase tracking-tighter">{errors.email.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <Lock size={14} /> Security Key
                            </label>
                            <div className="mt-1">
                                <input
                                    {...register("password", passwordValidation)}
                                    type="password"
                                    className="block w-full px-4 py-3 bg-slate-800 border-2 border-slate-700/50 rounded-lg focus:outline-none focus:border-cyan-500 text-white placeholder-slate-600 transition-all font-bold"
                                    placeholder="••••••••"
                                />
                                {errors.password && <p className="mt-2 text-[10px] font-black text-red-500 uppercase tracking-tighter">{errors.password.message}</p>}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 bg-slate-800 border-slate-700 text-cyan-500 focus:ring-cyan-500 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                    Maintain Active Sync
                                </label>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-4 px-4 bg-cyan-600 hover:bg-cyan-500 text-slate-950 rounded-lg font-black uppercase tracking-widest transition-all shadow-[0_4px_0_rgb(8,145,178)] active:translate-y-[2px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Initializing...' : 'Authorize Access'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                        <Link to="/register" className="text-xs font-black text-cyan-400 hover:text-cyan-300 uppercase tracking-widest flex items-center justify-center gap-2">
                            New Player Registration
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

