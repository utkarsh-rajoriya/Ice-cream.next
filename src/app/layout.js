import "./globals.css";
import { Lobster, Anton } from "next/font/google"; // 1. Import Anton here

const lobster = Lobster({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-lobster',
});

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-anton',
});

export const metadata = {
  title: "Ice Cream Dream",
  description: "The sweetest ice cream in town",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lobster.variable} ${anton.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}