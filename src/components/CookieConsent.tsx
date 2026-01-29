import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";
import CookiePolicyDialog from "./CookiePolicyDialog";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
  };

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          >
            <div className="container mx-auto max-w-6xl">
              <div className="glass-card p-6 md:p-8 shadow-2xl border-2 border-gold/20">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                      <Cookie className="w-6 h-6 text-gold" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-display text-xl text-foreground mb-2">
                      Este site utiliza cookies
                    </h3>
                    <p className="font-body text-sm text-cream-muted leading-relaxed">
                      Utilizamos cookies essenciais para o funcionamento do site e cookies opcionais
                      para melhorar a sua experiência. Pode escolher quais cookies aceitar ou rejeitar todos os cookies opcionais.{" "}
                      <button
                        onClick={() => setShowPolicy(true)}
                        className="text-gold hover:underline font-medium"
                      >
                        Saiba mais
                      </button>
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <button
                      onClick={handleReject}
                      className="px-6 py-2.5 border border-border bg-muted text-foreground font-body text-sm font-medium rounded-lg hover:bg-muted/80 transition-all duration-300 whitespace-nowrap"
                    >
                      Rejeitar Opcionais
                    </button>
                    <button
                      onClick={handleAcceptNecessary}
                      className="px-6 py-2.5 border border-gold/30 bg-gold/10 text-foreground font-body text-sm font-medium rounded-lg hover:bg-gold/20 transition-all duration-300 whitespace-nowrap"
                    >
                      Apenas Essenciais
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="px-6 py-2.5 bg-gold text-primary-foreground font-body text-sm font-medium rounded-lg hover:bg-gold-light transition-all duration-300 whitespace-nowrap"
                    >
                      Aceitar Todos
                    </button>
                  </div>

                  {/* Close button for mobile */}
                  <button
                    onClick={handleReject}
                    className="absolute top-4 right-4 md:hidden w-8 h-8 flex items-center justify-center text-cream-muted hover:text-gold transition-colors"
                    aria-label="Fechar"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Cookie Types Info */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        checked
                        disabled
                        className="mt-1 rounded"
                      />
                      <div>
                        <p className="font-body text-sm text-foreground font-medium">
                          Essenciais
                        </p>
                        <p className="font-body text-xs text-cream-muted">
                          Necessários para o funcionamento do site
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        id="analytics"
                        className="mt-1 rounded"
                      />
                      <div>
                        <label htmlFor="analytics" className="font-body text-sm text-foreground font-medium cursor-pointer">
                          Analíticos
                        </label>
                        <p className="font-body text-xs text-cream-muted">
                          Ajudam a melhorar o site
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        id="marketing"
                        className="mt-1 rounded"
                      />
                      <div>
                        <label htmlFor="marketing" className="font-body text-sm text-foreground font-medium cursor-pointer">
                          Marketing
                        </label>
                        <p className="font-body text-xs text-cream-muted">
                          Conteúdo personalizado
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CookiePolicyDialog open={showPolicy} onOpenChange={setShowPolicy} />
    </>
  );
};

export default CookieConsent;
