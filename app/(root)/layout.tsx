import type { Metadata } from "next";
import "../globals.css";
import Head from "next/head";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

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
            <body>
                <div className='layout'>
                    <Toaster />
                    <Head>
                        <title>AURA&apos;S STORE</title>
                    </Head>
                    <header>
                        <NavBar />
                    </header>
                    <main className="main-container">
                        {children}
                    </main>
                    <footer>
                        <Footer />
                    </footer>
                </div>
            </body>
        </html>
    );
}
