import { motion } from 'motion/react';
import { Database, Server, HardDrive, ArrowRight, PlayCircle } from 'lucide-react';

export default function HomeSection({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 text-indigo-200"
        >
          <Database size={64} />
        </motion.div>
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 right-10 text-purple-200"
        >
          <Server size={80} />
        </motion.div>
        <motion.div 
          animate={{ 
            x: [0, 20, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-40 right-32 text-blue-200"
        >
          <HardDrive size={48} />
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm mb-8">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
          </span>
          Interactive Learning Experience
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
          Learn Database Systems <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Visually</span>
        </h1>
        
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Master database fundamentals through smooth animations, interactive diagrams, and visual explanations. Perfect for beginners.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('basics')}
            className="group flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-semibold text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors w-full sm:w-auto justify-center"
          >
            Start Learning
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('practice')}
            className="flex items-center gap-2 px-8 py-4 bg-white text-slate-700 border-2 border-slate-200 rounded-2xl font-semibold text-lg hover:border-indigo-200 hover:bg-indigo-50 transition-colors w-full sm:w-auto justify-center"
          >
            <PlayCircle size={20} className="text-indigo-500" />
            Try Practice
          </motion.button>
        </div>
      </motion.div>

      {/* Animated Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ opacity: 0.1 }}>
        <motion.path
          d="M 100 200 Q 300 100 500 300 T 900 200"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="10 10"
          animate={{ strokeDashoffset: [0, -100] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M 200 500 Q 400 600 600 400 T 1000 500"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="10 10"
          animate={{ strokeDashoffset: [0, 100] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
}
