import React, { useState } from 'react';
import { Address } from '../types';

interface EnderecosProps {
    onBack: () => void;
    addresses: Address[];
    setAddresses: React.Dispatch<React.SetStateAction<Address[]>>;
}

const Enderecos: React.FC<EnderecosProps> = ({ onBack, addresses, setAddresses }) => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);
    const [formData, setFormData] = useState<Omit<Address, 'id'>>({
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        zip: '',
    });
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUseCurrentLocation = () => {
        setIsLoadingLocation(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // In a real app, you'd use a reverse geocoding API here.
                    // For this demo, we'll fill it with dummy data.
                    setFormData({
                        street: 'Rua Fictícia',
                        number: '123',
                        neighborhood: 'Bairro Modelo',
                        city: 'São Paulo',
                        state: 'SP',
                        zip: '01000-000',
                        complement: 'Apto 45',
                    });
                    setIsFormVisible(true);
                    setIsLoadingLocation(false);
                },
                (error) => {
                    console.error("Erro ao obter localização: ", error);
                    alert("Não foi possível obter sua localização. Verifique as permissões do navegador.");
                    setIsLoadingLocation(false);
                }
            );
        } else {
            alert("Geolocalização não é suportada por este navegador.");
            setIsLoadingLocation(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingAddress) {
            // Update
            setAddresses(prev => prev.map(addr => addr.id === editingAddress.id ? { ...formData, id: addr.id } : addr));
        } else {
            // Add new
            setAddresses(prev => [...prev, { ...formData, id: `addr-${Date.now()}` }]);
        }
        resetForm();
    };

    const handleEdit = (address: Address) => {
        setEditingAddress(address);
        setFormData(address);
        setIsFormVisible(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Tem certeza que deseja excluir este endereço?")) {
            setAddresses(prev => prev.filter(addr => addr.id !== id));
        }
    };

    const resetForm = () => {
        setIsFormVisible(false);
        setEditingAddress(null);
        setFormData({
            street: '',
            number: '',
            complement: '',
            neighborhood: '',
            city: '',
            state: '',
            zip: '',
        });
    };

    return (
        <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-10 flex items-center bg-background-light/80 dark:bg-background-dark/80 p-4 pb-3 backdrop-blur-sm justify-between">
                <button onClick={onBack} aria-label="Voltar" className="text-text-primary-light dark:text-text-primary-dark flex size-10 items-center justify-center rounded-full">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight tracking-[-0.015em]">Meus Endereços</h1>
                <div className="size-10"></div>
            </header>

            <main className="flex-grow p-4 space-y-6 pb-24">
                {addresses.map(address => (
                    <div key={address.id} className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl shadow-sm">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <p className="font-bold text-text-primary-light dark:text-text-primary-dark">{address.street}, {address.number}</p>
                                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{address.neighborhood} - {address.city}/{address.state}</p>
                                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{address.zip}</p>
                                {address.complement && <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Complemento: {address.complement}</p>}
                            </div>
                            <div className="flex gap-2">
                                 <button onClick={() => handleEdit(address)} className="flex items-center justify-center rounded-lg h-9 w-9 bg-gray-100 dark:bg-gray-700 text-text-light dark:text-text-dark">
                                    <span className="material-symbols-outlined text-base">edit</span>
                                </button>
                                <button onClick={() => handleDelete(address.id)} className="flex items-center justify-center rounded-lg h-9 w-9 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                                    <span className="material-symbols-outlined text-base">delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {!isFormVisible && (
                    <div className="space-y-3 pt-4">
                        <button onClick={() => { setIsFormVisible(true); setEditingAddress(null); }} className="flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-center text-base font-bold text-white shadow-lg shadow-primary/30">
                            <span className="material-symbols-outlined mr-2">add</span>
                            Adicionar Novo Endereço
                        </button>
                         <button onClick={handleUseCurrentLocation} disabled={isLoadingLocation} className="flex w-full items-center justify-center rounded-xl border border-primary bg-transparent px-6 py-3 text-center text-base font-bold text-primary disabled:opacity-50">
                            {isLoadingLocation ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Buscando...
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined mr-2">my_location</span>
                                    Usar Localização Atual
                                </>
                            )}
                        </button>
                    </div>
                )}

                {isFormVisible && (
                    <form onSubmit={handleSubmit} className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl shadow-sm space-y-4 border-t-4 border-primary mt-6">
                        <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">{editingAddress ? 'Editar Endereço' : 'Novo Endereço'}</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="zip" className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">CEP</label>
                                <input type="text" name="zip" id="zip" value={formData.zip} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-border-light dark:border-border-dark shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark" required />
                            </div>
                             <div className="col-span-2">
                                <label htmlFor="street" className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Rua / Logradouro</label>
                                <input type="text" name="street" id="street" value={formData.street} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-border-light dark:border-border-dark shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark" required />
                            </div>
                             <div>
                                <label htmlFor="number" className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Número</label>
                                <input type="text" name="number" id="number" value={formData.number} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-border-light dark:border-border-dark shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark" required />
                            </div>
                             <div>
                                <label htmlFor="complement" className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Complemento</label>
                                <input type="text" name="complement" id="complement" value={formData.complement} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-border-light dark:border-border-dark shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark" />
                            </div>
                             <div className="col-span-2">
                                <label htmlFor="neighborhood" className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Bairro</label>
                                <input type="text" name="neighborhood" id="neighborhood" value={formData.neighborhood} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-border-light dark:border-border-dark shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark" required />
                            </div>
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Cidade</label>
                                <input type="text" name="city" id="city" value={formData.city} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-border-light dark:border-border-dark shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark" required />
                            </div>
                            <div>
                                <label htmlFor="state" className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Estado</label>
                                <input type="text" name="state" id="state" value={formData.state} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-border-light dark:border-border-dark shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark" required />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <button type="button" onClick={resetForm} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">Cancelar</button>
                            <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">{editingAddress ? 'Salvar Alterações' : 'Adicionar Endereço'}</button>
                        </div>
                    </form>
                )}
            </main>
        </div>
    );
};

export default Enderecos;
