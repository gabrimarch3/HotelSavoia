'use client'
import NavigationHeader from "../../components/NavigationHeader";
import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import "../../embla.css";
import SwiperCards from "../../components/SwiperCards";
import Footer from "../../components/Footer";
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from "next/image";

const images = [
  {
    id: 1,
    imageUrl: "https://images.pexels.com/photos/2339181/pexels-photo-2339181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 2,
    imageUrl: "https://images.pexels.com/photos/2339181/pexels-photo-2339181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 3,
    imageUrl: "https://images.pexels.com/photos/2339181/pexels-photo-2339181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 4,
    imageUrl: "https://images.pexels.com/photos/2339181/pexels-photo-2339181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];


const WineHouse = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const pathname = usePathname();
  const router = useRouter();
  const cardId = pathname.split('/')[2];
  const [card, setCard] = useState(null);

  useEffect(() => {
    if (cardId) {
      // Effettua una chiamata API per ottenere i dettagli della card
      fetch(`https://hunt4taste.it/api/cards/${cardId}`) // Sostituisci con l'URL corretto per il tuo controller API
        .then((response) => response.json())
        .then((data) => setCard(data))
        .catch((error) => console.error("Errore nella chiamata API:", error));
    }
  }, [cardId]);

  if (!card) {
    return <div>Caricamento...</div>;
  }

  return (
    <div className="bg-transparent text-gray-800 font-serif min-h-screen">
      <NavigationHeader />
  
      {/* Modernized Carousel */}
      <div className="flex justify-center items-center w-full my-8">
        <div className="embla shadow-lg rounded-lg overflow-hidden lg:max-w-4xl mx-auto">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {images.map((image) => (
                <div className="embla__slide" key={image.id}>
                  <Image
  className="embla__slide__img rounded-lg transform hover:scale-105 transition-transform duration-500 ease-in-out"
  src={image.imageUrl}
  alt="Wine selection"
  layout="fill"
  objectFit="cover"
/>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  
      {/* Refined Typography and Spacing */}
      <div className="flex flex-col w-full px-5 py-3">
        <h3 className="text-3xl text-[#863854] font-semibold mb-3 lg:mb-5 lg:mt-3">{card.title}</h3>
        <p className="text-gray-600 font-medium lg:px-5">
          {card.description}
        </p>
        {/* Map over the pages to display titles and contents */}
        {card.pages.map(page => (
          <div key={page.id} className="my-4">
            <h4 className="text-xl text-[#863854] font-semibold mb-2">{page.title}</h4>
            <p className="text-gray-600">{page.content}</p>
          </div>
        ))}
      </div>
  
      {/* Enhanced "IN CANTINA" Section */}
      <div className="pl-5 pt-5 pb-10 lg:px-5">
        <h3 className="text-2xl text-[#7B7C7C] mb-4">IN CANTINA</h3>
        <SwiperCards />
      </div>
  
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default WineHouse;
