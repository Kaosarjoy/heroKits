import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/navbar";
import Footer from "@/components/layouts/Footer";
import localFont from 'next/font/local'

export const fontBangla = localFont({
  src: './../fonts/mayaboti-normal.ttf',
})

const poppins = Poppins({
  weight:['100','200','400','500','800']
})

export const metadata = {
  title :{
defalut: "Hero Kids",
  template: "%s | hero kids",
  }
  
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        <header className="py-2 md:w-11/12 mx-auto">
          <Navbar></Navbar>
        </header>
        <main className="py-2 md:w-11/12 mx-auto min-h-[calc(100vh-302px)]">
          {children}
        </main>
       <footer>
         <Footer></Footer>
       </footer>
      </body>
    </html>
  );
}
//ui components
//https://www.heroui.com/docs/components/card 
//https://chakra-ui.com/docs/components/card 
//10 min 




