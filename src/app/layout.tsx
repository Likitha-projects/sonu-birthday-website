import type { Metadata } from "next";
import { Inter, Great_Vibes } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
});

export const metadata: Metadata = {
  title: "To My Dearest Chinna ❤️",
  description: "A very special surprise for the most beautiful person. Happy 21st Birthday, Sonu! ✨",
  openGraph: {
    title: "To My Dearest Chinna ❤️",
    description: "A very special surprise for the most beautiful person. Happy 21st Birthday, Sonu! ✨",
    url: "https://sonu-birthday-website-nine.vercel.app/",
    siteName: "Sonu's 21st Birthday",
    images: [
      {
        url: "https://sonu-birthday-website-nine.vercel.app/images/meta-image/chinna-birthday-collage.png",
        width: 1200,
        height: 630,
        alt: "Happy 21st Birthday Chinna",
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "To My Dearest Chinna ❤️",
    description: "A very special surprise for the most beautiful person. Happy 21st Birthday, Sonu! ✨",
    images: ["https://sonu-birthday-website-nine.vercel.app/images/meta-image/chinna-birthday-collage.png"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
