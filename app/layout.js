import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: {
    default: "BookNook | Home",
    template: "BookNook | %s",
  },
  description:
    "A small online library. Add a book, borrow a book, return a book.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="caramellatte">
      <body className="flex min-h-screen flex-col bg-base-100 text-base-content">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
