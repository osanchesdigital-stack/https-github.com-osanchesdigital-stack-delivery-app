import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

const EstablishmentsPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEstablishmentName, setNewEstablishmentName] = useState('');
    const [newEstablishmentPlan, setNewEstablishmentPlan] = useState('Básico');
    const [newEstablishmentStatus, setNewEstablishmentStatus] = useState('Ativo');
    const [newEstablishmentAddress, setNewEstablishmentAddress] = useState('');
    const [newEstablishmentCity, setNewEstablishmentCity] = useState('');
    const [newEstablishmentState, setNewEstablishmentState] = useState('');
    const [newEstablishmentPhone, setNewEstablishmentPhone] = useState('');
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const [establishments, setEstablishments] = useState<any[]>([]);

    useEffect(() => {
        fetchEstablishments();
    }, []);

    const fetchEstablishments = async () => {
        const { data, error } = await supabase.from('establishments').select('*');
        if (error) {
            console.error('Error fetching establishments:', error);
        } else {
            setEstablishments(data);
        }
    };

    const handleAddEstablishment = async (e: React.FormEvent) => {
        e.preventDefault();
        const { data, error } = await supabase
            .from('establishments')
            .insert([{
                name: newEstablishmentName,
                plan: newEstablishmentPlan,
                status: newEstablishmentStatus.toLowerCase(),
                address: newEstablishmentAddress,
                city: newEstablishmentCity,
                state: newEstablishmentState,
                phone: newEstablishmentPhone,
            }]);

        if (error) {
            console.error('Error adding establishment:', error);
        } else {
            fetchEstablishments();
            setIsModalOpen(false);
            setNewEstablishmentName('');
            setNewEstablishmentPlan('Básico');
            setNewEstablishmentStatus('Ativo');
            setNewEstablishmentAddress('');
            setNewEstablishmentCity('');
            setNewEstablishmentState('');
            setNewEstablishmentPhone('');
        }
    };

    const handleMenuClick = (id: number) => {
        setOpenMenuId(openMenuId === id ? null : id);
    };

    const handleEdit = (id: number) => {
        console.log('Editar', id);
        setOpenMenuId(null);
    };

    const handleDeactivate = async (id: number) => {
        const { error } = await supabase
            .from('establishments')
            .update({ status: 'inativo' })
            .eq('id', id);

        if (error) {
            console.error('Error deactivating establishment:', error);
        } else {
            fetchEstablishments();
        }
        setOpenMenuId(null);
    };

    const handleDelete = async (id: number) => {
        const { error } = await supabase
            .from('establishments')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting establishment:', error);
        } else {
            fetchEstablishments();
        }
        setOpenMenuId(null);
    };

    // Dados fictícios de estabelecimentos

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'ativo':
                return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
            case 'inativo':
                return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
            case 'pendente':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    const getAvatar = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-md">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Estabelecimentos</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Gerencie todos os estabelecimentos cadastrados.</p>
                </div>
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark">search</span>
                        <input
                            type="text"
                            placeholder="Pesquisar..."
                            className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark focus:border-primary focus:ring-0 rounded-lg pl-10 pr-4 py-2 text-sm w-full sm:w-auto"
                        />
                    </div>
                    <button onClick={() => setIsModalOpen(true)} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-primary/90 transition-colors">
                        <span className="material-symbols-outlined">add</span>
                        Adicionar
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-800/50">
                        <tr>
                            <th className="px-6 py-4 font-medium">Estabelecimento</th>
                            <th className="px-6 py-4 font-medium">Plano</th>
                            <th className="px-6 py-4 font-medium">Data de Cadastro</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700/50">
                        {establishments.map((establishment) => (
                            <tr key={establishment.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                                            {getAvatar(establishment.name)}
                                        </div>
                                        <p className="font-medium text-text-primary-light dark:text-text-primary-dark">{establishment.name}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{establishment.plan}</td>
                                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{establishment.registered}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusClass(establishment.status)}`}>
                                        {establishment.status.charAt(0).toUpperCase() + establishment.status.slice(1)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right relative">
                                    <button onClick={() => handleMenuClick(establishment.id)} className="text-gray-500 hover:text-[#4D53E0] dark:text-gray-400 dark:hover:text-white">
                                        <span className="material-symbols-outlined">more_vert</span>
                                    </button>
                                    {openMenuId === establishment.id && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
                                            <a href="#" onClick={() => handleEdit(establishment.id)} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Editar</a>
                                            <a href="#" onClick={() => handleDeactivate(establishment.id)} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Desativar</a>
                                            <a href="#" onClick={() => handleDelete(establishment.id)} className="block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">Excluir</a>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Establishment Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-md w-full max-w-md">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Adicionar Estabelecimento</h2>
                        <form onSubmit={handleAddEstablishment}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nome do Estabelecimento</label>
                                <input type="text" id="name" className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark focus:border-primary focus:ring-0 rounded-lg w-full px-4 py-2 text-sm" value={newEstablishmentName} onChange={(e) => setNewEstablishmentName(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Endereço</label>
                                <input type="text" id="address" className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark focus:border-primary focus:ring-0 rounded-lg w-full px-4 py-2 text-sm" value={newEstablishmentAddress} onChange={(e) => setNewEstablishmentAddress(e.target.value)} />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cidade</label>
                                    <input type="text" id="city" className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark focus:border-primary focus:ring-0 rounded-lg w-full px-4 py-2 text-sm" value={newEstablishmentCity} onChange={(e) => setNewEstablishmentCity(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Estado</label>
                                    <input type="text" id="state" className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark focus:border-primary focus:ring-0 rounded-lg w-full px-4 py-2 text-sm" value={newEstablishmentState} onChange={(e) => setNewEstablishmentState(e.target.value)} />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Telefone</label>
                                <input type="text" id="phone" className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark focus:border-primary focus:ring-0 rounded-lg w-full px-4 py-2 text-sm" value={newEstablishmentPhone} onChange={(e) => setNewEstablishmentPhone(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="plan" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Plano</label>
                                <select id="plan" className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark focus:border-primary focus:ring-0 rounded-lg w-full px-4 py-2 text-sm" value={newEstablishmentPlan} onChange={(e) => setNewEstablishmentPlan(e.target.value)}>
                                    <option>Básico</option>
                                    <option>Premium</option>
                                </select>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                                <select id="status" className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark focus:border-primary focus:ring-0 rounded-lg w-full px-4 py-2 text-sm" value={newEstablishmentStatus} onChange={(e) => setNewEstablishmentStatus(e.target.value)}>
                                    <option>Ativo</option>
                                    <option>Inativo</option>
                                    <option>Pendente</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-200 dark:bg-gray-700 text-text-primary-light dark:text-text-primary-dark px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">Cancelar</button>
                                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EstablishmentsPage;
