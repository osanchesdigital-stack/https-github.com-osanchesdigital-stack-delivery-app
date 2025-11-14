import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FinancialReportsPage: React.FC = () => {
    // Dados fictícios
    const summaryData = {
        totalRevenue: 'R$ 597k',
        netProfit: 'R$ 87k',
        security: 'R$ 1380',
        taxes: 'R$ 1200',
    };

    const transactions = [
        { name: 'Restaurante Sabor Divino', type: 'Venda Online', date: '28/06/24', amount: 'R$ 499,50', status: 'Concluído' },
        { name: 'Pizza Rápida', type: 'Venda Online', date: '25/06/24', amount: 'R$ 290,00', status: 'Concluído' },
        { name: 'Farmácia Bem-Estar', type: 'Mensalidade', date: '22/06/24', amount: 'R$ 490,00', status: 'Revisado' },
        { name: 'Mercado Central', type: 'Venda Online', date: '20/06/24', amount: 'R$ 350,00', status: 'Concluído' },
        { name: 'Açaí Tropical', type: 'Mensalidade', date: '17/06/24', amount: 'R$ 840,00', status: 'Concluído' },
    ];

    const balanceData = [
        { name: 'Jan', balance: 4000 },
        { name: 'Fev', balance: 3000 },
        { name: 'Mar', balance: 5000 },
        { name: 'Abr', balance: 4500 },
        { name: 'Mai', balance: 6000 },
        { name: 'Jun', balance: 5500 },
    ];

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'Concluído': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
            case 'Revisado': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    return (
        <div className="p-6 bg-background-light dark:bg-background-dark min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Relatórios</h1>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <select className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark focus:border-primary focus:ring-0 rounded-lg pl-4 pr-10 py-2 text-sm appearance-none">
                            <option>Este mês</option>
                            <option>Últimos 3 meses</option>
                            <option>Este ano</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">expand_more</span>
                    </div>
                    <button className="bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined">download</span>
                        Exportar
                    </button>
                </div>
            </div>

            {/* Cards de Resumo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <SummaryCard icon="monetization_on" title="Faturamento Total" value={summaryData.totalRevenue} />
                <SummaryCard icon="trending_up" title="Lucro Líquido" value={summaryData.netProfit} />
                <SummaryCard icon="shield" title="Segurança" value={summaryData.security} />
                <SummaryCard icon="receipt_long" title="Taxas e Impostos" value={summaryData.taxes} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Gráfico de Balanço */}
                    <div className="lg:col-span-3 bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-md">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Balanço</h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={balanceData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="balance" stroke="hsl(var(--color-primary))" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Histórico de Transações */}
                <div className="lg:col-span-2 bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-md">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Histórico de Transações</h2>
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700/50">
                        {transactions.map((transaction, index) => (
                            <li key={index} className="py-4 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-full ${getStatusClass(transaction.status).replace('text', 'bg').replace(/\d{2,3}/, '100')} `}>
                                        <span className="material-symbols-outlined text-gray-600">receipt_long</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">{transaction.name}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-gray-900 dark:text-white">{transaction.amount}</p>
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusClass(transaction.status)}`}>
                                        {transaction.status}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

// Componente para os cards de resumo
const SummaryCard: React.FC<{ icon: string; title: string; value: string; }> = ({ icon, title, value }) => (
    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-md flex items-center gap-6">
        <div className="bg-primary/10 p-4 rounded-full">
            <span className="material-symbols-outlined text-3xl text-primary">{icon}</span>
        </div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
    </div>
);

export default FinancialReportsPage;
