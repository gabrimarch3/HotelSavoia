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
            src="https://scontent.frmi1-2.fna.fbcdn.net/v/t39.30808-6/309722054_524865076311213_6389479323561781529_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=K5XUP2yXAFUAX9WnRNi&_nc_ht=scontent.frmi1-2.fna&oh=00_AfB1Wtwb44S11uqutytNOjquAgm1oDHjdL1ZOkijb-KKOw&oe=65D776E9"
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