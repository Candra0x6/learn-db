import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TableProperties, ArrowRight, Key, Link, Play, Pause } from 'lucide-react';

export default function TablesRelationships({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setStep(s => (s >= 2 ? 0 : s + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const nextStep = () => {
    setIsPlaying(false);
    setStep(s => Math.min(s + 1, 2));
  };
  const prevStep = () => {
    setIsPlaying(false);
    setStep(s => Math.max(s - 1, 0));
  };

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4 flex items-center gap-3">
          <TableProperties className="text-indigo-600" size={40} />
          Tables & Relationships
        </h1>
        <p className="text-lg text-slate-600">See how entities from an ERD translate into actual database tables.</p>
      </header>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: Interactive Animation */}
        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 relative min-h-[500px] flex flex-col justify-center items-center overflow-hidden">
          
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-md">
                <h3 className="text-xl font-bold mb-6 text-slate-800 text-center">1. The Student Table</h3>
                
                <div className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-slate-100 p-3 border-b-2 border-slate-200 font-bold text-slate-700 flex items-center gap-2">
                    <TableProperties size={18} /> Students
                  </div>
                  <div className="grid grid-cols-2 bg-slate-50 border-b border-slate-200 p-3 font-semibold text-sm text-slate-600">
                    <div className="flex items-center gap-1 text-amber-600"><Key size={14} /> StudentID (PK)</div>
                    <div>Name</div>
                  </div>
                  {[
                    { id: 101, name: 'Alice' },
                    { id: 102, name: 'Bob' },
                  ].map((row, i) => (
                    <motion.div 
                      key={row.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="grid grid-cols-2 p-3 border-b border-slate-100 text-sm text-slate-700"
                    >
                      <div className="font-mono text-amber-600 font-medium">{row.id}</div>
                      <div>{row.name}</div>
                    </motion.div>
                  ))}
                </div>
                <p className="mt-6 text-sm text-slate-500 text-center">The Primary Key (PK) uniquely identifies each row.</p>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-md">
                <h3 className="text-xl font-bold mb-6 text-slate-800 text-center">2. The Course Table</h3>
                
                <div className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-slate-100 p-3 border-b-2 border-slate-200 font-bold text-slate-700 flex items-center gap-2">
                    <TableProperties size={18} /> Courses
                  </div>
                  <div className="grid grid-cols-2 bg-slate-50 border-b border-slate-200 p-3 font-semibold text-sm text-slate-600">
                    <div className="flex items-center gap-1 text-amber-600"><Key size={14} /> CourseID (PK)</div>
                    <div>Title</div>
                  </div>
                  {[
                    { id: 'CS101', title: 'Intro to CS' },
                    { id: 'DB201', title: 'Databases' },
                  ].map((row, i) => (
                    <motion.div 
                      key={row.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="grid grid-cols-2 p-3 border-b border-slate-100 text-sm text-slate-700"
                    >
                      <div className="font-mono text-amber-600 font-medium">{row.id}</div>
                      <div>{row.title}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full relative">
                <h3 className="text-xl font-bold mb-6 text-slate-800 text-center">3. The Junction Table (M:N)</h3>
                
                <div className="flex flex-col gap-6 items-center">
                  
                  {/* Small Student Table */}
                  <div className="w-48 bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm text-xs opacity-50">
                    <div className="bg-slate-100 p-2 font-bold text-slate-700">Students</div>
                    <div className="p-2 border-b border-slate-100 font-mono text-amber-600">101 | Alice</div>
                  </div>

                  {/* Enrollments Table */}
                  <motion.div 
                    initial={{ scale: 0.9 }} animate={{ scale: 1 }}
                    className="w-full max-w-md bg-white border-2 border-indigo-200 rounded-xl overflow-hidden shadow-lg shadow-indigo-100 z-10"
                  >
                    <div className="bg-indigo-50 p-3 border-b-2 border-indigo-100 font-bold text-indigo-800 flex items-center gap-2">
                      <Link size={18} /> Enrollments
                    </div>
                    <div className="grid grid-cols-2 bg-slate-50 border-b border-slate-200 p-3 font-semibold text-sm text-slate-600">
                      <div className="flex items-center gap-1 text-purple-600"><Key size={14} /> StudentID (FK)</div>
                      <div className="flex items-center gap-1 text-purple-600"><Key size={14} /> CourseID (FK)</div>
                    </div>
                    {[
                      { sid: 101, cid: 'CS101' },
                      { sid: 101, cid: 'DB201' },
                      { sid: 102, cid: 'CS101' },
                    ].map((row, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.3 }}
                        className="grid grid-cols-2 p-3 border-b border-slate-100 text-sm text-slate-700"
                      >
                        <div className="font-mono text-purple-600 font-medium">{row.sid}</div>
                        <div className="font-mono text-purple-600 font-medium">{row.cid}</div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Small Course Table */}
                  <div className="w-48 bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm text-xs opacity-50">
                    <div className="bg-slate-100 p-2 font-bold text-slate-700">Courses</div>
                    <div className="p-2 border-b border-slate-100 font-mono text-amber-600">CS101 | Intro</div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-3">
            <button 
              onClick={prevStep} disabled={step === 0}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 text-slate-600 disabled:opacity-50 hover:bg-slate-200 transition-colors"
            >
              Previous
            </button>
            
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors mx-1"
              title={isPlaying ? "Pause Animation" : "Play Animation"}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
            </button>

            <div className="flex items-center gap-2 mx-1">
              {[0, 1, 2].map(i => (
                <button 
                  key={i} 
                  onClick={() => { setIsPlaying(false); setStep(i); }}
                  className={`w-2 h-2 rounded-full transition-colors ${i === step ? 'bg-indigo-600' : 'bg-slate-300 hover:bg-slate-400'}`} 
                />
              ))}
            </div>
            <button 
              onClick={nextStep} disabled={step === 2}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-100 text-indigo-700 disabled:opacity-50 hover:bg-indigo-200 transition-colors"
            >
              Next
            </button>
          </div>
        </div>

        {/* Right Column: Explanation Content */}
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Primary Key (PK)</h2>
            <p className="text-slate-600 leading-relaxed">
              A Primary Key is a specific choice of a minimal set of attributes (columns) that uniquely specify a tuple (row) in a relation (table). It cannot contain NULL values.
            </p>
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm flex gap-3">
              <Key className="shrink-0" />
              <p>Example: <strong>StudentID</strong> uniquely identifies a student. No two students can have the same ID.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Foreign Key (FK)</h2>
            <p className="text-slate-600 leading-relaxed">
              A Foreign Key is a column or group of columns in a relational database table that provides a link between data in two tables. It acts as a cross-reference between tables because it references the primary key of another table.
            </p>
            <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-xl text-purple-800 text-sm flex gap-3">
              <Link className="shrink-0" />
              <p>Example: <strong>StudentID</strong> in the Enrollments table points back to the Student table.</p>
            </div>
          </section>

          <div className="pt-4 flex justify-end">
            <button 
              onClick={() => onNavigate('sql')}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              Next: SQL Basics <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
