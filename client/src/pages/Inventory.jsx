import React, { useContext } from 'react';
import { Package, Target, Shield, Box, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const INITIAL_INVENTORY = [
    { id: 1, name: "Basic Recovery Potion", type: "Consumable", stats: "Restore 20g Protein", rarity: "common" }
];

const SHOP_PRODUCTS = [
    { id: 101, name: "Shadow Strider Shoes", type: "Footwear", stats: "Agility +5", rarity: "rare", price: "₹2,499" },
    { id: 102, name: "Titan Grip Belt", type: "Accessory", stats: "Strength +10", rarity: "epic", price: "₹4,999" },
    { id: 103, name: "Demon King Pre-Workout", type: "Consumable", stats: "Energy +50", rarity: "legendary", price: "₹1,999" },
    { id: 104, name: "Wrist Wraps of Fortitude", type: "Armor", stats: "Defense +2", rarity: "uncommon", price: "₹899" },
    { id: 105, name: "Aura-infused Shaker", type: "Accessory", stats: "Hydration +20", rarity: "rare", price: "₹1,299" },
    { id: 106, name: "Monarch's Compression Shirt", type: "Apparel", stats: "Endurance +15", rarity: "epic", price: "₹3,499" }
];

export default function Inventory() {
    const { user } = useContext(AuthContext);
    const items = user?.inventory || [];
    const navigate = useNavigate();

    const handleBuy = (product) => {
        navigate('/premium/checkout', { state: { item: product } });
    };

    const getRarityColor = (rarity) => {
        switch (rarity) {
            case 'legendary': return 'text-orange-400 border-orange-500/50 bg-orange-950/20';
            case 'epic': return 'text-purple-400 border-purple-500/50 bg-purple-950/20';
            case 'rare': return 'text-blue-400 border-blue-500/50 bg-blue-950/20';
            case 'uncommon': return 'text-emerald-400 border-emerald-500/50 bg-emerald-950/20';
            default: return 'text-slate-400 border-slate-700/50 bg-slate-800/20';
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 py-8 font-mono">
            <div className="max-w-4xl mx-auto px-4">

                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px bg-slate-800 flex-1"></div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-[0.2em] flex items-center gap-3 italic">
                        <Box className="text-cyan-500" size={32} /> System Inventory
                    </h1>
                    <div className="h-px bg-slate-800 flex-1"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Left Column: Store */}
                    <div className="md:col-span-1 border-r border-slate-900 pr-8">
                        <div className="sticky top-8">
                            <h3 className="text-sm font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2 mb-6 pb-4 border-b border-slate-800">
                                <ShoppingCart size={18} /> System Store
                            </h3>
                            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                                {SHOP_PRODUCTS.map(product => (
                                    <div key={product.id} className={`p-4 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-cyan-500/50 transition-all group`}>
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-black text-xs uppercase text-white group-hover:text-cyan-400 transition-colors">{product.name}</h4>
                                            <span className={`text-[8px] font-black uppercase tracking-widest opacity-70 ${getRarityColor(product.rarity).split(' ')[0]}`}>
                                                {product.rarity}
                                            </span>
                                        </div>
                                        <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-3">
                                            {product.stats}
                                        </div>
                                        <div className="flex justify-between items-center mt-4">
                                            <span className="text-sm font-black text-cyan-500">{product.price}</span>
                                            <button 
                                                onClick={() => handleBuy(product)}
                                                className="px-4 py-2 bg-slate-800 hover:bg-cyan-900 border border-slate-700 hover:border-cyan-500 text-xs text-white rounded font-black uppercase tracking-widest transition-all"
                                            >
                                                Acquire
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Inventory Slots */}
                    <div className="md:col-span-2">
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-4">
                            Subspace Capacity: {items.length} / 50 Slots
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className={`p-4 rounded-xl border-2 transition-transform hover:scale-[1.02] cursor-pointer group ${getRarityColor(item.rarity)}`}
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="bg-slate-950/50 p-2 rounded-lg group-hover:bg-slate-950 transition-colors">
                                            {item.type === 'Consumable' ? <Package size={20} /> :
                                                item.type === 'Armor' ? <Shield size={20} /> :
                                                    <Target size={20} />}
                                        </div>
                                        <span className="text-[9px] font-black uppercase tracking-widest opacity-70">
                                            {item.rarity}
                                        </span>
                                    </div>

                                    <h4 className="font-black text-sm uppercase tracking-tight mb-1">{item.name}</h4>
                                    <div className="flex justify-between items-end mt-2">
                                        <span className="text-[10px] font-bold opacity-60 uppercase">{item.type}</span>
                                        <span className="text-[10px] font-black uppercase tracking-wider">{item.stats}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
