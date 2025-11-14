import React, { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutProps {
    items: CartItem[];
    onBack: () => void;
    onConfirmOrder: () => void;
}

const OrderSummary: React.FC<{items: CartItem[]}> = ({items}) => {
    const deliveryFee = 5.90;
    
    const subtotal = items.reduce((total, item) => {
        const price = parseFloat(item.price.replace('R$', '').replace(',', '.').trim());
        // Note: This doesn't account for addons in the summary, matching the static HTML.
        // For a real app, addon prices would need to be stored and calculated here.
        return total + (price * item.quantity);
    }, 0);
    
    const total = subtotal + deliveryFee;

    const formatCurrency = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return (
        <div className="space-y-4 bg-surface-light dark:bg-surface-dark p-4 rounded-lg shadow-sm">
            <div className="space-y-2">
                {items.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-text-primary-light dark:text-text-primary-dark">
                        <span>{item.quantity}x {item.name}</span>
                        <span>{formatCurrency(parseFloat(item.price.replace('R$', '').replace(',', '.').trim()) * item.quantity)}</span>
                    </div>
                ))}
            </div>
            <div className="border-t border-dashed border-border-light dark:border-border-dark pt-4 space-y-2">
                <div className="flex justify-between items-center text-text-secondary-light dark:text-text-secondary-dark">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-text-secondary-light dark:text-text-secondary-dark">
                    <span>Taxa de Entrega</span>
                    <span>{formatCurrency(deliveryFee)}</span>
                </div>
            </div>
            <div className="border-t border-border-light dark:border-border-dark pt-3">
                <div className="flex justify-between items-center text-text-primary-light dark:text-text-primary-dark text-lg font-bold">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                </div>
            </div>
        </div>
    );
};

const Checkout: React.FC<CheckoutProps> = ({ items, onBack, onConfirmOrder }) => {
    const [paymentMethod, setPaymentMethod] = useState('Dinheiro');

    // Mapped icons for payment methods for easier scaling
    const paymentIcons: { [key: string]: string } = {
        'Cartão de Crédito': 'credit_card',
        'Pix': 'qr_code_2',
        'Dinheiro': 'payments'
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col">
            {/* Top App Bar */}
            <header className="sticky top-0 z-10 flex items-center bg-surface-light dark:bg-surface-dark p-4 pb-3 shadow-sm justify-between">
                <button onClick={onBack} className="text-text-primary-light dark:text-text-primary-dark flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5">
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                </button>
                <h1 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight tracking-tight flex-1 text-center">Quase lá! Revise seu pedido</h1>
                <div className="size-10 shrink-0"></div>
            </header>

            <main className="flex-1 pb-32">
                {/* Delivery Section */}
                <section className="mt-4 px-4">
                    <h2 className="text-text-primary-light dark:text-text-primary-dark text-xl font-bold leading-tight tracking-tight mb-3">Entregar em</h2>
                    <div className="flex items-center gap-4 bg-surface-light dark:bg-surface-dark p-4 rounded-lg shadow-sm">
                        <div className="text-primary flex items-center justify-center rounded-full bg-primary/10 shrink-0 size-12">
                            <span className="material-symbols-outlined text-3xl">maps_home_work</span>
                        </div>
                        <div className="flex flex-col justify-center flex-1">
                            <p className="text-text-primary-light dark:text-text-primary-dark text-base font-semibold leading-normal line-clamp-1">Av. Paulista, 1578</p>
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-normal leading-normal line-clamp-2">Bela Vista, São Paulo - SP</p>
                        </div>
                        <button className="shrink-0 text-primary text-sm font-bold leading-normal hover:underline">Alterar</button>
                    </div>
                </section>

                {/* Payment Method Section */}
                <section className="mt-6 px-4">
                    <h2 className="text-text-primary-light dark:text-text-primary-dark text-xl font-bold leading-tight tracking-tight mb-3">Forma de Pagamento</h2>
                    <div className="flex flex-col gap-3">
                        {Object.keys(paymentIcons).map((method) => (
                             <label key={method} className="flex items-center gap-4 rounded-lg border border-solid border-border-light dark:border-border-dark p-4 bg-surface-light dark:bg-surface-dark has-[:checked]:border-primary has-[:checked]:ring-2 has-[:checked]:ring-primary/20">
                                <span className="material-symbols-outlined text-primary text-2xl">
                                    {paymentIcons[method]}
                                </span>
                                <div className="flex grow flex-col"><p className="text-text-primary-light dark:text-text-primary-dark text-base font-medium leading-normal">{method}</p></div>
                                <input
                                    className="h-5 w-5 border-2 border-border-light dark:border-border-dark bg-transparent text-primary focus:ring-primary/50 focus:ring-offset-0"
                                    name="payment-method"
                                    type="radio"
                                    checked={paymentMethod === method}
                                    onChange={() => setPaymentMethod(method)}
                                />
                            </label>
                        ))}
                    </div>
                    {paymentMethod === 'Dinheiro' && (
                        <div className="mt-3">
                            <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1.5" htmlFor="observations">Precisa de troco?</label>
                            <input className="w-full rounded-lg border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark placeholder:text-text-secondary-light/70 dark:placeholder:text-text-secondary-dark/70 focus:border-primary focus:ring-primary/50" id="observations" name="observations" placeholder="Ex: Troco para R$ 100,00" type="text"/>
                        </div>
                    )}
                </section>

                {/* Order Summary Section */}
                <section className="mt-6 px-4">
                    <h2 className="text-text-primary-light dark:text-text-primary-dark text-xl font-bold leading-tight tracking-tight mb-3">Resumo do Pedido</h2>
                    <OrderSummary items={items} />
                </section>
            </main>

            {/* CTA Footer */}
            <footer className="fixed bottom-0 left-0 right-0 bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-sm p-4 border-t border-border-light dark:border-border-dark">
                <button onClick={onConfirmOrder} className="w-full bg-primary text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-primary/30 hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/40 transition-all duration-300 ease-in-out text-lg">
                    Confirmar Pedido
                </button>
            </footer>
        </div>
    );
};

export default Checkout;