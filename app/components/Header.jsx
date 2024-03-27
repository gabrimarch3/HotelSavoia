"use client";
import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import HamburgerMenu from "./HamburgerMenu";
import '../slideshow.css'

const Header = () => {
  const images = [
    "https://www.savoiahotelrimini.com/wp-content/uploads/2022/08/Slide-Spa-01-Savoia-Hotel-Rimini-2000x1250.jpg",
    "https://www.savoiahotelrimini.com/wp-content/uploads/2022/08/Slide-Spa-02-Savoia-Hotel-Rimini-2000x1250.jpg",
    "https://www.savoiahotelrimini.com/wp-content/uploads/2022/09/933_11617_228683-1170x780.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(
        (currentImageIndex) => (currentImageIndex + 1) % images.length
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="relative h-[30vh]">
      <TransitionGroup>
        <CSSTransition
          key={images[currentImageIndex]}
          timeout={500}
          classNames={{
            enter: 'fade-enter',
            enterActive: 'fade-enter-active',
            exit: 'fade-exit',
            exitActive: 'fade-exit-active'
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
            style={{
              backgroundImage: `url(${images[currentImageIndex]})`,
            }}
          ></div>
        </CSSTransition>
      </TransitionGroup>

      {/* Contenuto del header (incluso il logo) sopra il background */}
      <div className="absolute inset-0 z-10">
        <div
          className="absolute left-1/2 transform -translate-x-1/2"
          style={{ top: "75%" }}
        >
          <img
            src="https://scontent.fblq4-1.fna.fbcdn.net/v/t39.30808-6/429661223_898445618953155_4799295569043375114_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=-8pJlHvQrmYAX8F1nJe&_nc_ht=scontent.fblq4-1.fna&oh=00_AfAohzKhLE-mwJvQbi14Aut_oe1UP-p7BAvZnDotnwpQ4A&oe=6608E344"
            alt="Logo"
            className="w-[120px] h-[120px] rounded-lg z-10"
          />
        </div>

        <div className="relative z-10">
          <nav className="flex justify-between items-center p-4 w-full">
            <HamburgerMenu />
            <div></div>
          </nav>
          <div className="text-center py-20">
            <h1 className="text-white text-4xl uppercase tracking-widest"></h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
