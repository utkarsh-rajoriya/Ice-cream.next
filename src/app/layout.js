import "./globals.css";
import { Lobster, Anton } from "next/font/google";

const lobster = Lobster({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-lobster",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-anton",
});

export const metadata = {
  title: {
    default: "Brain Freeze | Premium Hand-Crafted Ice Cream",
    template: "%s | Brain Freeze",
  },
  description:
    "Experience the pure essence of elegance with Brain Freeze. Hand-crafted premium ice creams made from Madagascar vanilla, Belgian cocoa, and fresh organic fruit.",
  keywords: [
    "Ice Cream",
    "Gelato",
    "Premium Dessert",
    "Brain Freeze",
    "Organic Ice Cream",
    "Gourmet Sweets",
  ],
  creator: "Utkarsh Rajoriya",
  openGraph: {
    title: "Brain Freeze | Taste the Cold",
    description:
      "The sweetest ice cream in town. Made with love and premium ingredients.",
    siteName: "Brain Freeze",
    images: [
      {
        url: "/icecreams/strawberry-cream.png",
        width: 1200,
        height: 630,
        alt: "Brain Freeze Premium Strawberry Ice Cream",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brain Freeze | Premium Ice Creams",
    description:
      "The sweetest ice cream in town. Made with love and premium ingredients.",
    images: ["/icecreams/strawberry-cream.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${lobster.variable} ${anton.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
