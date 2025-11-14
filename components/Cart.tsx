import React from 'react';
import { CartItem } from '../types';

interface CartProps {
    items: CartItem[];
    onBack: () => void;
    onUpdateQuantity: (itemId: string, amount: number) => void;
    onRemoveItem: (itemId: string) => void;
    onCheckout: () => void;
}

const CartListItem: React.FC<{ item: CartItem; onUpdateQuantity: CartProps['onUpdateQuantity']; onRemoveItem: CartProps['onRemoveItem'] }> = ({ item, onUpdateQuantity, onRemoveItem }) => {
    const basePrice = parseFloat(item.price.replace('R$', '').replace(',', '.').trim());
    const itemTotalPrice = basePrice * item.quantity;
    
    return (
        <div className="flex items-center gap-4 bg-surface-light dark:bg-surface-dark p-4 rounded-xl">
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-16 shrink-0" style={{ backgroundImage: `url("${item.image}")` }}></div>
            <div className="flex-grow">
                <p className="text-text-primary-light dark:text-text-primary-dark text-base font-bold leading-normal line-clamp-1">{item.name}</p>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-normal leading-normal">{item.price}</p>
                <div className="flex items-center gap-3 mt-2 text-text-primary-light dark:text-text-primary-dark">
                    <button onClick={() => onUpdateQuantity(item.id, -1)} className="text-lg font-medium leading-normal flex h-7 w-7 items-center justify-center rounded-full bg-border-light dark:bg-border-dark cursor-pointer">-</button>
                    <span className="text-base font-medium leading-normal w-4 text-center">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, 1)} className="text-lg font-medium leading-normal flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-primary cursor-pointer">+</button>
                </div>
            </div>
            <div className="flex flex-col items-end justify-between self-stretch">
                <button aria-label="Remover item" className="text-text-secondary-light dark:text-text-secondary-dark" onClick={() => onRemoveItem(item.id)}>
                    <span className="material-symbols-outlined text-xl">delete</span>
                </button>
                <p className="text-text-primary-light dark:text-text-primary-dark text-base font-bold leading-normal">
                     {itemTotalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
            </div>
        </div>
    );
};

const Cart: React.FC<CartProps> = ({ items, onBack, onUpdateQuantity, onRemoveItem, onCheckout }) => {
    const deliveryFee = 5.00;
    
    const subtotal = items.reduce((total, item) => {
        const price = parseFloat(item.price.replace('R$', '').replace(',', '.').trim());
        return total + (price * item.quantity);
    }, 0);
    
    const total = subtotal + deliveryFee;
    
    const formatCurrency = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return (
        <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-10 flex items-center bg-background-light/80 dark:bg-background-dark/80 p-4 pb-3 backdrop-blur-sm justify-between">
                <button onClick={onBack} aria-label="Voltar" className="text-text-primary-light dark:text-text-primary-dark flex size-10 items-center justify-center rounded-full">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight tracking-[-0.015em]">Meu Carrinho</h1>
                <div className="size-10"></div>
            </header>
            
            <main className="flex-grow px-4 pt-4 pb-48">
                {items.length > 0 ? (
                    <div className="space-y-4">
                        {items.map(item => (
                            <CartListItem key={item.id} item={item} onUpdateQuantity={onUpdateQuantity} onRemoveItem={onRemoveItem} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center h-full pt-16">
                         <span className="material-symbols-outlined text-6xl text-text-secondary-light dark:text-text-secondary-dark">shopping_cart_off</span>
                         <p className="mt-4 text-lg font-bold text-text-primary-light dark:text-text-primary-dark">Seu carrinho está vazio</p>
                         <p className="text-text-secondary-light dark:text-text-secondary-dark">Adicione itens para continuar.</p>
                    </div>
                )}
            </main>

            {items.length > 0 && (
                <footer className="fixed bottom-0 left-0 right-0 bg-surface-light dark:bg-surface-dark p-4 pt-5 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)] dark:shadow-none dark:border-t dark:border-border-dark/50" style={{ borderTopLeftRadius: '1.5rem', borderTopRightRadius: '1.5rem' }}>
                    <div className="w-full max-w-4xl mx-auto">
                        <div className="space-y-2 mb-5">
                            <h3 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight tracking-[-0.015em] mb-3">Resumo do Pedido</h3>
                            <div className="flex justify-between text-text-secondary-light dark:text-text-secondary-dark">
                                <p>Subtotal</p>
                                <p>{formatCurrency(subtotal)}</p>
                            </div>
                            <div className="flex justify-between text-text-secondary-light dark:text-text-secondary-dark">
                                <p>Taxa de Entrega</p>
                                <p>{formatCurrency(deliveryFee)}</p>
                            </div>
                            <div className="w-full h-px my-3 bg-border-light dark:bg-border-dark"></div>
                            <div className="flex justify-between text-text-primary-light dark:text-text-primary-dark text-lg font-extrabold">
                                <p>Total</p>
                                <p>{formatCurrency(total)}</p>
                            </div>
                        </div>
                        <button onClick={onCheckout} className="flex w-full items-center justify-center rounded-xl bg-primary px-6 py-4 text-center text-base font-bold text-white shadow-lg shadow-primary/30 hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50">
                            Finalizar Pedido
                        </button>
                    </div>
                </footer>
            )}
        </div>
    );
};

export default Cart;