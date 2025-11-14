import React from 'react';

interface OrderConfirmationProps {
    onGoHome: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ onGoHome }) => {
    return (
        <div className="flex flex-col flex-1 w-full max-w-lg mx-auto p-4 justify-center items-center text-center text-text-primary-dark from-primary/10 via-background-dark to-background-dark bg-gradient-to-b">
            {/* Animated Icon */}
            <div className="relative flex items-center justify-center w-28 h-28 mb-6">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse"></div>
                <div className="relative flex items-center justify-center w-24 h-24 bg-primary/20 rounded-full">
                     <span className="material-symbols-outlined text-primary text-6xl">check_circle</span>
                </div>
            </div>

            {/* Confirmation Text */}
            <h1 className="text-text-primary-dark tracking-tight text-4xl font-extrabold leading-tight px-4 pb-2">Pedido Confirmado!</h1>
            <p className="text-text-secondary-dark text-base font-medium leading-relaxed pb-8 px-4 max-w-sm">Seu pedido foi recebido e já está sendo preparado com todo o carinho. Bom apetite!</p>
            
            {/* Order Details */}
            <div className="w-full flex flex-col items-stretch justify-start rounded-xl bg-surface-dark p-6 mb-8 border border-primary/30 shadow-xl shadow-black/20">
                <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-4 text-left">
                    <p className="text-text-primary-dark text-lg font-bold leading-tight tracking-[-0.015em]">Pedido <span className="text-primary">#12345</span></p>
                    <div className="w-full h-px bg-border-dark my-1"></div>
                    <div className="flex items-center gap-3 justify-start">
                        <span className="material-symbols-outlined text-primary text-2xl">schedule</span>
                        <p className="text-text-secondary-dark text-base font-normal leading-normal">Tempo estimado de entrega: <span className="font-bold text-text-primary-dark">35-45 min</span></p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 w-full max-w-xs">
                <button onClick={onGoHome} className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 flex-1 bg-primary text-white text-lg font-bold leading-normal tracking-[0.015em] transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 shadow-lg shadow-primary/30">
                    <span className="truncate">Voltar ao Início</span>
                </button>
            </div>
        </div>
    );
};

export default OrderConfirmation;