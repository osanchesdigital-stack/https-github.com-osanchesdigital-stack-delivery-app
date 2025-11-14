import React from 'react';

const Perfil: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4 pt-16 text-center h-full">
            <span className="material-symbols-outlined text-7xl text-text-secondary-light dark:text-text-secondary-dark opacity-50">
                person
            </span>
            <h2 className="mt-6 text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">Meu Perfil</h2>
            <p className="mt-2 max-w-xs text-text-secondary-light dark:text-text-secondary-dark">
                Funcionalidade em desenvolvimento. Em breve você poderá gerenciar seu perfil aqui.
            </p>
        </div>
    );
};

export default Perfil;
