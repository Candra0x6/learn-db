import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Database, ArrowRight, CheckCircle2, Server, ShieldCheck, Zap } from 'lucide-react';

export default function DatabaseBasics({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4 flex items-center gap-3">
          <Database className="text-indigo-600" size={40} />
          Database Basics
        </h1>
        <p className="text-lg text-slate-600">Understand what a database is and why we need Database Management Systems (DBMS).</p>
      </header>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: Interactive Animation */}
        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 relative min-h-[400px] flex flex-col justify-center items-center overflow-hidden">
          
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                <h3 className="text-xl font-semibold mb-8 text-slate-700">The Problem: Scattered Files</h3>
                <div className="flex flex-wrap justify-center gap-4 max-w-xs">
                  {[
                    { id: 1, rot: -5 },
                    { id: 2, rot: 8 },
                    { id: 3, rot: -12 },
                    { id: 4, rot: 4 },
                    { id: 5, rot: -8 }
                  ].map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ y: -20, opacity: 0, rotate: -10 }}
                      animate={{ y: 0, opacity: 1, rotate: item.rot }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 bg-slate-100 rounded-lg shadow-sm border border-slate-200"
                    >
                      <FileText className="text-slate-500" />
                    </motion.div>
                  ))}
                </div>
                <p className="mt-8 text-sm text-slate-500">Hard to search, duplicate data, no security.</p>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center w-full">
                <h3 className="text-xl font-semibold mb-8 text-slate-700">The Solution: DBMS</h3>
                <div className="flex items-center justify-between w-full px-8">
                  <div className="flex flex-col gap-2">
                    {[1, 2, 3].map(i => (
                      <motion.div key={i} layoutId={`file-${i}`} className="p-2 bg-slate-100 rounded border border-slate-200">
                        <FileText size={20} className="text-slate-500" />
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} 
                    className="flex flex-col items-center text-indigo-600"
                  >
                    <ArrowRight size={32} className="animate-pulse" />
                    <span className="text-xs font-bold mt-2">DBMS</span>
                  </motion.div>

                  <motion.div 
                    initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                    className="p-6 bg-indigo-50 rounded-2xl border-2 border-indigo-200 text-indigo-600"
                  >
                    <Database size={48} />
                  </motion.div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
                <h3 className="text-xl font-semibold mb-6 text-center text-slate-700">Structured Data</h3>
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200 p-3 font-semibold text-sm text-slate-600">
                    <div>ID</div>
                    <div>Name</div>
                    <div>Role</div>
                  </div>
                  {[1, 2, 3].map((row, i) => (
                    <motion.div 
                      key={row}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="grid grid-cols-3 p-3 border-b border-slate-100 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <div className="font-mono text-indigo-600">{row}</div>
                      <div>User {row}</div>
                      <div>Admin</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                <div className="inline-flex p-4 bg-green-100 text-green-600 rounded-full mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-800">Ready for the Next Level</h3>
                <p className="text-slate-600 mb-8">You now understand the core purpose of a database.</p>
                <button 
                  onClick={() => onNavigate('erd')}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 mx-auto"
                >
                  Learn ER Diagrams <ArrowRight size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4">
            <button 
              onClick={prevStep} disabled={step === 0}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 text-slate-600 disabled:opacity-50 hover:bg-slate-200 transition-colors"
            >
              Previous
            </button>
            <div className="flex items-center gap-2">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === step ? 'bg-indigo-600' : 'bg-slate-300'}`} />
              ))}
            </div>
            <button 
              onClick={nextStep} disabled={step === 3}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-100 text-indigo-700 disabled:opacity-50 hover:bg-indigo-200 transition-colors"
            >
              Next
            </button>
          </div>
        </div>

        {/* Right Column: Explanation Content */}
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">What is a Database?</h2>
            <p className="text-slate-600 leading-relaxed">
              A database is an organized collection of structured information, or data, typically stored electronically in a computer system. It allows data to be easily accessed, managed, and updated.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">What is a DBMS?</h2>
            <p className="text-slate-600 leading-relaxed">
              A Database Management System (DBMS) is software that interacts with end-users, applications, and the database itself to capture and analyze the data. Examples include MySQL, PostgreSQL, and Oracle.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Advantages of DBMS</h2>
            <ul className="space-y-4">
              {[
                { icon: ShieldCheck, title: 'Data Security', desc: 'Protects data from unauthorized access.' },
                { icon: Server, title: 'Data Consistency', desc: 'Ensures data is accurate and reliable across the system.' },
                { icon: Zap, title: 'Efficient Access', desc: 'Quickly retrieve and update data using queries.' }
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.5 }}
                  className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm"
                >
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg h-fit">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{item.title}</h4>
                    <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
