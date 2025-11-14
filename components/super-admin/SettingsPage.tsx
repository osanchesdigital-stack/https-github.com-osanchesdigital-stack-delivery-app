import React, { useState } from 'react';

const SettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Configurações</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Gerencie as configurações do seu perfil e da plataforma.</p>
                </div>

                <div className="flex border-b border-border-light dark:border-border-dark">
                    <button
                        className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${activeTab === 'profile' ? 'border-b-2 border-primary text-primary' : 'text-text-secondary-light hover:text-text-primary-light dark:text-text-secondary-dark dark:hover:text-text-primary-dark'}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        Perfil
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${activeTab === 'notifications' ? 'border-b-2 border-primary text-primary' : 'text-text-secondary-light hover:text-text-primary-light dark:text-text-secondary-dark dark:hover:text-text-primary-dark'}`}
                        onClick={() => setActiveTab('notifications')}
                    >
                        Notificações
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${activeTab === 'appearance' ? 'border-b-2 border-primary text-primary' : 'text-text-secondary-light hover:text-text-primary-light dark:text-text-secondary-dark dark:hover:text-text-primary-dark'}`}
                        onClick={() => setActiveTab('appearance')}
                    >
                        Aparência
                    </button>
                </div>

                <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-md mt-6">
                    {activeTab === 'profile' && (
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Perfil</h2>
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Nome</label>
                                    <input type="text" id="name" defaultValue="James Smith" className="mt-1 block w-full px-4 py-2 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm text-text-primary-light dark:text-text-primary-dark" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Email</label>
                                    <input type="email" id="email" defaultValue="james.smith@example.com" className="mt-1 block w-full px-4 py-2 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm text-text-primary-light dark:text-text-primary-dark" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Senha</label>
                                    <input type="password" id="password" placeholder="••••••••" className="mt-1 block w-full px-4 py-2 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm text-text-primary-light dark:text-text-primary-dark" />
                                </div>
                                <div className="flex justify-end pt-4">
                                    <button className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200">Salvar Alterações</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'notifications' && (
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Notificações</h2>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-4 rounded-md bg-gray-50 dark:bg-gray-700">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Notificações por E-mail</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-md bg-gray-50 dark:bg-gray-700">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Notificações Push</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'appearance' && (
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Aparência</h2>
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="theme" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Tema</label>
                                    <select id="theme" className="mt-1 block w-full px-4 py-2 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm text-text-primary-light dark:text-text-primary-dark">
                                        <option>Claro</option>
                                        <option>Escuro</option>
                                        <option>Padrão do Sistema</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="language" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Idioma</label>
                                    <select id="language" className="mt-1 block w-full px-4 py-2 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm text-text-primary-light dark:text-text-primary-dark">
                                        <option>Português (Brasil)</option>
                                        <option>English (US)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
