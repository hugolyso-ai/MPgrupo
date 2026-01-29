# 🏗️ Estrutura de Componentes - Simulador de Poupança Energética

## 📦 Visão Geral da Arquitetura

```
src/
├── components/
│   ├── ui/                           # Componentes base (shadcn/ui)
│   ├── admin/                        # Componentes do backoffice
│   │   ├── OperadorasManager.tsx    # CRUD de operadoras
│   │   └── DescontosManager.tsx     # Gestão de descontos
│   │
│   ├── FloatingActionButtons.tsx    # ⭐ NOVO - Menu lateral retrátil
│   ├── SimulatorCTA.tsx             # ⭐ NOVO - CTAs do simulador
│   ├── EnergySimulator.tsx          # Dialog do simulador
│   ├── SimulatorResults.tsx         # Tabela de resultados
│   │
│   ├── Navbar.tsx                   # Navegação principal
│   ├── Hero.tsx                     # Secção hero
│   ├── AboutSection.tsx             # Sobre nós
│   ├── ServicesSection.tsx          # Serviços
│   ├── PhilosophySection.tsx        # Filosofia
│   ├── CareersSection.tsx           # Carreiras
│   ├── PartnershipsSection.tsx      # Parcerias
│   ├── ContactSection.tsx           # Contacto
│   ├── ContactForm.tsx              # Formulário contacto
│   ├── Footer.tsx                   # Rodapé
│   ├── CookieConsent.tsx            # Banner cookies
│   └── ProtectedRoute.tsx           # Proteção de rotas
│
├── pages/
│   ├── Index.tsx                    # Página principal
│   ├── Login.tsx                    # Página de login
│   ├── AdminDashboard.tsx           # Dashboard admin
│   └── NotFound.tsx                 # 404
│
├── contexts/
│   └── AuthContext.tsx              # Contexto autenticação
│
├── lib/
│   ├── supabase.ts                  # Cliente Supabase
│   └── utils.ts                     # Utilidades
│
└── types/
    └── energy.ts                    # Tipos TypeScript
```

---

## 🎯 Componentes Principais

### 1. FloatingActionButtons.tsx
**Propósito:** Menu lateral retrátil com ações rápidas

**Props:**
```typescript
interface FloatingActionButtonsProps {
  onSimulatorClick: () => void;
}
```

**Estado:**
```typescript
const [isExpanded, setIsExpanded] = useState(false);
```

**Funcionalidades:**
- ✅ Toggle de expansão/retração
- ✅ Animações Framer Motion
- ✅ Links para redes sociais (LinkedIn, Facebook, WhatsApp)
- ✅ Botão de acesso ao simulador
- ✅ Tooltips informativos
- ✅ Posicionamento fixo (right-0, top-1/2)

**Dependências:**
- `framer-motion` - Animações
- `lucide-react` - Ícones

---

### 2. SimulatorCTA.tsx
**Propósito:** Call-to-Actions para o simulador ao longo da página

**Props:**
```typescript
interface SimulatorCTAProps {
  onClick: () => void;
  variant?: 'default' | 'compact';
}
```

**Variantes:**

#### Compact
- Design horizontal minimalista
- Usado entre secções
- Altura: py-8
- Elementos: ícone + texto + botão

#### Default
- Design full-width expansivo
- Hero section destacada
- Altura: py-16 md:py-24
- Elementos: ícone grande + título + descrição + estatísticas + botão CTA

**Animações:**
- `whileInView` - Aparece ao scroll
- `whileHover` - Efeitos hover
- Transições suaves 0.6-0.8s

---

### 3. EnergySimulator.tsx
**Propósito:** Dialog modal com formulário de simulação

**Props:**
```typescript
interface EnergySimulatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
```

**Estado:**
```typescript
const [formData, setFormData] = useState<SimulacaoInput>({
  operadora_atual: '',
  potencia: 6.9,
  dias_fatura: 30,
  ciclo_horario: 'simples',
  // ... outros campos
});
```

**Fluxo:**
1. Cliente preenche dados
2. Seleciona ciclo horário (Simples/Bi-Horário/Tri-Horário)
3. Campos dinâmicos aparecem conforme ciclo
4. Toggle DD/FE
5. Submete → SimulatorResults

**Campos Dinâmicos:**
- **Simples:** kWh + Preço
- **Bi-Horário:** Vazio + Fora de Vazio (kWh + Preços)
- **Tri-Horário:** Vazio + Ponta + Cheias (kWh + Preços)

---

### 4. SimulatorResults.tsx
**Propósito:** Tabela comparativa de resultados

**Props:**
```typescript
interface SimulatorResultsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  simulacao: SimulacaoInput;
  onReset: () => void;
}
```

**Lógica de Cálculo:**
```typescript
// 1. Calcular custo atual
const custoAtual = calcularCustoAtual();

// 2. Para cada operadora
operadoras.forEach(operadora => {
  // 2.1. Calcular custo base
  const custoPotencia = valorDiario * dias;
  const custoEnergia = kWh * tarifa;

  // 2.2. Aplicar descontos (DD + FE)
  if (debito_direto) {
    custoPotencia *= (1 - desconto_dd_potencia / 100);
    custoEnergia *= (1 - desconto_dd_energia / 100);
  }

  // 2.3. Calcular poupança
  const poupanca = custoAtual - (custoPotencia + custoEnergia);
});

// 3. Ordenar por maior poupança
resultados.sort((a, b) => b.poupanca - a.poupanca);
```

**Tabela:**
- Operadora Atual vs Operadoras Parceiras
- Logotipos visíveis
- Destaque para melhor opção (bg-gold)
- Alerta de poupança adicional DD+FE

---

## 🔐 Componentes de Autenticação

### AuthContext.tsx
**Propósito:** Provider de autenticação global

**Funcionalidades:**
```typescript
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
}
```

**Uso:**
```typescript
const { user, loading, signIn, signOut } = useAuth();
```

---

### ProtectedRoute.tsx
**Propósito:** Proteger rotas privadas

**Props:**
```typescript
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredEmail?: string;
}
```

**Comportamento:**
- Loading → Spinner
- Não autenticado → Redirect /login
- Email incorreto → Redirect /
- Autenticado → Render children

---

## 🎨 Componentes Admin

### OperadorasManager.tsx
**Propósito:** CRUD de operadoras

**Funcionalidades:**
- ✅ Listar operadoras
- ✅ Criar nova operadora
- ✅ Editar operadora existente
- ✅ Eliminar operadora
- ✅ Upload de logótipo (URL)
- ✅ Configurar tarifas kWh
- ✅ Configurar valores diários de potência

**Dialog de Edição:**
- Grid de inputs para tarifas
- Grid scroll para potências
- Validação de campos obrigatórios

---

### DescontosManager.tsx
**Propósito:** Gestão de descontos por operadora

**Funcionalidades:**
- ✅ Listar operadoras ativas
- ✅ Configurar descontos DD (Potência + Energia)
- ✅ Configurar descontos FE (Potência + Energia)
- ✅ Guardar individualmente por operadora

**Layout:**
- Grid 2 colunas (DD | FE)
- 4 inputs por operadora
- Botão guardar individual

---

## 📱 Fluxo de Navegação

```
┌─────────────────────────────────────────────────┐
│                   / (Index)                     │
│  ┌─────────────────────────────────────────┐   │
│  │  FloatingActionButtons (sempre visível) │   │
│  │    ├─ Simulador → EnergySimulator       │   │
│  │    ├─ LinkedIn → External               │   │
│  │    ├─ Facebook → External               │   │
│  │    └─ WhatsApp → External               │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │  SimulatorCTA (3x na página)            │   │
│  │    └─ Click → EnergySimulator           │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │  EnergySimulator (Dialog)               │   │
│  │    └─ Submit → SimulatorResults         │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │  SimulatorResults (Dialog)              │   │
│  │    ├─ Nova Simulação → EnergySimulator  │   │
│  │    └─ Fechar → Index                    │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘

                        │
                        ↓

┌─────────────────────────────────────────────────┐
│                 /login (Login)                  │
│  ┌─────────────────────────────────────────┐   │
│  │  Email + Password                       │   │
│  │    └─ Success → /admin-dashboard        │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘

                        │
                        ↓

┌─────────────────────────────────────────────────┐
│        /admin-dashboard (AdminDashboard)        │
│  ┌─────────────────────────────────────────┐   │
│  │  Tab: Operadoras                        │   │
│  │    └─ OperadorasManager                 │   │
│  └─────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────┐   │
│  │  Tab: Descontos                         │   │
│  │    └─ DescontosManager                  │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

---

## 🔄 Fluxo de Dados

### Simulação

```
┌──────────────┐
│   Cliente    │
│  (Frontend)  │
└──────┬───────┘
       │
       │ 1. Preenche formulário
       ↓
┌──────────────────┐
│ EnergySimulator  │
│   (Component)    │
└──────┬───────────┘
       │
       │ 2. Submit → SimulatorResults
       ↓
┌──────────────────────┐
│ SimulatorResults     │
│   (Component)        │
└──────┬───────────────┘
       │
       │ 3. Fetch operadoras + descontos
       ↓
┌──────────────────────┐
│  Supabase Database   │
│  ┌────────────────┐  │
│  │  operadoras    │  │
│  └────────────────┘  │
│  ┌────────────────┐  │
│  │  configuracoes │  │
│  │  _descontos    │  │
│  └────────────────┘  │
└──────┬───────────────┘
       │
       │ 4. Calcular custos e poupanças
       ↓
┌──────────────────────┐
│   Tabela Resultados  │
│   (UI Component)     │
└──────────────────────┘
```

### Admin Operations

```
┌──────────────┐
│ Administrador│
└──────┬───────┘
       │
       │ 1. Login
       ↓
┌──────────────────┐
│  Supabase Auth   │
└──────┬───────────┘
       │
       │ 2. Verificar email = hugo.martins@mpgrupo.pt
       ↓
┌──────────────────────┐
│   ProtectedRoute     │
└──────┬───────────────┘
       │
       │ 3. Permitir acesso
       ↓
┌──────────────────────┐
│   AdminDashboard     │
│  ┌────────────────┐  │
│  │ Operadoras Tab │  │
│  │ OperadorasManager│ │
│  └────────┬───────┘  │
│           │          │
│           │ 4. CRUD  │
│           ↓          │
│  ┌────────────────┐  │
│  │  Supabase DB   │  │
│  │  operadoras    │  │
│  └────────────────┘  │
│                      │
│  ┌────────────────┐  │
│  │ Descontos Tab  │  │
│  │ DescontosManager│  │
│  └────────┬───────┘  │
│           │          │
│           │ 5. Update│
│           ↓          │
│  ┌────────────────┐  │
│  │  Supabase DB   │  │
│  │  configuracoes │  │
│  │  _descontos    │  │
│  └────────────────┘  │
└──────────────────────┘
```

---

## 🎨 Sistema de Design

### Padrões de Componentes

#### Botões
```tsx
// Primário
<button className="px-6 py-3 bg-gold text-primary-foreground rounded-lg hover:bg-gold-light">

// Secundário
<button className="px-6 py-3 border border-border rounded-lg text-cream-muted hover:text-foreground">

// Com ícone
<button className="flex items-center gap-2">
  <Icon className="w-5 h-5" />
  Texto
</button>
```

#### Cards
```tsx
// Card base
<div className="glass-card p-6">

// Card com border
<div className="p-6 bg-muted rounded-lg border border-border">

// Card hover
<div className="p-6 bg-muted rounded-lg hover:shadow-lg transition-all">
```

#### Inputs
```tsx
// Input padrão
<input className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-gold/50" />

// Select
<select className="w-full px-4 py-3 bg-muted border border-border rounded-lg">

// Checkbox
<input type="checkbox" className="w-5 h-5 text-gold rounded" />
```

---

## 📚 Bibliotecas e Dependências

### Core
- `react` - Framework UI
- `react-dom` - Renderização
- `typescript` - Type safety
- `vite` - Build tool

### UI/UX
- `@radix-ui/*` - Componentes base
- `tailwindcss` - Styling
- `framer-motion` - Animações
- `lucide-react` - Ícones

### Data/State
- `@supabase/supabase-js` - Backend
- `@tanstack/react-query` - Cache/fetch
- `react-router-dom` - Routing

### Forms
- `react-hook-form` - Gestão formulários
- `zod` - Validação
- `@hookform/resolvers` - Integração

### Outros
- `sonner` - Toasts/notifications
- `date-fns` - Manipulação datas
- `clsx` - Class names condicionais

---

## 🔍 Debugging e Testes

### Console Logs Úteis
```typescript
// Simulador
console.log('Simulação:', formData);
console.log('Resultados:', resultados);
console.log('Custo Atual:', custoAtual);

// Auth
console.log('User:', user);
console.log('Loading:', loading);

// Admin
console.log('Operadoras:', operadoras);
console.log('Descontos:', descontos);
```

### React DevTools
- Inspecionar estado de componentes
- Ver props passadas
- Profiler para performance

### Supabase Dashboard
- Logs & Analytics
- Database Inspector
- Authentication Users

---

**Última atualização:** 2024
**Versão:** 2.0.0
