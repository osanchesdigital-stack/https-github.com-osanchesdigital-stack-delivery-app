

import React, { useState, useEffect, useRef } from 'react';

interface ImageCarouselProps {
    images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    // FIX: Use ReturnType<typeof setTimeout> for browser compatibility instead of NodeJS.Timeout
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();
        if (images.length > 0) {
            timeoutRef.current = setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, 3000);
        }

        return () => {
            resetTimeout();
        };
    }, [currentIndex, images.length]);
    
    if (images.length === 0) {
        return (
            <div className="px-4 pt-2 pb-4">
                <div className="relative w-full h-48 overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">Nenhuma imagem no carrossel</p>
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 pt-2 pb-4">
            <div className="relative w-full h-48 overflow-hidden rounded-xl">
                <div className="flex h-full transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {images.map((src, index) => (
                        <div key={index} className="h-full w-full flex-shrink-0 bg-cover bg-center" style={{ backgroundImage: `url("${src}")` }}></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageCarousel;