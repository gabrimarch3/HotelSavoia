'use client';
import React, { useState, useEffect } from "react";
import NavigationHeader from "../components/NavigationHeader";
import ExperienceCard from "../components/ExperienceCard";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";

const Esperienze = () => {
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Adding a loading state

  useEffect(() => {
    fetch("https://hunt4taste.it/api/experiences")
      .then((response) => response.json())
      .then((data) => {
        setExperiences(data);
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Errore nella chiamata API:", error);
        setIsLoading(false); // Ensure loading is set to false even if there's an error
      });
  }, []);

  const truncateDescription = (desc) => {
    return desc.length > 100 ? desc.substring(0, 100) + "..." : desc;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen justify-center items-center">
        <p>Loading...</p>
      </div>
    ); // Simple loading state UI
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigationHeader />
      <div className="flex-grow">
        <div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience) => (
            <div
              className="flex flex-col bg-white rounded-lg shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg"
              key={experience.id}
            >
              <div className="flex-shrink-0">
              <Image src={experience.image_url} alt={experience.title} layout="responsive" width={500} height={300} objectFit="cover" className="w-full h-48 rounded-t-lg" />

              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <h3 className="text-gray-900 text-xl font-semibold mb-3">
                  {experience.title}
                </h3>
                <p className="text-gray-600 text-sm flex-1">
                  {truncateDescription(experience.description)}
                </p>
                <div className="mt-6 flex justify-end">
                  <Link legacyBehavior href={`/esperienze/${experience.id}`}>
                    <a className="text-white hover:text-indigo-900 font-semibold text-sm transition-colors duration-300 bg-[#8B487E] rounded-full py-2 px-4">
                      {experience.buttonText || 'Scopri'}
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Esperienze;

