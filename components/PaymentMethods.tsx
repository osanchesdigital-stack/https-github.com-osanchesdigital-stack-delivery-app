import React, { useState } from 'react';
import { PaymentMethod } from '../types';

interface PaymentMethodsProps {
    onBack: () => void;
    paymentMethods: PaymentMethod[];
    setPaymentMethods: React.Dispatch<React.SetStateAction<PaymentMethod[]>>;
}

const getCardBrand = (cardNumber: string): string => {
    const firstDigit = cardNumber.charAt(0);
    if (firstDigit === '4') return 'Visa';
    const firstTwoDigits = parseInt(cardNumber.substring(0, 2), 10);
    if (firstTwoDigits >= 51 && firstTwoDigits <= 55) return 'Mastercard';
    if (firstTwoDigits === 34 || firstTwoDigits === 37) return 'American Express';
    return 'Cartão';
};


const PaymentMethods: React.FC<PaymentMethodsProps> = ({ onBack, paymentMethods, setPaymentMethods }) => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target;
        if (name === 'cardNumber') {
            value = value.replace(/\D/g, '').slice(0, 16);
            value = value.replace(/(.{4})/g, '$1 ').trim();
        }
        if (name === 'expiryDate') {
            value = value.replace(/\D/g, '').slice(0, 4);
            if (value.length > 2) {
                value = value.slice(0, 2) + '/' + value.slice(2);
            }
        }
        if (name === 'cvv') {
            value = value.replace(/\D/g, '').slice(0, 4);
        }
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const cardNumberRaw = formData.cardNumber.replace(/\s/g, '');
        if (cardNumberRaw.length < 13 || cardNumberRaw.length > 16) {
            alert("Número de cartão inválido.");
            return;
        }

        const newPaymentMethod: PaymentMethod = {
            id: `pm-${Date.now()}`,
            last4: cardNumberRaw.slice(-4),
            cardHolder: formData.cardHolder,
            expiryDate: formData.expiryDate,
            brand: getCardBrand(cardNumberRaw),
        };

        setPaymentMethods(prev => [...prev, newPaymentMethod]);
        resetForm();
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Tem certeza que deseja remover esta forma de pagamento?")) {
            setPaymentMethods(prev => prev.filter(pm => pm.id !== id));
        }
    };

    const resetForm = () => {
        setIsFormVisible(false);
        setFormData({
            cardNumber: '',
            cardHolder: '',
            expiryDate: '',
            cvv: ''
        });
    };

    const getBrandIcon = (brand: string) => {
        switch(brand) {
            case 'Visa': return <span className="text-2xl font-bold text-blue-700 italic">VISA</span>;
            case 'Mastercard': return <svg className="w-10 h-10" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pi-mastercard"><title id="pi-mastercard">Mastercard</title><path opacity=".8" d="M38 12a12 12 0 0 1-24 0 12 12 0 0 1 24 0Z" fill="#F8A01B"/><path d="M12 12a12 12 0 0 0 24 0 12 12 0 0 0-24 0Z" fill="#E8243A"/><path d="M24 12a12 12 0 0 1-12 12 12 12 0 0 0 0-24 12 12 0 0 1 12 12Z" fill="#F8A01B"/></svg>;
            case 'American Express': return <span className="text-xl font-bold text-blue-600">AMEX</span>;
            default: return <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark text-3xl">credit_card</span>
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-10 flex items-center bg-background-light/80 dark:bg-background-dark/80 p-4 pb-3 backdrop-blur-sm justify-between">
                <button onClick={onBack} aria-label="Voltar" className="text-text-primary-light dark:text-text-primary-dark flex size-10 items-center justify-center rounded-full">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight tracking-[-0.015em]">Formas de Pagamento</h1>
                <div className="size-10"></div>
            </header>

            <main className="flex-grow p-4 space-y-6 pb-24">
                {paymentMethods.map(pm => (
                    <div key={pm.id} className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center size-12 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                {getBrandIcon(pm.brand)}
                            </div>
                            <div>
                                <p className="font-bold text-text-primary-light dark:text-text-primary-dark">{pm.brand} •••• {pm.last4}</p>
                                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Expira em {pm.expiryDate}</p>
                            </div>
                        </div>
                        <button onClick={() => handleDelete(pm.id)} className="flex items-center justify-center rounded-lg h-9 w-9 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30">
                            <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                    </div>
                ))}

                {!isFormVisible && (
                    <div className="pt-4">
                        <button onClick={() => setIsFormVisible(true)} className="flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-center text-base font-bold text-white shadow-lg shadow-primary/30">
                            <span className="material-symbols-outlined mr-2">add_card</span>
                            Adicionar Novo Cartão
                        </button>
                    </div>
                )}

                {isFormVisible && (
                    <form onSubmit={handleSubmit} className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl shadow-sm space-y-4 border-t-4 border-primary mt-6">
                        <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">Adicionar Cartão</h3>
                        <div>
                            <label htmlFor="cardNumber" className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Número do Cartão</label>
                            <input type="text" name="cardNumber" id="cardNumber" value={formData.cardNumber} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-border-light dark:border-border-dark shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark" placeholder="0000 0000 0000 0000" required />
                        </div>
                        <div>
                            <label htmlFor="cardHolder" className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Nome no Cartão</label>
                            <input type="text" name="cardHolder" id="cardHolder" value={formData.cardHolder} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-border-light dark:border-border-dark shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark" placeholder="Seu nome completo" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="expiryDate" className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Validade</label>
                                <input type="text" name="expiryDate" id="expiryDate" value={formData.expiryDate} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-border-light dark:border-border-dark shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark" placeholder="MM/AA" required />
                            </div>
                            <div>
                                <label htmlFor="cvv" className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">CVV</label>
                                <input type="text" name="cvv" id="cvv" value={formData.cvv} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-border-light dark:border-border-dark shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark" placeholder="123" required />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <button type="button" onClick={resetForm} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">Cancelar</button>
                            <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">Adicionar Cartão</button>
                        </div>
                    </form>
                )}
            </main>
        </div>
    );
};

export default PaymentMethods;
