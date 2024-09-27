import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";
import { StateContext } from "@/context/stateContext";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ibm-plex-serif'
})

export const metadata: Metadata = {
  title: "Personal Portfolio",
  description: "This is my personal portfolio, check it out",
  icons: {
    icon: "/logo.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <ClerkProvider>
        <StateContext>
          <body className={`${inter.variable} ${ibmPlexSerif.variable}`}>
            {children}
          </body>
        </StateContext>
      </ClerkProvider>
    </html>
  );
}
