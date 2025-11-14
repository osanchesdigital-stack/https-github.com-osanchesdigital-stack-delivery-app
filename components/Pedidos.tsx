import React from 'react';

const Pedidos: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4 pt-16 text-center h-full">
            <span className="material-symbols-outlined text-7xl text-text-secondary-light dark:text-text-secondary-dark opacity-50">
                receipt_long
            </span>
            <h2 className="mt-6 text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">Meus Pedidos</h2>
            <p className="mt-2 max-w-xs text-text-secondary-light dark:text-text-secondary-dark">
                Assim que você fizer um pedido, ele aparecerá aqui.
            </p>
        </div>
    );
};

export default Pedidos;
