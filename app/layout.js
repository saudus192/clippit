import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import Provider from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Clippit - URL Shortener",
  description: "Shorten your long URLs in seconds — no signup required. Use our fast and simple URL shortener instantly without creating an account. Need more control? Create a free account to manage your links, track activity, and organize everything in one place.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className=""
    >
      <body className={`${inter.variable} ${poppins.variable} min-h-screen flex flex-col bg-slate-100`}>
        <Provider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
