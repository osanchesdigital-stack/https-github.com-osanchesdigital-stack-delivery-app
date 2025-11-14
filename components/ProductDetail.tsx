import React, { useState, useMemo } from 'react';
import { PopularItem, ProductCustomization, Addon } from '../types';

interface ProductDetailProps {
    item: PopularItem;
    onBack: () => void;
    onAddToCart: (item: PopularItem, quantity: number, customization: ProductCustomization) => void;
    allAddons: Addon[];
}

const ProductDetail: React.FC<ProductDetailProps> = ({ item, onBack, onAddToCart, allAddons }) => {
    const [quantity, setQuantity] = useState(1);
    const [meatPoint, setMeatPoint] = useState('Ao ponto');
    const [addons, setAddons] = useState<{ [key: string]: boolean }>({});

    const availableAddons = useMemo(() => {
        if (!item.addonIds) return [];
        return allAddons.filter(addon => item.addonIds?.includes(addon.id));
    }, [allAddons, item.addonIds]);

    const handleQuantityChange = (amount: number) => {
        setQuantity((prev) => Math.max(1, prev + amount));
    };

    const handleAddonToggle = (addonId: string) => {
        setAddons((prev) => ({ ...prev, [addonId]: !prev[addonId] }));
    };
    
    const handleAddButtonClick = () => {
        const customization: ProductCustomization = { addons };
        if (item.name.includes('Picanha')) {
            customization.meatPoint = meatPoint;
        }
        onAddToCart(item, quantity, customization);
    };

    const basePrice = useMemo(() => parseFloat(item.price.replace('R$', '').replace(',', '.').trim()), [item.price]);

    const totalAddonPrice = useMemo(() => {
        return availableAddons.reduce((total, addon) => {
            if (addons[addon.id]) {
                return total + addon.price;
            }
            return total;
        }, 0);
    }, [addons, availableAddons]);

    const totalPrice = useMemo(() => {
        return (basePrice + totalAddonPrice) * quantity;
    }, [basePrice, totalAddonPrice, quantity]);

    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    return (
        <>
            {/* Top App Bar */}
            <div className="sticky top-0 z-10 flex items-center justify-between bg-background-light/80 dark:bg-background-dark/80 p-4 pb-2 backdrop-blur-sm">
                <button onClick={onBack} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-text-primary-light dark:text-text-primary-dark">
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                </button>
                <h2 className="flex-1 text-lg font-bold leading-tight tracking-[-0.015em] text-text-primary-light dark:text-text-primary-dark text-center">Detalhes do Produto</h2>
                <button className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-text-primary-light dark:text-text-primary-dark">
                    <span className="material-symbols-outlined text-2xl">favorite_border</span>
                </button>
            </div>

            {/* Main Content */}
            <main className="flex-grow pb-32">
                {/* Header Image */}
                <div className="px-4">
                    <div className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-xl min-h-80 shadow-md" style={{ backgroundImage: `url("${item.image}")` }}></div>
                </div>

                {/* Product Info Card */}
                <div className="px-4">
                    <h1 className="text-text-primary-light dark:text-text-primary-dark tracking-tight text-[32px] font-bold leading-tight text-left pb-2 pt-6">{item.name}</h1>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-base font-normal leading-normal pb-3">{item.description}</p>
                    <h2 className="text-primary tracking-light text-[28px] font-bold leading-tight text-left pb-3 pt-4">{formatCurrency(basePrice)}</h2>
                </div>
                <div className="px-4 my-4 border-b border-border-light dark:border-border-dark"></div>

                {/* Customization Section */}
                <div className="flex flex-col gap-6 px-4">
                    {item.name.includes('Picanha') && (
                        <div>
                            <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark mb-3">Escolha o ponto da carne</h3>
                            <div className="flex flex-col gap-3">
                                {['Mal passado', 'Ao ponto', 'Bem passado'].map(point => (
                                     <label key={point} className="flex items-center justify-between rounded-lg border border-border-light dark:border-border-dark p-4 cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                        <span className="font-semibold text-text-primary-light dark:text-text-primary-dark">{point}</span>
                                        <input checked={meatPoint === point} onChange={() => setMeatPoint(point)} className="form-radio text-primary focus:ring-primary" name="ponto_carne" type="radio"/>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {availableAddons.length > 0 && (
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">Adicionais</h3>
                                <span className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Opcional</span>
                            </div>
                            <div className="flex flex-col gap-3">
                               {availableAddons.map(addon => (
                                   <label key={addon.id} className="flex items-center justify-between rounded-lg border border-border-light dark:border-border-dark p-4 cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                        <div>
                                            <span className="font-semibold text-text-primary-light dark:text-text-primary-dark">{addon.name}</span>
                                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">+ {formatCurrency(addon.price)}</p>
                                        </div>
                                        <input checked={!!addons[addon.id]} onChange={() => handleAddonToggle(addon.id)} className="form-checkbox rounded text-primary focus:ring-primary" type="checkbox"/>
                                    </label>
                               ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>

             {/* Sticky Footer / CTA */}
            <div className="fixed bottom-0 left-0 right-0 z-10 bg-surface-light/90 dark:bg-surface-dark/90 p-4 backdrop-blur-sm border-t border-border-light dark:border-border-dark">
                <div className="flex items-center justify-between gap-4">
                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-2 rounded-lg bg-background-light dark:bg-surface-dark p-1">
                        <button onClick={() => handleQuantityChange(-1)} className="flex h-10 w-10 items-center justify-center rounded-md text-primary text-2xl font-bold">-</button>
                        <span className="w-8 text-center text-lg font-bold text-text-primary-light dark:text-text-primary-dark">{quantity}</span>
                        <button onClick={() => handleQuantityChange(1)} className="flex h-10 w-10 items-center justify-center rounded-md text-primary text-2xl font-bold">+</button>
                    </div>
                    {/* Add to Cart Button */}
                    <button onClick={handleAddButtonClick} className="flex h-14 flex-1 items-center justify-center rounded-xl bg-primary px-6 text-base font-bold text-white shadow-lg shadow-primary/30">
                        <span>Adicionar - {formatCurrency(totalPrice)}</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;