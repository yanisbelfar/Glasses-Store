import type { Metadata } from "next";
import { Playfair_Display, Lora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SearchOverlay from "@/components/SearchOverlay";
import QuickView from "@/components/QuickView";
import CartSidebar from "@/components/CartSidebar";
import BackToTop from "@/components/BackToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import { StoreProvider } from "@/lib/store";

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Newlook Optic Sidi Aiche",
  description:
    "Plus de 60 marques exclusives, essai virtuel 3D et conseil personnalisé a Sidi Aiche. Newlook Optic Sidi Aiche reinvente l'optique.",
  keywords: [
    "lunettes",
    "opticien",
    "Sidi Aiche",
    "monture",
    "Dior",
    "Polaroid",
    "essai virtuel",
    "GIVENCHY",
    "KENZO",
    "Skechers",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${playfairDisplay.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <StoreProvider>
          <Navbar />
          <SearchOverlay />
          <QuickView />
          <CartSidebar />
          {children}
          <BackToTop />
          <WhatsAppButton />
        </StoreProvider>
      </body>
    </html>
  );
}
