import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, ArrowRight, Merge, Group, Calculator } from 'lucide-react';

export default function AdvancedSQL({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [activeTab, setActiveTab] = useState<'join' | 'groupby' | 'aggregate'>('join');

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4 flex items-center gap-3">
          <Layers className="text-indigo-600" size={40} />
          Advanced SQL
        </h1>
        <p className="text-lg text-slate-600">Combine tables, group data, and perform calculations.</p>
      </header>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: Interactive Animation */}
        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 relative min-h-[500px] flex flex-col justify-center items-center overflow-hidden">
          
          <AnimatePresence mode="wait">
            {activeTab === 'join' && (
              <motion.div key="join" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
                <h3 className="text-xl font-bold mb-8 text-slate-800 text-center flex items-center justify-center gap-2">
                  <Merge className="text-indigo-500" /> INNER JOIN
                </h3>
                
                <div className="flex justify-center items-center gap-4 mb-8">
                  {/* Table A */}
                  <motion.div 
                    initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                    className="w-32 bg-indigo-50 border-2 border-indigo-200 rounded-lg overflow-hidden shadow-sm"
                  >
                    <div className="bg-indigo-100 p-2 text-center font-bold text-indigo-800 text-xs">Users</div>
                    <div className="p-2 border-b border-indigo-100 text-xs text-center font-mono bg-indigo-200/50">ID: 1</div>
                    <div className="p-2 text-xs text-center font-mono">ID: 2</div>
                  </motion.div>

                  <motion.div 
                    animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="text-slate-300"
                  >
                    <Merge size={32} />
                  </motion.div>

                  {/* Table B */}
                  <motion.div 
                    initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                    className="w-32 bg-purple-50 border-2 border-purple-200 rounded-lg overflow-hidden shadow-sm"
                  >
                    <div className="bg-purple-100 p-2 text-center font-bold text-purple-800 text-xs">Orders</div>
                    <div className="p-2 border-b border-purple-100 text-xs text-center font-mono bg-purple-200/50">UserID: 1</div>
                    <div className="p-2 text-xs text-center font-mono">UserID: 3</div>
                  </motion.div>
                </div>

                {/* Result */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
                  className="max-w-xs mx-auto bg-white border-2 border-green-200 rounded-xl overflow-hidden shadow-lg shadow-green-100"
                >
                  <div className="bg-green-50 p-2 text-center font-bold text-green-800 text-sm">Result (Match Found)</div>
                  <div className="flex justify-between p-3 text-sm font-mono bg-green-100/30">
                    <span className="text-indigo-700">User 1</span>
                    <span className="text-slate-400">↔</span>
                    <span className="text-purple-700">Order (UserID: 1)</span>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'groupby' && (
              <motion.div key="groupby" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
                <h3 className="text-xl font-bold mb-8 text-slate-800 text-center flex items-center justify-center gap-2">
                  <Group className="text-indigo-500" /> GROUP BY
                </h3>
                
                <div className="flex flex-col items-center gap-6">
                  {/* Raw Data */}
                  <div className="flex gap-2">
                    {['IT', 'HR', 'IT', 'Sales', 'HR', 'IT'].map((dept, i) => (
                      <motion.div 
                        key={i}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={`w-12 h-12 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-sm
                          ${dept === 'IT' ? 'bg-indigo-500' : dept === 'HR' ? 'bg-purple-500' : 'bg-amber-500'}`}
                      >
                        {dept}
                      </motion.div>
                    ))}
                  </div>

                  <ArrowRight className="text-slate-300 rotate-90" size={24} />

                  {/* Grouped Data */}
                  <div className="flex gap-6">
                    {[
                      { name: 'IT', count: 3, color: 'bg-indigo-500', border: 'border-indigo-200' },
                      { name: 'HR', count: 2, color: 'bg-purple-500', border: 'border-purple-200' },
                      { name: 'Sales', count: 1, color: 'bg-amber-500', border: 'border-amber-200' }
                    ].map((group, i) => (
                      <motion.div 
                        key={group.name}
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 + i * 0.2 }}
                        className={`p-4 rounded-xl border-2 ${group.border} bg-white shadow-md text-center min-w-[80px]`}
                      >
                        <div className={`w-3 h-3 rounded-full ${group.color} mx-auto mb-2`} />
                        <div className="font-bold text-slate-700">{group.name}</div>
                        <div className="text-2xl font-black text-slate-900 mt-1">{group.count}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'aggregate' && (
              <motion.div key="aggregate" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
                <h3 className="text-xl font-bold mb-8 text-slate-800 text-center flex items-center justify-center gap-2">
                  <Calculator className="text-indigo-500" /> Aggregate Functions
                </h3>
                
                <div className="flex flex-col items-center gap-8">
                  <div className="flex gap-3">
                    {[100, 250, 50, 400].map((val, i) => (
                      <motion.div 
                        key={i}
                        initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                        className="w-16 h-16 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center font-mono font-bold text-slate-700 shadow-sm"
                      >
                        ${val}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 w-full max-w-md">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 }} className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 text-center">
                      <div className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-1">SUM()</div>
                      <div className="text-2xl font-black text-indigo-700">$800</div>
                    </motion.div>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 }} className="bg-purple-50 p-4 rounded-xl border border-purple-100 text-center">
                      <div className="text-xs font-bold text-purple-500 uppercase tracking-wider mb-1">AVG()</div>
                      <div className="text-2xl font-black text-purple-700">$200</div>
                    </motion.div>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.0 }} className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-center">
                      <div className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-1">COUNT()</div>
                      <div className="text-2xl font-black text-amber-700">4</div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Explanation Content */}
        <div className="space-y-6">
          
          <div className="flex flex-col gap-3">
            {[
              { id: 'join', icon: Merge, title: 'JOINs', desc: 'Combine rows from two or more tables based on a related column.' },
              { id: 'groupby', icon: Group, title: 'GROUP BY', desc: 'Group rows that have the same values into summary rows.' },
              { id: 'aggregate', icon: Calculator, title: 'Aggregates', desc: 'Perform a calculation on a set of values and return a single value.' }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`
                    p-5 rounded-2xl border-2 transition-all text-left flex gap-4 items-center
                    ${isActive ? 'border-indigo-500 bg-indigo-50 shadow-md' : 'border-slate-100 bg-white hover:border-slate-300'}
                  `}
                >
                  <div className={`p-3 rounded-xl ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${isActive ? 'text-indigo-900' : 'text-slate-800'}`}>{tab.title}</h3>
                    <p className={`text-sm mt-1 ${isActive ? 'text-indigo-700' : 'text-slate-500'}`}>{tab.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-8 flex justify-end">
            <button 
              onClick={() => onNavigate('practice')}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              Next: Interactive Practice <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
