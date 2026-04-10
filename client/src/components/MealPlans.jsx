import React, { useState } from 'react';
import { Apple, Zap, Flame, Coffee, CheckCircle, Loader2, X, ArrowRight, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MEAL_PLANS = [
    {
        id: 1,
        title: "Monarch's Bulk",
        goal: "Muscular Hypertrophy",
        calories: "3200 kcal",
        calorieNum: 3200,
        macros: "P: 180g | C: 400g | F: 80g",
        meals: [
            { name: "Besan Chilla + 4 Eggs", time: "Breakfast", kcal: 600 },
            { name: "Chicken Curry + Brown Rice", time: "Lunch", kcal: 900 },
            { name: "Whey Shake + Banana", time: "Snack", kcal: 300 },
            { name: "Mutton Roti + Dal", time: "Dinner", kcal: 1000 }
        ]
    },
    {
        id: 2,
        title: "Assassin's Lean",
        goal: "Fat Loss / Definition",
        calories: "2100 kcal",
        calorieNum: 2100,
        macros: "P: 200g | C: 150g | F: 60g",
        meals: [
            { name: "Greek Yogurt (Dahi) + Berries", time: "Breakfast", kcal: 350 },
            { name: "Tandoori Chicken + Salad", time: "Lunch", kcal: 500 },
            { name: "Roasted Chana + Nimbu Pani", time: "Snack", kcal: 200 },
            { name: "Grilled Fish + Sabzi", time: "Dinner", kcal: 650 }
        ]
    },
    {
        id: 3,
        title: "Shadow's Balance",
        goal: "Maintenance / Vitality",
        calories: "2600 kcal",
        calorieNum: 2600,
        macros: "P: 160g | C: 250g | F: 70g",
        meals: [
            { name: "Poha + Boiled Eggs", time: "Breakfast", kcal: 400 },
            { name: "Dal Chawal + Sabzi", time: "Lunch", kcal: 700 },
            { name: "Curd + Mixed Fruit", time: "Snack", kcal: 250 },
            { name: "Paneer Bhurji + Roti", time: "Dinner", kcal: 750 }
        ]
    }
];

export default function MealPlans() {
    const [activePlan, setActivePlan] = useState(null);
    const [loadingPlan, setLoadingPlan] = useState(null);
    const [openModal, setOpenModal] = useState(null);
    const navigate = useNavigate();

    const engagePlan = (plan) => {
        if (activePlan === plan.id) {
            setOpenModal(plan);
            return;
        }
        setLoadingPlan(plan.id);
        setTimeout(() => {
            setActivePlan(plan.id);
            setLoadingPlan(null);
            setOpenModal(plan);
        }, 800);
    };

    const logMeal = (plan, meal) => {
        setOpenModal(null);
        navigate('/log-meal', {
            state: {
                prefill: {
                    name: meal.name,
                    calories: meal.kcal,
                    mealType: meal.time.toLowerCase(),
                    notes: `Blueprint: ${plan.title} | ${plan.goal}`
                }
            }
        });
    };

    return (
        <>
            {/* Blueprint Modal */}
            {openModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                    <div className="bg-slate-900 border-2 border-emerald-500/40 rounded-2xl p-8 max-w-md w-full shadow-[0_0_40px_rgba(52,211,153,0.1)] relative">
                        <button onClick={() => setOpenModal(null)} className="absolute top-4 right-4 text-slate-600 hover:text-white transition-colors">
                            <X size={18} />
                        </button>

                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-3 bg-emerald-900/30 rounded-xl border border-emerald-500/30">
                                <Apple className="text-emerald-400" size={22} />
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Blueprint Engaged</p>
                                <h3 className="text-lg font-black text-white uppercase tracking-tight">{openModal.title}</h3>
                            </div>
                        </div>
                        <p className="text-xs font-bold text-slate-500 mb-6 ml-[52px]">{openModal.goal} · {openModal.calories} · {openModal.macros}</p>

                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Today's Meal Sequence — Click to Log</p>
                        <div className="space-y-2 mb-6">
                            {openModal.meals.map((meal, i) => (
                                <button
                                    key={i}
                                    onClick={() => logMeal(openModal, meal)}
                                    className="w-full flex items-center justify-between p-3 bg-slate-800/60 hover:bg-emerald-900/20 border border-slate-700/50 hover:border-emerald-500/50 rounded-xl transition-all group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-emerald-900/40 border border-emerald-500/30 flex items-center justify-center text-[9px] font-black text-emerald-400">{i + 1}</div>
                                        <div className="text-left">
                                            <p className="text-xs font-black text-white group-hover:text-emerald-400 transition-colors">{meal.name}</p>
                                            <p className="text-[9px] font-bold text-slate-500">{meal.time} · {meal.kcal} kcal</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={14} className="text-slate-600 group-hover:text-emerald-400 transition-colors" />
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setOpenModal(null)}
                            className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-400 font-black uppercase tracking-widest rounded-xl text-xs transition-all"
                        >
                            Close Blueprint
                        </button>
                        <p className="text-center text-[9px] text-slate-600 font-bold uppercase tracking-widest mt-3">
                            Click a meal to open Log Meal pre-filled
                        </p>
                    </div>
                </div>
            )}

            <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl overflow-hidden shadow-2xl h-full flex flex-col">
                <div className="bg-slate-800/50 p-6 border-b border-slate-800 flex items-center justify-between">
                    <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                        <Apple className="text-emerald-400" size={18} /> Resource Blueprints
                    </h3>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Nutrition Strategy</span>
                </div>

                <div className="p-6 space-y-4 overflow-y-auto max-h-[400px]">
                    {MEAL_PLANS.map((plan) => (
                        <div key={plan.id} className={`group border rounded-xl p-4 transition-all relative ${activePlan === plan.id ? 'bg-emerald-900/5 border-emerald-500/40' : 'bg-slate-800/30 border-slate-700/50 hover:border-emerald-500/50'}`}>
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-black text-white text-xs uppercase tracking-tight group-hover:text-emerald-400 transition-colors">{plan.title}</h4>
                                <span className="text-[8px] font-black text-slate-500 uppercase border border-slate-700 px-2 py-0.5 rounded">{plan.goal}</span>
                            </div>

                            <div className="flex gap-4 mb-4">
                                <div className="flex flex-col">
                                    <span className="text-[8px] font-black text-slate-600 uppercase">Energy</span>
                                    <span className="text-[10px] font-black text-emerald-400">{plan.calories}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[8px] font-black text-slate-600 uppercase">Macro Matrix</span>
                                    <span className="text-[10px] font-bold text-slate-400">{plan.macros}</span>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <span className="text-[8px] font-black text-slate-600 uppercase block mb-1">Recommended Sequence</span>
                                {plan.meals.map((meal, i) => (
                                    <div key={i} className="text-[9px] font-bold text-slate-500 flex items-center gap-2">
                                        <Coffee size={10} className="text-slate-700" />
                                        {meal.name}
                                    </div>
                                ))}
                            </div>

                            {loadingPlan === plan.id ? (
                                <button className="mt-4 w-full py-2 bg-slate-800 text-[10px] font-black text-slate-400 border border-slate-700 rounded-lg transition-all uppercase tracking-widest flex items-center justify-center gap-2 cursor-wait">
                                    <Loader2 size={14} className="animate-spin text-emerald-500" /> INITIALIZING...
                                </button>
                            ) : activePlan === plan.id ? (
                                <button
                                    onClick={() => setOpenModal(plan)}
                                    className="mt-4 w-full py-2 bg-emerald-900/40 hover:bg-emerald-900/60 text-[10px] font-black text-emerald-400 border border-emerald-500/50 rounded-lg transition-all uppercase tracking-widest flex items-center justify-center gap-2"
                                >
                                    <CheckCircle size={14} /> BLUEPRINT ENGAGED — VIEW MEALS
                                </button>
                            ) : (
                                <button
                                    onClick={() => engagePlan(plan)}
                                    className="mt-4 w-full py-2 bg-slate-800 hover:bg-emerald-900/30 text-[10px] font-black text-slate-400 hover:text-emerald-400 border border-slate-700 rounded-lg transition-all uppercase tracking-widest"
                                >
                                    Initialize Blueprint
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
