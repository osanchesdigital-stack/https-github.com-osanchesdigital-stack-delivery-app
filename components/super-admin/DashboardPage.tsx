import React from 'react';

const DashboardPage: React.FC = () => {
    return (
        <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-md flex items-center gap-4">
                    <div className="bg-primary/15 text-primary rounded-lg p-3">
                        <span className="material-symbols-outlined text-3xl">group</span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Total de Assinantes</p>
                        <p className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">1,204</p>
                    </div>
                </div>
                <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-md flex items-center gap-4">
                    <div className="bg-[#4CAF50]/20 text-[#4CAF50] rounded-lg p-3">
                        <span className="material-symbols-outlined text-3xl">monetization_on</span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Receita Recorrente Mensal</p>
                        <p className="text-2xl font-bold text-[#111418] dark:text-white">R$ 25,4k</p>
                    </div>
                </div>
                <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-md flex items-center gap-4">
                    <div className="bg-[#FF9800]/20 text-[#FF9800] rounded-lg p-3">
                        <span className="material-symbols-outlined text-3xl">person_add</span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Novos Assinantes (Mês)</p>
                        <p className="text-2xl font-bold text-[#111418] dark:text-white">82</p>
                    </div>
                </div>
                <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-md flex items-center gap-4">
                    <div className="bg-[#F44336]/20 text-[#F44336] rounded-lg p-3">
                        <span className="material-symbols-outlined text-3xl">trending_down</span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Taxa de Churn</p>
                        <p className="text-2xl font-bold text-[#111418] dark:text-white">4.2%</p>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                {/* Left Column */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Growth Chart */}
                    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-md">
                        <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">Crescimento de Assinantes</h3>
                        <div className="h-80">
                            {/* Placeholder for bar chart */}
                            <svg width="100%" height="100%" viewBox="0 0 500 250" preserveAspectRatio="xMidYMid meet">
                                <rect width="500" height="250" fill="#E5E7EB" rx="8" />
                                <text x="250" y="125" textAnchor="middle" dy=".3em" fill="#9CA3AF">Gráfico de Barras (Crescimento)</text>
                            </svg>
                        </div>
                    </div>
                    {/* Recent Activity */}
                    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-md">
                        <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">Atividade dos Estabelecimentos</h3>
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                                <tr>
                                    <th className="py-3">Estabelecimento</th>
                                    <th className="py-3">Plano</th>
                                    <th className="py-3 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-200 dark:border-gray-700/50">
                                    <td className="py-4 font-medium text-gray-900 dark:text-white">Burger Queen</td>
                                    <td className="py-4 text-gray-600 dark:text-gray-300">Premium</td>
                                    <td className="py-4 text-right text-green-500">Ativo</td>
                                </tr>
                                <tr className="border-b border-gray-200 dark:border-gray-700/50">
                                    <td className="py-4 font-medium text-gray-900 dark:text-white">Pizzaria Delícia</td>
                                    <td className="py-4 text-gray-600 dark:text-gray-300">Básico</td>
                                    <td className="py-4 text-right text-green-500">Ativo</td>
                                </tr>
                                <tr>
                                    <td className="py-4 font-medium text-gray-900 dark:text-white">Sushi House</td>
                                    <td className="py-4 text-gray-600 dark:text-gray-300">Premium</td>
                                    <td className="py-4 text-right text-red-500">Inativo</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-6">
                    {/* Revenue by Plan */}
                    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Receita por Plano</h3>
                        <div className="h-64 flex items-center justify-center">
                            {/* Placeholder for donut chart */}
                            <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
                                <rect width="200" height="200" fill="#E5E7EB" rx="100" />
                                <text x="100" y="100" textAnchor="middle" dy=".3em" fill="#9CA3AF">Gráfico de Rosca</text>
                            </svg>
                        </div>
                    </div>
                    {/* Recent Payments */}
                    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Pagamentos Recentes</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">Padaria Pão Quente</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Plano Premium</p>
                                </div>
                                <p className="font-semibold text-green-500">+ R$ 99,90</p>
                            </li>
                            <li className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">Restaurante Sabor Caseiro</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Plano Básico</p>
                                </div>
                                <p className="font-semibold text-green-500">+ R$ 49,90</p>
                            </li>
                            <li className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">Açaí do Point</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Plano Premium</p>
                                </div>
                                <p className="font-semibold text-green-500">+ R$ 99,90</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardPage;
