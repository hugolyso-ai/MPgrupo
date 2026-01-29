import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';

interface SimulatorButtonProps {
  onClick: () => void;
}

const SimulatorButton = ({ onClick }: SimulatorButtonProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      onClick={onClick}
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 px-6 py-4 bg-gold text-primary-foreground rounded-l-2xl shadow-2xl hover:bg-gold-light transition-all duration-300 gold-glow group"
      style={{ writingMode: 'vertical-rl' }}
    >
      <div className="flex items-center gap-3">
        <Calculator className="w-6 h-6 group-hover:scale-110 transition-transform" style={{ writingMode: 'horizontal-tb' }} />
        <span className="font-body font-semibold text-lg tracking-wider">
          Simule aqui a sua poupança!
        </span>
      </div>
    </motion.button>
  );
};

export default SimulatorButton;
