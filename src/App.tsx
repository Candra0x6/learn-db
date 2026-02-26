import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Database, 
  Network, 
  TableProperties, 
  TerminalSquare, 
  Layers, 
  Gamepad2,
  Menu,
  X
} from 'lucide-react';

import HomeSection from './components/sections/HomeSection';
import DatabaseBasics from './components/sections/DatabaseBasics';
import ERDSection from './components/sections/ERDSection';
import TablesRelationships from './components/sections/TablesRelationships';
import SQLBasics from './components/sections/SQLBasics';
import AdvancedSQL from './components/sections/AdvancedSQL';
import InteractivePractice from './components/sections/InteractivePractice';

const SECTIONS = [
  { id: 'home', title: 'Home', icon: Home, component: HomeSection },
  { id: 'basics', title: 'Database Basics', icon: Database, component: DatabaseBasics },
  { id: 'erd', title: 'ERD', icon: Network, component: ERDSection },
  { id: 'tables', title: 'Tables & Relationships', icon: TableProperties, component: TablesRelationships },
  { id: 'sql', title: 'SQL Basics', icon: TerminalSquare, component: SQLBasics },
  { id: 'advanced', title: 'Advanced SQL', icon: Layers, component: AdvancedSQL },
  { id: 'practice', title: 'Interactive Practice', icon: Gamepad2, component: InteractivePractice },
];

export default function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const ActiveComponent = SECTIONS.find(s => s.id === currentSection)?.component || HomeSection;

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-full shadow-md text-indigo-600"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Navigation */}
      <nav className={`
        fixed md:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 shadow-sm transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
            <Database className="text-indigo-500" />
            DBLearn
          </h1>
          <p className="text-xs text-slate-500 mt-1">Visual Database Systems</p>
        </div>
        
        <div className="px-4 space-y-1">
          {SECTIONS.map((section) => {
            const Icon = section.icon;
            const isActive = currentSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => {
                  setCurrentSection(section.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}
                `}
              >
                <Icon size={18} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
                {section.title}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-y-auto overflow-x-hidden bg-slate-50/50">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="min-h-full p-6 md:p-12 max-w-6xl mx-auto"
          >
            <ActiveComponent onNavigate={setCurrentSection} />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
