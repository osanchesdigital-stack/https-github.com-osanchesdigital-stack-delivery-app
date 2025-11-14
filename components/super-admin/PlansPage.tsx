import React, { useState } from 'react';

const PlansPage: React.FC = () => {
    const [billingCycle, setBillingCycle] = useState('monthly');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [customPrice, setCustomPrice] = useState('');
    const [selectedEstablishments, setSelectedEstablishments] = useState<string[]>([]);

    const plans = {
        monthly: [
            {
                name: 'Básico',
                price: 'R$ 49',
                features: [
                    'Gestão de cardápio',
                    'Recebimento de pedidos',
                    'Suporte por e-mail',
                    'Análise básica',
                ],
                isPopular: false,
            },
            {
                name: 'Premium',
                price: 'R$ 99',
                features: [
                    'Tudo do plano Básico',
                    'Notificações via WhatsApp',
                    'Programa de fidelidade',
                    'Análise avançada',
                    'Suporte prioritário',
                ],
                isPopular: true,
            },
        ],
        annually: [
            {
                name: 'Básico',
                price: 'R$ 490',
                features: [
                    'Gestão de cardápio',
                    'Recebimento de pedidos',
                    'Suporte por e-mail',
                    'Análise básica',
                ],
                isPopular: false,
            },
            {
                name: 'Premium',
                price: 'R$ 990',
                features: [
                    'Tudo do plano Básico',
                    'Notificações via WhatsApp',
                    'Programa de fidelidade',
                    'Análise avançada',
                    'Suporte prioritário',
                ],
                isPopular: true,
            },
        ],
    };

    const currentPlans = billingCycle === 'monthly' ? plans.monthly : plans.annually;

    const allEstablishments = ['Burger Queen', 'Pizzaria Delícia', 'Sushi House', 'Padaria Pão Quente', 'Restaurante Sabor Caseiro', 'Açaí do Point'];

    const handleCreateCustomPlan = () => {
        // Lógica para salvar o plano personalizado
        console.log({ customPrice, selectedEstablishments });
        setIsModalOpen(false);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800">Planos e Preços</h1>
                <p className="text-gray-600 mt-2">Escolha o plano que melhor se adapta ao seu negócio.</p>
            </div>

            {/* Billing Cycle Toggle */}
            <div className="flex justify-center items-center gap-4 mb-12">
                <span className={`font-semibold ${billingCycle === 'monthly' ? 'text-primary' : 'text-gray-500'}`}>Mensal</span>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" onChange={() => setBillingCycle(billingCycle === 'monthly' ? 'annually' : 'monthly')} />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
                <span className={`font-semibold ${billingCycle === 'annually' ? 'text-primary' : 'text-gray-500'}`}>
                    Anual <span className="text-green-500 text-sm font-medium">(Economize 20%)</span>
                </span>
            </div>

            {/* Plans Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {currentPlans.map((plan, index) => (
                    <div key={index} className={`bg-white rounded-2xl shadow-lg p-8 flex flex-col transform transition-transform hover:scale-105 ${plan.isPopular ? 'border-2 border-primary' : ''}`}>
                        {plan.isPopular && (
                            <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full self-start mb-4">Mais Popular</span>
                        )}
                        <h3 className="text-2xl font-semibold text-gray-800">{plan.name}</h3>
                        <p className="text-4xl font-bold text-gray-900 my-4">
                            {plan.price} <span className="text-lg font-medium text-gray-500">/{billingCycle === 'monthly' ? 'mês' : 'ano'}</span>
                        </p>
                        <p className="text-gray-500 mb-6">Recursos principais do plano.</p>
                        <ul className="space-y-4 text-gray-600 flex-grow">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-green-500">check_circle</span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <button className={`mt-8 w-full py-3 rounded-lg font-semibold transition-colors ${plan.isPopular ? 'bg-primary text-white hover:bg-primary/90' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>
                            Começar
                        </button>
                    </div>
                ))}
                <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col transform transition-transform hover:scale-105">
                    <h3 className="text-2xl font-semibold text-gray-800">Personalizado</h3>
                    <p className="text-4xl font-bold text-gray-900 my-4">
                        Flexível
                    </p>
                    <p className="text-gray-500 mb-6">Crie um plano com recursos e preços personalizados.</p>
                    <ul className="space-y-4 text-gray-600 flex-grow">
                        <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-green-500">check_circle</span>
                            Recursos sob medida
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-green-500">check_circle</span>
                            Preço negociável
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-green-500">check_circle</span>
                            Suporte dedicado
                        </li>
                    </ul>
                    <button
                        className="mt-8 w-full py-3 rounded-lg font-semibold transition-colors bg-gray-800 text-white hover:bg-gray-900"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Criar Plano
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Criar Plano Personalizado</h2>
                        <div className="mb-4">
                            <label htmlFor="customPrice" className="block text-sm font-medium text-gray-700 mb-2">Preço</label>
                            <input
                                type="text"
                                id="customPrice"
                                className="bg-gray-100 border border-transparent focus:border-primary focus:ring-0 rounded-lg w-full px-4 py-2 text-sm"
                                value={customPrice}
                                onChange={(e) => setCustomPrice(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Selecionar Estabelecimentos</label>
                            <div className="grid grid-cols-2 gap-4 max-h-60 overflow-y-auto p-4 bg-gray-50 rounded-lg">
                                {allEstablishments.map((establishment) => (
                                    <div key={establishment} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={establishment}
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedEstablishments([...selectedEstablishments, establishment]);
                                                } else {
                                                    setSelectedEstablishments(selectedEstablishments.filter(item => item !== establishment));
                                                }
                                            }}
                                        />
                                        <label htmlFor={establishment} className="ml-3 text-sm text-gray-600">{establishment}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={handleCreateCustomPlan}
                                className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                            >
                                Salvar Plano
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlansPage;