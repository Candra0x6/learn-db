import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TerminalSquare, ArrowRight, Play, Database } from 'lucide-react';

export default function SQLBasics({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [activeQuery, setActiveQuery] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState('');

  const queries = [
    {
      id: 'select',
      title: 'SELECT',
      desc: 'Retrieve data from a database table.',
      code: 'SELECT * FROM Students;',
      result: [
        { id: 1, name: 'Alice', age: 20 },
        { id: 2, name: 'Bob', age: 22 },
        { id: 3, name: 'Charlie', age: 21 },
      ]
    },
    {
      id: 'where',
      title: 'WHERE',
      desc: 'Filter records based on a condition.',
      code: 'SELECT * FROM Students\nWHERE age > 20;',
      result: [
        { id: 2, name: 'Bob', age: 22 },
        { id: 3, name: 'Charlie', age: 21 },
      ]
    },
    {
      id: 'insert',
      title: 'INSERT',
      desc: 'Add new records to a table.',
      code: "INSERT INTO Students (name, age)\nVALUES ('David', 23);",
      result: [
        { id: 1, name: 'Alice', age: 20 },
        { id: 2, name: 'Bob', age: 22 },
        { id: 3, name: 'Charlie', age: 21 },
        { id: 4, name: 'David', age: 23, isNew: true },
      ]
    }
  ];

  const currentQuery = queries[activeQuery];

  useEffect(() => {
    setIsTyping(true);
    setTypedText('');
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(currentQuery.code.substring(0, i + 1));
      i++;
      if (i >= currentQuery.code.length) {
        clearInterval(interval);
        setTimeout(() => setIsTyping(false), 500);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [activeQuery]);

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4 flex items-center gap-3">
          <TerminalSquare className="text-indigo-600" size={40} />
          SQL Basics
        </h1>
        <p className="text-lg text-slate-600">Learn the fundamental commands to interact with a database.</p>
      </header>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: Interactive Terminal */}
        <div className="space-y-6">
          
          {/* Terminal Window */}
          <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
            <div className="bg-slate-800 px-4 py-3 flex items-center gap-2 border-b border-slate-700">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-4 text-xs font-mono text-slate-400">sql-terminal</span>
            </div>
            <div className="p-6 font-mono text-sm sm:text-base text-slate-300 min-h-[120px]">
              <div className="flex">
                <span className="text-indigo-400 mr-2">&gt;</span>
                <span className="whitespace-pre-wrap">
                  {typedText}
                  <span className="animate-pulse inline-block w-2 h-5 bg-slate-400 ml-1 align-middle" />
                </span>
              </div>
            </div>
          </div>

          {/* Result Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[250px]">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold text-slate-700 text-sm">
                <Database size={16} className="text-indigo-500" /> Result
              </div>
              {isTyping ? (
                <span className="text-xs text-slate-400 animate-pulse">Running query...</span>
              ) : (
                <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                  <Play size={12} /> Success
                </span>
              )}
            </div>
            
            <div className="p-4">
              {!isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full overflow-x-auto"
                >
                  <table className="w-full text-left text-sm text-slate-600">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-2 font-medium">ID</th>
                        <th className="px-4 py-2 font-medium">Name</th>
                        <th className="px-4 py-2 font-medium">Age</th>
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence>
                        {currentQuery.result.map((row, i) => (
                          <motion.tr 
                            key={row.id}
                            initial={row.isNew ? { opacity: 0, backgroundColor: '#f0fdf4' } : { opacity: 0 }}
                            animate={{ opacity: 1, backgroundColor: row.isNew ? '#f0fdf4' : 'transparent' }}
                            transition={{ delay: i * 0.1 }}
                            className={`border-b border-slate-100 ${row.isNew ? 'bg-green-50' : ''}`}
                          >
                            <td className="px-4 py-3 font-mono text-indigo-600">{row.id}</td>
                            <td className="px-4 py-3 font-medium text-slate-800">{row.name}</td>
                            <td className="px-4 py-3">{row.age}</td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </motion.div>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Explanation Content */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">SQL Commands</h2>
          
          <div className="space-y-4">
            {queries.map((q, idx) => (
              <div 
                key={q.id}
                onClick={() => setActiveQuery(idx)}
                className={`
                  p-5 rounded-2xl border-2 transition-all cursor-pointer
                  ${activeQuery === idx ? 'border-indigo-500 bg-indigo-50 shadow-md' : 'border-slate-100 bg-white hover:border-slate-300'}
                `}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className={`text-lg font-bold font-mono ${activeQuery === idx ? 'text-indigo-700' : 'text-slate-700'}`}>
                    {q.title}
                  </h3>
                  {activeQuery === idx && (
                    <motion.div layoutId="activeIndicator" className="w-2 h-2 rounded-full bg-indigo-500" />
                  )}
                </div>
                <p className={`text-sm ${activeQuery === idx ? 'text-indigo-900/80' : 'text-slate-500'}`}>
                  {q.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-8 flex justify-end">
            <button 
              onClick={() => onNavigate('advanced')}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              Next: Advanced SQL <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
