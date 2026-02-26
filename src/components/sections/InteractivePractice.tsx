import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, Play, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';

export default function InteractivePractice() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [shake, setShake] = useState(false);

  const expectedQuery = 'SELECT * FROM Users WHERE age > 18;';

  const handleRun = () => {
    const normalizedInput = query.trim().toLowerCase().replace(/\s+/g, ' ');
    const normalizedExpected = expectedQuery.trim().toLowerCase().replace(/\s+/g, ' ');

    if (normalizedInput === normalizedExpected || normalizedInput === normalizedExpected.replace(';', '')) {
      setStatus('success');
      setShake(false);
    } else {
      setStatus('error');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4 flex items-center justify-center gap-3">
          <Gamepad2 className="text-indigo-600" size={40} />
          Interactive Practice
        </h1>
        <p className="text-lg text-slate-600">Test your knowledge. Write a query to solve the problem below.</p>
      </header>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        
        {/* Problem Statement */}
        <div className="bg-indigo-50 p-6 border-b border-indigo-100">
          <h2 className="text-lg font-bold text-indigo-900 mb-2">Task:</h2>
          <p className="text-indigo-700">
            Write a query to retrieve <strong>all columns</strong> from the <strong>Users</strong> table where the <strong>age is greater than 18</strong>.
          </p>
        </div>

        <div className="p-6 grid md:grid-cols-2 gap-8">
          
          {/* Editor */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-700">SQL Editor</h3>
              <button 
                onClick={() => { setQuery(''); setStatus('idle'); }}
                className="text-xs text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition-colors"
              >
                <RefreshCw size={14} /> Reset
              </button>
            </div>
            
            <motion.div 
              animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <textarea
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (status !== 'idle') setStatus('idle');
                }}
                placeholder="Type your SQL query here..."
                className={`
                  w-full h-40 p-4 bg-slate-900 text-slate-100 font-mono text-sm rounded-xl border-2 focus:outline-none transition-colors resize-none
                  ${status === 'error' ? 'border-red-500 focus:border-red-500' : status === 'success' ? 'border-green-500 focus:border-green-500' : 'border-slate-800 focus:border-indigo-500'}
                `}
                spellCheck={false}
              />
              
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute top-4 right-4 text-green-500 bg-slate-900 rounded-full"
                  >
                    <CheckCircle2 size={24} />
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute top-4 right-4 text-red-500 bg-slate-900 rounded-full"
                  >
                    <XCircle size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <button
              onClick={handleRun}
              disabled={!query.trim() || status === 'success'}
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md shadow-indigo-200"
            >
              <Play size={18} /> Run Query
            </button>
          </div>

          {/* Result Area */}
          <div>
            <h3 className="font-bold text-slate-700 mb-4">Result</h3>
            
            <div className="bg-slate-50 rounded-xl border border-slate-200 h-40 flex items-center justify-center overflow-hidden relative">
              <AnimatePresence mode="wait">
                {status === 'idle' && (
                  <motion.p key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-slate-400 text-sm">
                    Run a query to see results
                  </motion.p>
                )}
                
                {status === 'error' && (
                  <motion.div key="error" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center text-red-500 p-4">
                    <XCircle size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="font-medium">Syntax Error or Incorrect Logic</p>
                    <p className="text-xs mt-1 opacity-70">Check your SELECT, FROM, and WHERE clauses.</p>
                  </motion.div>
                )}

                {status === 'success' && (
                  <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="w-full h-full">
                    <table className="w-full text-left text-sm text-slate-600">
                      <thead className="text-xs text-slate-500 uppercase bg-green-100 border-b border-green-200">
                        <tr>
                          <th className="px-4 py-2 font-medium">ID</th>
                          <th className="px-4 py-2 font-medium">Name</th>
                          <th className="px-4 py-2 font-medium">Age</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { id: 1, name: 'Alice', age: 20 },
                          { id: 3, name: 'Charlie', age: 21 },
                          { id: 4, name: 'David', age: 25 },
                        ].map((row, i) => (
                          <motion.tr 
                            key={row.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="border-b border-slate-100 bg-white"
                          >
                            <td className="px-4 py-2 font-mono text-indigo-600">{row.id}</td>
                            <td className="px-4 py-2 font-medium text-slate-800">{row.name}</td>
                            <td className="px-4 py-2 text-green-600 font-bold">{row.age}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {status === 'success' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-center">
                <h4 className="font-bold text-lg mb-1 flex items-center justify-center gap-2">
                  <CheckCircle2 /> Excellent Job!
                </h4>
                <p className="text-sm">You've successfully filtered the data using the WHERE clause.</p>
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
