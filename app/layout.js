import { Roboto } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContex";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "Hunt4Taste",
  description: "La tua cantina a portata di tap!",
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <CartProvider>
      <html lang="en">
        <body className={roboto.className}>{children}</body>
      </html>
    </CartProvider>
  );
}
