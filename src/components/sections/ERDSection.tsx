import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Network, ArrowRight, Key, Box, Link } from 'lucide-react';

export default function ERDSection({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [activeElement, setActiveElement] = useState<'entity' | 'attribute' | 'relationship' | 'cardinality' | null>(null);

  const elements = [
    { id: 'entity', title: 'Entity', icon: Box, desc: 'A real-world object or concept (e.g., Student, Course).' },
    { id: 'attribute', title: 'Attribute', icon: Key, desc: 'A property or characteristic of an entity (e.g., Name, Age).' },
    { id: 'relationship', title: 'Relationship', icon: Link, desc: 'How entities are connected to each other.' },
    { id: 'cardinality', title: 'Cardinality', icon: Network, desc: 'Defines the numerical attributes of the relationship (1:1, 1:N, M:N).' },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4 flex items-center gap-3">
          <Network className="text-indigo-600" size={40} />
          Entity Relationship Diagram (ERD)
        </h1>
        <p className="text-lg text-slate-600">Learn how to visually model your database structure before creating tables.</p>
      </header>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: Interactive Diagram */}
        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 relative min-h-[500px] flex flex-col justify-center items-center overflow-hidden">
          
          <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
            
            {/* Student Entity */}
            <motion.div 
              className={`absolute left-10 top-1/2 -translate-y-1/2 p-6 rounded-xl border-2 transition-colors z-10 bg-white
                ${activeElement === 'entity' ? 'border-indigo-500 shadow-lg shadow-indigo-100' : 'border-slate-300'}`}
              animate={{ scale: activeElement === 'entity' ? 1.05 : 1 }}
            >
              <h3 className="text-xl font-bold text-slate-800 text-center">Student</h3>
              
              {/* Attributes */}
              <AnimatePresence>
                {(activeElement === 'attribute' || activeElement === 'entity') && (
                  <motion.div 
                    key="student-attrs"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-2"
                  >
                    <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 p-2 rounded">
                      <Key size={14} className="text-amber-500" /> <span className="underline font-medium">StudentID</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 p-2 rounded">
                      <span className="w-3" /> Name
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Course Entity */}
            <motion.div 
              className={`absolute right-10 top-1/2 -translate-y-1/2 p-6 rounded-xl border-2 transition-colors z-10 bg-white
                ${activeElement === 'entity' ? 'border-indigo-500 shadow-lg shadow-indigo-100' : 'border-slate-300'}`}
              animate={{ scale: activeElement === 'entity' ? 1.05 : 1 }}
            >
              <h3 className="text-xl font-bold text-slate-800 text-center">Course</h3>
              
              {/* Attributes */}
              <AnimatePresence>
                {(activeElement === 'attribute' || activeElement === 'entity') && (
                  <motion.div 
                    key="course-attrs"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-2"
                  >
                    <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 p-2 rounded">
                      <Key size={14} className="text-amber-500" /> <span className="underline font-medium">CourseID</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 p-2 rounded">
                      <span className="w-3" /> Title
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Relationship Diamond */}
            <AnimatePresence>
              {(activeElement === 'relationship' || activeElement === 'cardinality') && (
                <motion.div 
                  key="diamond"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rotate-45 border-2 flex items-center justify-center z-10 bg-white transition-colors
                    ${activeElement === 'relationship' ? 'border-purple-500 shadow-lg shadow-purple-100' : 'border-slate-300'}`}
                >
                  <span className="-rotate-45 font-semibold text-slate-700">Enrolls</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <AnimatePresence>
                {(activeElement === 'relationship' || activeElement === 'cardinality') && (
                  <motion.g key="lines" exit={{ opacity: 0 }}>
                    <motion.line 
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }}
                      x1="30%" y1="50%" x2="45%" y2="50%" stroke="currentColor" strokeWidth="2" className="text-slate-400" 
                    />
                    <motion.line 
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
                      x1="55%" y1="50%" x2="70%" y2="50%" stroke="currentColor" strokeWidth="2" className="text-slate-400" 
                    />
                  </motion.g>
                )}
              </AnimatePresence>
            </svg>

            {/* Cardinality Markers */}
            <AnimatePresence>
              {activeElement === 'cardinality' && (
                <motion.div key="cardinality" exit={{ opacity: 0 }}>
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="absolute left-[32%] top-[42%] font-bold text-purple-600 bg-white px-1">
                    M
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="absolute right-[32%] top-[42%] font-bold text-purple-600 bg-white px-1">
                    N
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-sm text-purple-600 bg-purple-50 px-4 py-2 rounded-full border border-purple-200">
                    Many-to-Many Relationship
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          <p className="absolute bottom-4 text-sm text-slate-400">Hover over the concepts on the right to animate</p>
        </div>

        {/* Right Column: Explanation Content */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">ERD Components</h2>
          
          <div className="space-y-3">
            {elements.map((el) => {
              const Icon = el.icon;
              const isActive = activeElement === el.id;
              
              return (
                <div 
                  key={el.id}
                  onMouseEnter={() => setActiveElement(el.id as any)}
                  onMouseLeave={() => setActiveElement(null)}
                  className={`
                    p-5 rounded-2xl border-2 transition-all cursor-pointer flex gap-4 items-start
                    ${isActive ? 'border-indigo-500 bg-indigo-50 shadow-md' : 'border-slate-100 bg-white hover:border-slate-300'}
                  `}
                >
                  <div className={`p-3 rounded-xl ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${isActive ? 'text-indigo-900' : 'text-slate-800'}`}>{el.title}</h3>
                    <p className={`text-sm mt-1 ${isActive ? 'text-indigo-700' : 'text-slate-500'}`}>{el.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-8 flex justify-end">
            <button 
              onClick={() => onNavigate('tables')}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              Next: Tables & Relationships <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
