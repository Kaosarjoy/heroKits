import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/navbar";
import Footer from "@/components/layouts/Footer";
import localFont from "next/font/local";
import NextAuthProvider from "@/provider/NextAuthProvider";

// Bangla font
export const fontBangla = localFont({
  src: "./../fonts/mayaboti-normal.ttf",
});

// Google font
const poppins = Poppins({
  weight: ["100", "200", "400", "500", "800"],
  subsets: ["latin"],
});

// ✅ Production Metadata
export const metadata = {
  metadataBase: new URL("https://hero-kids-orpin.vercel.app"),

  title: {
    default: "Hero Kids - Best Toys for Kids",
    template: "%s | Hero Kids",
  },

  description:
    "Hero Kids is your trusted online toy shop. Explore high-quality, safe, and fun toys for kids of all ages.",

  keywords: [
    "kids toys",
    "baby toys",
    "educational toys",
    "Hero Kids",
    "toy shop Bangladesh",
  ],

  authors: [{ name: "Hero Kids Team" }],
  creator: "Hero Kids",
  publisher: "Hero Kids",

  openGraph: {
    title: "Hero Kids - Best Toys for Kids",
    description:
      "Shop fun, safe, and educational toys for your kids at Hero Kids.",
    url: "https://hero-kids-orpin.vercel.app",
    siteName: "Hero Kids",
    images: [
      {
        url: "https://i.ibb.co.com/1fsD0fVG/homepage-preview.png",
        width: 1200,
        height: 630,
        alt: "Hero Kids Homepage Preview",
      },
      {
        url: "https://i.ibb.co.com/qYTzSbbM/product-preview.png",
        width: 1200,
        height: 630,
        alt: "Product Page Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Hero Kids - Best Toys for Kids",
    description:
      "Explore amazing toys for kids. Safe, fun & educational!",
    images: ["https://i.ibb.co.com/1fsD0fVG/homepage-preview.png"],
  },

  icons: {
    icon: "https://i.ibb.co.com/JP7wW6K/logo.png",
    shortcut: "https://i.ibb.co.com/JP7wW6K/logo.png",
    apple: "https://i.ibb.co.com/JP7wW6K/logo.png",
  },

  alternates: {
    canonical: "https://hero-kids-orpin.vercel.app",
  },

  category: "ecommerce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        {/* NextAuthProvider কে বডির ভেতরে নিয়ে আসুন */}
        <NextAuthProvider>
          
          {/* Navbar */}
          <header className="py-2 md:w-11/12 mx-auto">
            <Navbar />
          </header>

          {/* Main Content */}
          <main className="py-2 md:w-11/12 mx-auto min-h-screen">
            {children}
          </main>

          {/* Footer */}
          <footer className="mt-5">
            <Footer />
          </footer>

        </NextAuthProvider>
      </body>
    </html>
    
  );

}

//https://chatgpt.com/s/t_694546b1897c81918a77b0904c27264c
//11 min 

//Note -> 72 no modules 7 no video ti google provider implementation er jonno. 13.4 sec
