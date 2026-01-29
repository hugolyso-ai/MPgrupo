import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Percent, LogOut, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import OperadorasManager from '@/components/admin/OperadorasManager';
import DescontosManager from '@/components/admin/DescontosManager';

type Tab = 'operadoras' | 'descontos';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>('operadoras');
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    toast.success('Sessão terminada');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-chocolate-medium via-background to-chocolate-light">
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h1 className="font-display text-xl text-foreground">Backoffice</h1>
                <p className="font-body text-xs text-cream-muted">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-cream-muted hover:text-gold hover:border-gold transition-all font-body text-sm"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <div className="flex gap-2 mb-8 border-b border-border">
            <button
              onClick={() => setActiveTab('operadoras')}
              className={`flex items-center gap-2 px-6 py-3 font-body transition-all border-b-2 ${
                activeTab === 'operadoras'
                  ? 'border-gold text-gold'
                  : 'border-transparent text-cream-muted hover:text-foreground'
              }`}
            >
              <Building2 className="w-5 h-5" />
              Operadoras
            </button>
            <button
              onClick={() => setActiveTab('descontos')}
              className={`flex items-center gap-2 px-6 py-3 font-body transition-all border-b-2 ${
                activeTab === 'descontos'
                  ? 'border-gold text-gold'
                  : 'border-transparent text-cream-muted hover:text-foreground'
              }`}
            >
              <Percent className="w-5 h-5" />
              Descontos
            </button>
          </div>

          <div className="min-h-[500px]">
            {activeTab === 'operadoras' && <OperadorasManager />}
            {activeTab === 'descontos' && <DescontosManager />}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
