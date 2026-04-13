import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CartSidebar from "@/components/CartSidebar";
import SearchOverlay from "@/components/SearchOverlay";
import QuickView from "@/components/QuickView";
import BackToTop from "@/components/BackToTop";
import { StoreProvider } from "@/lib/store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "New Look Optic | Opticien de Luxe en Algérie",
  description:
    "Découvrez notre collection exclusive de lunettes de luxe. Ray-Ban, Gucci, Dior, Prada. Livraison express partout en Algérie.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <StoreProvider>
          <Navbar />
          <SearchOverlay />
          <CartSidebar />
          <QuickView />
          {children}
          <BackToTop />
        </StoreProvider>
      </body>
    </html>
  );
}
