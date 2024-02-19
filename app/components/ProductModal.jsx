'use client';
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { BsCalendar2Date } from "react-icons/bs";
import { LiaWineBottleSolid, LiaCheeseSolid } from "react-icons/lia";
import { TbTemperature } from "react-icons/tb";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "#fff",
    borderRadius: "15px",
    boxShadow: "0 12px 28px rgba(0, 0, 0, 0.25)",
    overflow: "visible",
    transition: "all 0.3s",
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  background: "#8B487E",
  color: "white",
  padding: theme.spacing(2),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "relative",
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  marginTop: "15px",
  padding: theme.spacing(2),
  color: "#444",
  "& p": {
    margin: theme.spacing(1, 0),
  },
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(1),
  justifyContent: "flex-end",
  background: "#f8f8f8",
  transition: "background-color 0.3s",
  display: "flex",
  justifyContent: "center",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: "#8B487E",
  fontWeight: "bold",
  width: "70%",
  margin: theme.spacing(1),
  "&:hover": {
    backgroundColor: "#863854",
    color: "white",
    transform: "scale(1.05)",
  },
  transition: "transform 0.2s, background-color 0.3s",
  display: "flex",
  alignItems: "center",
}));

const flagIcons = {
  it: "🇮🇹",
  en: "🇬🇧",
  fr: "🇫🇷",
  de: "🇩🇪",
  ru: "🇷🇺",
};

const ProductModal = ({ isOpen, onClose, product, addToCart }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("it");

  const handleChangeLanguage = (language) => {
    setSelectedLanguage(language === selectedLanguage ? product.language : language);
  };

  const getTranslation = () => {
    const translation = product.translations.find(
      (translation) => translation.language === selectedLanguage
    );

    if (!translation || selectedLanguage === product.language) {
      return {
        name: product.name,
        description: product.description,
      };
    }

    return {
      name: translation.translated_name,
      description: translation.translated_description,
    };
  };

  if (!product) return null;

  return (
    <StyledDialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="product-dialog-title"
      fullWidth
      maxWidth="md"
    >
      <StyledDialogTitle id="product-dialog-title">
        <div className="flex justify-between items-center flex-col">
          <div>
            <h2 className="text-2xl font-light text-[#ffffff]">
              {getTranslation().name}
            </h2>
          </div>
          <span className="text-3xl font-light text-[#ffffff] md:mt-0 self-start">
            {product.price}€
          </span>
        </div>
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{
            position: "absolute",
            right: "-10px",
            top: "-12px",
            color: "#8B487E",
            backgroundColor: "white",
            borderRadius: "50%",
            padding: "0",
            minWidth: "32px",
            height: "32px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
            zIndex: 20,
          }}
        >
          <CloseIcon />
        </IconButton>
      </StyledDialogTitle>
      <StyledDialogContent>
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={product.image_url}
              alt={product.name}
              className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            />
          </div>

          <div className="md:w-1/2 mt-4 md:mt-0 space-y-2 overflow-auto">
            <div>
              <span
                onClick={() => handleChangeLanguage("it")}
                style={{
                  cursor: "pointer",
                  marginRight: "5px",
                  fontSize: "1.5rem",
                }}
              >
                🇮🇹
              </span>
              {product.translations.map((translation) => (
                <span
                  key={translation.language}
                  onClick={() => handleChangeLanguage(translation.language)}
                  style={{
                    cursor: "pointer",
                    marginRight: "5px",
                    fontSize: "1.5rem",
                  }}
                >
                  {flagIcons[translation.language]}
                </span>
              ))}
            </div>
            <p className="text-gray-600 font-light">
              {getTranslation().description}
            </p>
            <div className="flex items-center gap-2 font-light">
              <BsCalendar2Date className="w-8 h-8" />
              <p>Annata: {product.year}</p>
            </div>
            <div className="flex items-center gap-2 font-light">
              <LiaWineBottleSolid className="w-8 h-8" />
              <p>Alcol: {product.alcol}</p>
            </div>
            <div className="flex items-center gap-2 font-light">
              <TbTemperature className="w-8 h-8" />
              <p>Temperatura di servizio: {product.service_temp}°C</p>
            </div>
            <div className="flex items-center gap-2 font-light">
              <LiaCheeseSolid className="w-8 h-8" />
              <p>Abbinamenti: {product.pairings}</p>
            </div>
          </div>
        </div>
      </StyledDialogContent>
      <StyledDialogActions>
        <StyledButton
          style={{
            backgroundColor: "#c5b473",
            color: "white",
            width: "80%",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
            zIndex: 20,
          }}
          onClick={() => {
            addToCart(product);
            onClose();
          }}
          className="rounded-xl"
        >
          Aggiungi al Carrello
        </StyledButton>
      </StyledDialogActions>
    </StyledDialog>
  );
};

export default ProductModal;

