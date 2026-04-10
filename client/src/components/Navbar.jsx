import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Shield, LogOut, User, Layout, PlusCircle, BarChart3, Zap } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinkClass = (path) => {
        const isActive = location.pathname === path;
        return `flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-200 ${isActive
            ? 'bg-cyan-900/40 text-cyan-400 border border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.2)]'
            : 'text-slate-500 hover:text-white hover:bg-slate-900'
            }`;
    };

    return (
        <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b-2 border-slate-900 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">

                    {/* System Logo */}
                    <div className="flex items-center">
                        <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-3 group">
                            <img src="/logo.png" alt="Arise Logo" className="w-9 h-9 border-2 border-cyan-500/50 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.2)] group-hover:scale-110 transition-all" />
                            <span className="font-black text-2xl tracking-tighter text-white uppercase italic">
                                ARISE
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        {user ? (
                            <>
                                <Link to="/dashboard" className={navLinkClass('/dashboard')}>
                                    <Layout size={16} /> Status
                                </Link>
                                <Link to="/log-workout" className={navLinkClass('/log-workout')}>
                                    <Shield size={16} /> Training
                                </Link>
                                <Link to="/log-meal" className={navLinkClass('/log-meal')}>
                                    <PlusCircle size={16} /> Resources
                                </Link>
                                <Link to="/inventory" className={navLinkClass('/inventory')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg> Gear
                                </Link>
                                <Link to="/analytics" className={navLinkClass('/analytics')}>
                                    <BarChart3 size={16} /> Logs
                                </Link>

                                <div className="h-4 w-px bg-slate-800 mx-2"></div>

                                <Link to="/profile" className={navLinkClass('/profile')}>
                                    <User size={16} /> {user.name?.split(' ')[0] || 'Player'}
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-rose-500 hover:bg-rose-900/20 rounded-lg transition-all"
                                    title="Disconnect"
                                >
                                    <LogOut size={16} />
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link
                                    to="/login"
                                    className="text-xs font-black text-slate-500 hover:text-white uppercase tracking-widest transition-colors"
                                >
                                    Sync
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 text-xs font-black text-slate-950 bg-cyan-500 hover:bg-cyan-400 rounded-lg uppercase tracking-widest shadow-[0_4px_0_rgb(8,145,178)] active:translate-y-[2px] active:shadow-none transition-all"
                                >
                                    Awaken
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Navigation (Compact) */}
                    <div className="flex items-center md:hidden gap-3">
                        {user ? (
                            <>
                                <Link to="/dashboard" className="p-2 text-cyan-500 bg-slate-900 rounded-lg border border-cyan-500/30">
                                    <Layout size={20} />
                                </Link>
                                <button onClick={handleLogout} className="p-2 text-rose-500 bg-slate-900 rounded-lg border border-rose-500/30">
                                    <LogOut size={20} />
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="px-4 py-2 text-xs font-black text-slate-950 bg-cyan-500 rounded-lg uppercase tracking-widest">
                                Sync
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

