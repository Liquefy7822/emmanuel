'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: {
    src: string;
    alt: string;
  }[];
  initialIndex: number;
}

export function Lightbox({ isOpen, onClose, images, initialIndex }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoaded, setIsLoaded] = useState(false);

  // Reset the current index when the lightbox is opened
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setIsLoaded(false);
      // Prevent scrolling when lightbox is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling when lightbox is closed
      document.body.style.overflow = 'auto';
    }

    // Cleanup function to reset the overflow when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, initialIndex]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setIsLoaded(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setIsLoaded(false);
  };

  if (!isOpen) return null;

  // Close on escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90"
          onClick={onClose}
        />
        <div className="min-h-screen px-4 text-center">
          
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl">
              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                className="absolute -top-12 right-0 z-10 p-2 text-white hover:text-gray-300 focus:outline-none"
                aria-label="Close lightbox"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Navigation buttons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-2 text-white hover:text-gray-300 focus:outline-none"
                    aria-label="Previous image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={goToNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-2 text-white hover:text-gray-300 focus:outline-none"
                    aria-label="Next image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}

              {/* Image counter */}
              {images.length > 1 && (
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white">
                  {currentIndex + 1} / {images.length}
                </div>
              )}

              {/* Image */}
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0.5 }}
                transition={{ duration: 0.2 }}
                className="relative aspect-video w-full"
              >
                <Image
                  src={images[currentIndex].src}
                  alt={images[currentIndex].alt}
                  fill
                  className="object-contain"
                  onLoadingComplete={() => setIsLoaded(true)}
                  priority
                />
                {!isLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-white"></div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
