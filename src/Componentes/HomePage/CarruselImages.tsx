import React, { useState } from 'react';

interface MultimediaInicioDTO {
  id: string;
  contenidoUrl: string;
  tipo: string;
  fechaCreacion: string;
}

interface CarouselProps {
  multimedia: MultimediaInicioDTO[];
}

const Carousel: React.FC<CarouselProps> = ({ multimedia }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % multimedia.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + multimedia.length) % multimedia.length
    );
  };

  return (
    <div className="relative max-w-md mx-auto overflow-hidden rounded-lg shadow-lg">
      <img
        src={multimedia[currentIndex].contenidoUrl}
        alt={`Carousel image ${currentIndex}`}
        className="w-full h-auto"
      />
      <button
        onClick={prevImage}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-colors"
      >
        &#8249;
      </button>
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-colors"
      >
        &#8250;
      </button>
    </div>
  );
};

export default Carousel;
