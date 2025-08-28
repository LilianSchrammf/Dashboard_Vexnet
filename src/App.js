import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label, ScatterChart, Scatter, ZAxis } from 'recharts';
import { ChevronDown, Target, Zap, Clock, GanttChartSquare, BarChart4, Gem, KanbanSquare, Map, AlertTriangle } from 'lucide-react';

// --- Dados Simulados (Mock Data) ---
// Estes dados simulam o andamento de projetos em um provedor de internet.

// Nível Operacional: Sprint "Desenvolvimento do Portal do Cliente v2.1"
const burndownData = [
  { name: 'Dia 1', ideal: 80, real: 80 },
  { name: 'Dia 2', ideal: 72, real: 75 },
  { name: 'Dia 3', ideal: 64, real: 68 },
  { name: 'Dia 4', ideal: 56, real: 65 },
  { name: 'Dia 5', ideal: 48, real: 55 },
  { name: 'Dia 6', ideal: 40, real: 48 },
  { name: 'Dia 7', ideal: 32, real: 40 },
  { name: 'Dia 8', ideal: 24, real: 30 },
  { name: 'Dia 9', ideal: 16, real: 20 },
  { name: 'Dia 10', ideal: 8, real: 10 },
  { name: 'Dia 11', ideal: 0, real: 5 },
];

const burnupData = [
  { name: 'Sprint 1', concluido: 40, escopoTotal: 50 },
  { name: 'Sprint 2', concluido: 85, escopoTotal: 90 },
  { name: 'Sprint 3', concluido: 130, escopoTotal: 140 },
  { name: 'Sprint 4', concluido: 180, escopoTotal: 180 },
  { name: 'Sprint 5', concluido: 220, escopoTotal: 240 }, // Aumento de escopo
  { name: 'Sprint 6', concluido: 270, escopoTotal: 270 },
];

const cfdData = [
  { name: 'Semana 1', Backlog: 100, EmAndamento: 20, Concluido: 10 },
  { name: 'Semana 2', Backlog: 80, EmAndamento: 25, Concluido: 25 },
  { name: 'Semana 3', Backlog: 70, EmAndamento: 35, Concluido: 45 }, // Gargalo em "Em Andamento"
  { name: 'Semana 4', Backlog: 60, EmAndamento: 20, Concluido: 70 },
  { name: 'Semana 5', Backlog: 40, EmAndamento: 15, Concluido: 95 },
];

const velocityData = [
  { name: 'Sprint 1', planejado: 45, entregue: 40 },
  { name: 'Sprint 2', planejado: 40, entregue: 42 },
  { name: 'Sprint 3', planejado: 42, entregue: 35 }, // Queda de produtividade
  { name: 'Sprint 4', planejado: 38, entregue: 40 },
  { name: 'Sprint 5', planejado: 40, entregue: 41 },
];

// Nível Tático: Projeto "Expansão da Rede de Fibra"
const leadCycleTimeData = [
    { name: 'Jan', 'Lead Time': 30, 'Cycle Time': 15 },
    { name: 'Fev', 'Lead Time': 28, 'Cycle Time': 14 },
    { name: 'Mar', 'Lead Time': 35, 'Cycle Time': 20 }, // Aumento indica ineficiência
    { name: 'Abr', 'Lead Time': 25, 'Cycle Time': 12 },
    { name: 'Mai', 'Lead Time': 22, 'Cycle Time': 10 },
];

const evmData = [
  { name: 'Mês 1', PV: 50, EV: 45, AC: 55 }, // Custo acima, progresso abaixo
  { name: 'Mês 2', PV: 100, EV: 95, AC: 105 },
  { name: 'Mês 3', PV: 150, EV: 150, AC: 150 }, // No alvo
  { name: 'Mês 4', PV: 200, EV: 210, AC: 190 }, // Custo abaixo, progresso adiantado
  { name: 'Mês 5', PV: 250, EV: 260, AC: 230 },
];

// Nível Estratégico: Portfólio de Produtos Digitais
const prioritizationData = [
  { name: 'Pagamento via PIX', esforco: 2, valor: 9, tipo: 'Quick Win' },
  { name: 'App de Autoatendimento', esforco: 8, valor: 10, tipo: 'Projeto Estratégico' },
  { name: 'Upgrade de Servidores', esforco: 7, valor: 6, tipo: 'Infraestrutura' },
  { name: 'Chatbot com IA', esforco: 6, valor: 8, tipo: 'Inovação' },
  { name: 'Refatoração do Legado', esforco: 9, valor: 4, tipo: 'Débito Técnico' },
  { name: 'Programa de Fidelidade', esforco: 4, valor: 5, tipo: 'Marketing' },
];

const okrData = [
    { name: 'Aumentar Retenção de Clientes', progresso: 75, meta: 100 },
    { name: 'Reduzir Chamados de Suporte', progresso: 60, meta: 100 },
    { name: 'Aumentar Velocidade Média', progresso: 85, meta: 100 },
    { name: 'Lançar Novo Produto de Streaming', progresso: 40, meta: 100 },
];

const riskData = [
    { x: 1, y: 5, z: 20, label: 'Ataque DDoS' },
    { x: 2, y: 4, z: 15, label: 'Falha de Hardware Crítico' },
    { x: 4, y: 3, z: 10, label: 'Atraso de Fornecedor' },
    { x: 5, y: 1, z: 5, label: 'Aumento do Dólar' },
    { x: 3, y: 2, z: 8, label: 'Perda de Talentos Chave' },
];

// --- Componentes do Dashboard ---

const ChartCard = ({ title, subtitle, analysis, icon, children }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col h-full border border-gray-100">
    <div className="flex items-start mb-4">
      <div className="bg-blue-100 text-blue-600 p-3 rounded-xl mr-4">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
    <div className="flex-grow w-full h-64">
      {children}
    </div>
    <div className="mt-4 pt-4 border-t border-gray-200">
      <h4 className="font-semibold text-gray-700 text-sm">Análise Rápida:</h4>
      <p className="text-sm text-gray-600 mt-1">{analysis}</p>
    </div>
  </div>
);

const OperationalDashboard = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
    <ChartCard 
      title="Burndown Chart"
      subtitle="Trabalho restante no Sprint"
      icon={<ChevronDown size={24} />}
      analysis="A linha 'Real' está consistentemente acima da 'Ideal', indicando um risco de atraso na entrega do Sprint. A equipe precisa acelerar ou renegociar o escopo."
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={burndownData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="ideal" stroke="#8884d8" strokeDasharray="5 5" name="Ideal" />
          <Line type="monotone" dataKey="real" stroke="#82ca9d" strokeWidth={2} name="Real" />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
    <ChartCard 
      title="Burnup Chart"
      subtitle="Progresso vs. Escopo Total"
      icon={<Target size={24} />}
      analysis="Na Sprint 5, a linha de 'Escopo Total' subiu, mostrando um 'scope creep'. Apesar do bom progresso da equipe, o aumento do escopo impactou a data de conclusão."
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={burnupData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="concluido" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Trabalho Concluído" />
          <Area type="monotone" dataKey="escopoTotal" stackId="2" stroke="#ffc658" fill="#ffc658" name="Escopo Total" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
    <ChartCard 
      title="Cumulative Flow Diagram (CFD)"
      subtitle="Fluxo de tarefas por status"
      icon={<BarChart4 size={24} />}
      analysis="A faixa 'Em Andamento' (amarela) se alargou na Semana 3, um sinal clássico de gargalo. Muitas tarefas foram iniciadas, mas poucas foram concluídas, possivelmente por bloqueios."
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={cfdData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="Backlog" stackId="1" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="EmAndamento" stackId="1" stroke="#ffc658" fill="#ffc658" name="Em Andamento" />
          <Area type="monotone" dataKey="Concluido" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Concluído" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
    <ChartCard 
      title="Velocity Chart"
      subtitle="Pontos entregues por Sprint"
      icon={<Zap size={24} />}
      analysis="A velocidade do time teve uma queda na Sprint 3, mas se recuperou. A média está em torno de 40 pontos, o que pode ser usado para planejar Sprints futuras com mais previsibilidade."
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={velocityData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="planejado" fill="#8884d8" name="Planejado" />
          <Bar dataKey="entregue" fill="#82ca9d" name="Entregue" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  </div>
);

const TacticalDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <ChartCard
            title="Lead Time & Cycle Time"
            subtitle="Tempo de entrega de valor"
            icon={<Clock size={24} />}
            analysis="Houve um pico em Março, indicando um problema no fluxo (ex: dependências externas). As melhorias aplicadas em Abril e Maio reduziram significativamente o tempo de entrega."
        >
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={leadCycleTimeData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis label={{ value: 'Dias', angle: -90, position: 'insideLeft', fontSize: 12 }} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Lead Time" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="Cycle Time" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </ChartCard>
        <ChartCard
            title="EVM Ágil (Earned Value)"
            subtitle="Saúde de Custo e Prazo"
            icon={<GanttChartSquare size={24} />}
            analysis="O projeto começou com custo acima e prazo atrasado. Após o Mês 3, as ações corretivas surtiram efeito, e agora o projeto está adiantado e abaixo do custo (SPI > 1, CPI > 1)."
        >
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={evmData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis label={{ value: 'Valor (k)', angle: -90, position: 'insideLeft', fontSize: 12 }} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="PV" name="Valor Planejado" stroke="#8884d8" />
                    <Line type="monotone" dataKey="EV" name="Valor Agregado" stroke="#82ca9d" strokeWidth={2} />
                    <Line type="monotone" dataKey="AC" name="Custo Real" stroke="#ff7300" />
                </LineChart>
            </ResponsiveContainer>
        </ChartCard>
        <div className="md:col-span-2 lg:col-span-1 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-start mb-4">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-xl mr-4">
                    <Map size={24} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-800">Gantt Adaptado (Roadmap)</h3>
                    <p className="text-sm text-gray-500">Visão de releases e marcos</p>
                </div>
            </div>
            <div className="space-y-4 text-sm">
                <div className="grid grid-cols-4 gap-2 items-center">
                    <span className="font-semibold col-span-1">Q1</span>
                    <div className="bg-blue-500 text-white text-xs font-bold p-2 rounded-lg col-span-3 text-center">Release 1.0: Portal do Cliente</div>
                </div>
                <div className="grid grid-cols-4 gap-2 items-center">
                    <span className="font-semibold col-span-1">Q2</span>
                    <div className="bg-green-500 text-white text-xs font-bold p-2 rounded-lg col-span-3 ml-4 text-center">Release 2.0: App Mobile</div>
                </div>
                <div className="grid grid-cols-4 gap-2 items-center">
                    <span className="font-semibold col-span-1">Q3</span>
                    <div className="bg-purple-500 text-white text-xs font-bold p-2 rounded-lg col-span-3 ml-8 text-center">Expansão Fibra (Fase 1)</div>
                </div>
                <div className="grid grid-cols-4 gap-2 items-center">
                    <span className="font-semibold col-span-1">Q4</span>
                    <div className="bg-yellow-500 text-black text-xs font-bold p-2 rounded-lg col-span-3 ml-12 text-center">Novo Produto Streaming (Beta)</div>
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-700 text-sm">Análise Rápida:</h4>
                <p className="text-sm text-gray-600 mt-1">O roadmap visual alinha os stakeholders sobre as entregas macro. A dependência do App Mobile (Q2) em relação ao Portal (Q1) está clara.</p>
            </div>
        </div>
    </div>
);

const StrategicDashboard = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        <ChartCard
            title="Matriz de Priorização (Valor vs. Esforço)"
            subtitle="Decisões de investimento"
            icon={<Gem size={24} />}
            analysis="'Pagamento via PIX' é um Quick Win claro (alto valor, baixo esforço). 'App de Autoatendimento' é um projeto estratégico de alto impacto, justificando seu esforço elevado."
        >
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid />
                    <XAxis type="number" dataKey="esforco" name="Esforço" unit="" label={{ value: 'Esforço', position: 'insideBottom', offset: -10, fontSize: 12 }} />
                    <YAxis type="number" dataKey="valor" name="Valor" unit="" label={{ value: 'Valor', angle: -90, position: 'insideLeft', fontSize: 12 }} />
                    <ZAxis type="category" dataKey="name" name="Iniciativa" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Legend />
                    <Scatter name="Iniciativas" data={prioritizationData} fill="#8884d8" />
                </ScatterChart>
            </ResponsiveContainer>
        </ChartCard>
        
        <ChartCard
            title="Heatmap de Riscos"
            subtitle="Probabilidade vs. Impacto"
            icon={<AlertTriangle size={24} />}
            analysis="'Ataque DDoS' e 'Falha de Hardware' são os riscos mais críticos (alto impacto), exigindo planos de mitigação robustos, mesmo que a probabilidade seja baixa/média."
        >
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid />
                    <XAxis type="number" dataKey="x" name="Probabilidade" domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} label={{ value: 'Probabilidade', position: 'insideBottom', offset: -10, fontSize: 12 }} />
                    <YAxis type="number" dataKey="y" name="Impacto" domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} label={{ value: 'Impacto', angle: -90, position: 'insideLeft', fontSize: 12 }} />
                    <ZAxis dataKey="z" range={[100, 1000]} name="Criticidade" />
                    <Tooltip content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                            return <div className="bg-white p-2 border rounded shadow-lg text-sm">{payload[0].payload.label}</div>;
                        }
                        return null;
                    }} />
                    <Scatter data={riskData} fill="#ff7300" shape="circle" />
                </ScatterChart>
            </ResponsiveContainer>
        </ChartCard>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-start mb-4">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-xl mr-4">
                        <KanbanSquare size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">Kanban de Portfólio</h3>
                        <p className="text-sm text-gray-500">Status das iniciativas estratégicas</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-bold text-blue-600 mb-2">Discovery</h4>
                        <div className="bg-gray-100 p-3 rounded-lg text-sm">Nova Plataforma de Streaming</div>
                    </div>
                    <div>
                        <h4 className="font-bold text-yellow-600 mb-2">Execução</h4>
                        <div className="bg-gray-100 p-3 rounded-lg text-sm mb-2">Modernização do CRM</div>
                        <div className="bg-gray-100 p-3 rounded-lg text-sm">Expansão da Rede de Fibra</div>
                    </div>
                    <div>
                        <h4 className="font-bold text-green-600 mb-2">Concluído</h4>
                        <div className="bg-gray-100 p-3 rounded-lg text-sm">Lançamento App Mobile v2</div>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-700 text-sm">Análise Rápida:</h4>
                    <p className="text-sm text-gray-600 mt-1">Há duas grandes iniciativas em execução simultaneamente. É preciso garantir que há capacidade organizacional para tocá-las sem sobrecarregar as equipes.</p>
                </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-start mb-4">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-xl mr-4">
                        <Target size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">Progresso dos OKRs</h3>
                        <p className="text-sm text-gray-500">Alinhamento com metas da empresa</p>
                    </div>
                </div>
                <div className="space-y-4">
                    {okrData.map(okr => (
                        <div key={okr.name}>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium text-gray-700">{okr.name}</span>
                                <span className="text-sm font-bold text-blue-600">{okr.progresso}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${okr.progresso}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-700 text-sm">Análise Rápida:</h4>
                    <p className="text-sm text-gray-600 mt-1">O objetivo de 'Lançar Novo Produto' está com baixo progresso, indicando que o projeto associado a ele pode estar atrasado ou precisando de mais recursos.</p>
                </div>
            </div>
        </div>
    </div>
);


export default function App() {
  const [activeTab, setActiveTab] = useState('operational');

  const renderContent = () => {
    switch (activeTab) {
      case 'operational':
        return <OperationalDashboard />;
      case 'tactical':
        return <TacticalDashboard />;
      case 'strategic':
        return <StrategicDashboard />;
      default:
        return <OperationalDashboard />;
    }
  };
  
  const TabButton = ({ tabName, label }) => (
      <button
        onClick={() => setActiveTab(tabName)}
        className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 focus:outline-none ${
          activeTab === tabName
            ? 'bg-blue-600 text-white shadow-md'
            : 'text-gray-600 hover:bg-blue-100'
        }`}
      >
        {label}
      </button>
  );

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
      <div className="container mx-auto p-4">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard de Gestão de Projetos e Produtos</h1>
          <p className="text-gray-600 mt-1">Análise da Transformação Digital - Provedor de Internet XYZ</p>
        </header>

        <nav className="bg-white p-2 rounded-xl shadow-sm flex space-x-2 items-center mb-6 border border-gray-200">
          <TabButton tabName="operational" label="Nível Operacional (Equipe)" />
          <TabButton tabName="tactical" label="Nível Tático (Projetos)" />
          <TabButton tabName="strategic" label="Nível Estratégico (Portfólio)" />
        </nav>

        <main>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}