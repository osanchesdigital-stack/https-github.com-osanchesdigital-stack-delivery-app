import React from 'react';

const SearchBar: React.FC = () => {
    return (
        <div className="px-4 py-3">
            <label className="flex flex-col min-w-40 h-14 w-full">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-surface-light dark:bg-surface-dark shadow-sm">
                    <div className="text-text-secondary-light dark:text-text-secondary-dark flex items-center justify-center pl-4">
                        <span className="material-symbols-outlined">search</span>
                    </div>
                    <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 border-none bg-transparent h-full placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark px-2 text-base font-normal leading-normal" placeholder="O que você vai pedir hoje?" />
                </div>
            </label>
        </div>
    );
};

export default SearchBar;