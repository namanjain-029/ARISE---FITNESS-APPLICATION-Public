import React, { useState, useContext } from 'react';
import { CreditCard, ShieldCheck, Sparkles, ChevronLeft, Loader2 } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

export default function Payment() {
    const navigate = useNavigate();
    const location = useLocation();
    const { setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Check if we passed a specific item to buy
    const purchaseItem = location.state?.item;

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const payload = purchaseItem
                ? { type: 'item', item: purchaseItem }
                : { type: 'premium' };

            const response = await api.post('/user/checkout', payload);

            // Update the global React auth state immediately
            if (response.data.success) {
                setUser(response.data.data.user);
            }

            if (purchaseItem) {
                navigate('/inventory');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.error?.message || 'Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Ambience */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[100px] pointer-events-none ${purchaseItem ? 'bg-cyan-600/5' : 'bg-amber-600/5'}`}></div>

            <Link to={purchaseItem ? '/inventory' : '/dashboard'} className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-amber-500 transition-colors font-black text-xs uppercase tracking-widest z-20">
                <ChevronLeft size={16} /> Back
            </Link>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl relative z-10">
                <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br border shadow-[0_0_20px_rgba(245,158,11,0.2)] mb-4 ${purchaseItem ? 'from-cyan-600 to-cyan-900 border-cyan-500/30' : 'from-amber-600 to-amber-900 border-amber-500/30'}`}>
                        <Sparkles className={purchaseItem ? 'text-cyan-100' : 'text-amber-100'} size={28} />
                    </div>
                    <h1 className="text-2xl font-black text-white uppercase tracking-wider mb-2">
                        {purchaseItem ? 'Merchant Terminal' : 'Premium Matrix'}
                    </h1>
                    <p className="text-sm font-bold text-slate-400">
                        {purchaseItem ? `Secure acquisition of ${purchaseItem.name}` : 'Unlock the System Analyzer AI'}
                    </p>
                </div>

                {/* Order summary */}
                <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 mb-6">
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-800">
                        <span className="text-xs font-black text-slate-500 uppercase tracking-widest">
                            {purchaseItem ? 'Digital Gear' : 'Subscription'}
                        </span>
                        <span className="text-sm font-black text-white">
                            {purchaseItem ? purchaseItem.name : 'Monthly'}
                        </span>
                    </div>
                    {purchaseItem && (
                        <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-800">
                            <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Bonus Stat</span>
                            <span className="text-xs font-black text-cyan-400">{purchaseItem.stats}</span>
                        </div>
                    )}
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Total Amount</span>
                        <span className={`text-2xl font-black ${purchaseItem ? 'text-cyan-400' : 'text-amber-500'}`}>
                            {purchaseItem ? purchaseItem.price : '₹399.00'}
                        </span>
                    </div>
                </div>

                {error && (
                    <div className="bg-rose-950/40 border border-rose-500/30 text-rose-400 text-xs font-bold p-3 rounded-xl mb-4 uppercase tracking-widest">
                        {error}
                    </div>
                )}

                <form onSubmit={handlePayment} className="space-y-4">
                    <div>
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Card Details</label>
                        <div className="relative">
                            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                            <input
                                type="text"
                                placeholder="0000 0000 0000 0000"
                                required
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-sm font-bold text-white placeholder-slate-700 focus:outline-none focus:border-amber-500 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Expiry</label>
                            <input
                                type="text"
                                placeholder="MM/YY"
                                required
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-4 px-4 text-sm font-bold text-white placeholder-slate-700 focus:outline-none focus:border-amber-500 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">CVC</label>
                            <input
                                type="password"
                                placeholder="***"
                                required
                                maxLength="3"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-4 px-4 text-sm font-bold text-white placeholder-slate-700 focus:outline-none focus:border-amber-500 transition-colors"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full mt-4 flex items-center justify-center gap-2 py-4 rounded-xl font-black uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:pointer-events-none bg-gradient-to-r ${
                            purchaseItem
                                ? 'from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-cyan-950 shadow-[0_5px_20px_rgba(6,182,212,0.2)]'
                                : 'from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-amber-950 shadow-[0_5px_20px_rgba(245,158,11,0.2)]'
                        }`}
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <ShieldCheck size={20} />}
                        {loading ? 'Processing...' : 'Secure Checkout'}
                    </button>

                    <p className="text-center text-[9px] font-bold text-slate-600 uppercase tracking-widest mt-4">
                        Saved permanently to your account. Mock Environment.
                    </p>
                </form>
            </div>
        </div>
    );
}
