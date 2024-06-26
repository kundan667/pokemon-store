import { Inter, Open_Sans, Oswald, Montserrat, Poppins } from 'next/font/google';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const oswald = Oswald({ subsets: ["latin"], weight: ["200", "300", "400", "500", "600", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], style: ["normal", "italic"] });

export const metadata = {
  title: "Pokemon Store",
  description: "This is pokemon store. which contains the list of all pokemon.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}  ${oswald.variable}  ${poppins.variable}`}>
      <head>
      </head>
      <body className={`${inter.className}  ${oswald.className}  ${poppins.className}`}>
        {children}
      </body>
    </html>
  );
}
