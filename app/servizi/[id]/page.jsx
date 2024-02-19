'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import NavigationHeader from "../../components/NavigationHeader";
import Footer from "../../components/Footer";
import SwiperCards from "../../components/SwiperCards"; // Assumendo che vuoi mostrare altre carte di servizi correlati
import "swiper/css"; // Assicurati di importare gli stili necessari per Swiper
import ServicesSection from '../../components/Services';
import { FaTag , FaEuroSign } from "react-icons/fa";
import Image from 'next/image';

const ServiceDetailPage = () => {
    const pathname = usePathname();
    const serviceId = pathname.split('/')[2]; // Assumendo che l'URL sia /servizi/{id}
    const [service, setService] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      if (serviceId) {
        fetch(`https://hunt4taste.it/api/services/${serviceId}`)
          .then(response => response.json())
          .then(data => {
            setService(data);
            setIsLoading(false);
          })
          .catch(error => {
            console.error("Errore nella chiamata API:", error);
            setIsLoading(false);
          });
      }
    }, [serviceId]);
  
   
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Caricamento...</div>;
    }
    
    if (!service) {
        return <div className="flex justify-center items-center h-screen">Servizio non trovato.</div>;
    }
    
    return (
        <div className="bg-gray-100 text-gray-800 font-serif min-h-screen">
          <NavigationHeader />
    
          <div className="container mx-auto p-6">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Image src={service.image} alt={service.title} layout="responsive" width={500} height={300} objectFit="cover" className="w-full h-64" />
              <div className="p-4 space-y-4">
                <h2 className="text-3xl font-bold">{service.title}</h2>
                <p>{service.description}</p>
                {service.cost && (
                  <div className="flex items-center">
                    <FaEuroSign className="text-lg text-gray-600 mr-2" />
                    <p className="text-lg text-gray-600">Costo: €{service.cost}</p>
                  </div>
                )}
                {service.category && (
                  <div className="flex items-center">
                    <FaTag className="text-lg text-gray-600 mr-2" />
                    <p className="text-gray-600">Categoria: {service.category}</p>
                  </div>
                )}
              </div>
            </div>
    
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Servizi Correlati</h3>
              <ServicesSection isLoading={false} />
            </div>
    
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">In Cantina</h3>
              <SwiperCards />
            </div>
          </div>
    
          <Footer />
        </div>
    );
};
    
export default ServiceDetailPage;