import { motion } from 'framer-motion';
import { Calculator, TrendingDown, Zap, ArrowRight } from 'lucide-react';

interface SimulatorCTAProps {
  onClick: () => void;
  variant?: 'default' | 'compact';
}

const SimulatorCTA = ({ onClick, variant = 'default' }: SimulatorCTAProps) => {
  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-8"
      >
        <div className="container mx-auto px-6">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gold/10 via-gold/5 to-transparent border border-gold/20 p-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative flex items-center justify-between gap-6 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Calculator className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground mb-1">
                    Descubra a sua <span className="text-gold">poupança</span>
                  </h3>
                  <p className="font-body text-sm text-cream-muted">
                    Compare tarifas e encontre a melhor solução energética
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClick}
                className="px-6 py-3 bg-gold text-primary-foreground rounded-lg font-body font-medium hover:bg-gold-light transition-all flex items-center gap-2 group shadow-lg"
              >
                Simular agora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-16 md:py-24"
    >
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-chocolate-medium via-chocolate-dark to-chocolate-medium p-12 md:p-16 border-2 border-gold/30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gold/20 backdrop-blur-sm flex items-center justify-center border border-gold/30"
            >
              <Calculator className="w-10 h-10 text-gold" />
            </motion.div>

            <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4">
              Quanto pode <span className="gold-text">poupar</span> em energia?
            </h2>

            <p className="font-body text-lg text-cream-muted mb-8 max-w-2xl mx-auto">
              Compare as melhores tarifas do mercado e descubra a solução ideal para o seu consumo energético
            </p>

            <div className="flex flex-wrap justify-center gap-8 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-gold" />
                </div>
                <div className="text-left">
                  <div className="font-display text-2xl text-gold">Até 30%</div>
                  <div className="font-body text-sm text-cream-muted">de poupança</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-gold" />
                </div>
                <div className="text-left">
                  <div className="font-display text-2xl text-gold">2 min</div>
                  <div className="font-body text-sm text-cream-muted">de simulação</div>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClick}
              className="inline-flex items-center gap-3 px-10 py-4 bg-gold text-primary-foreground rounded-xl font-body font-semibold text-lg hover:bg-gold-light transition-all shadow-2xl hover:shadow-gold/30 group"
            >
              <Calculator className="w-6 h-6" />
              Simular a minha poupança
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </motion.button>

            <p className="font-body text-sm text-cream-muted mt-6">
              Gratuito e sem compromisso
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SimulatorCTA;
