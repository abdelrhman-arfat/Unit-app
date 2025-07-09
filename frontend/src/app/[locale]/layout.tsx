import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import AppProvider from "../_RTK/AppProvider";
import Footer from "../_components/Layout/Footer";
import { LangInitializer } from "../_components/Layout/LangInitializer";
import { Toaster } from "react-hot-toast";
import RefreshToken from "../_components/Layout/RefreshToken";
const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FCI | Education",
  description:
    "Faculty platform that provide summary of the classes to the students ",
  authors: {
    name: "Abdo yasser",
    url: "https://abdoyasser.vercel.app",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const message = await getMessages();

  return (
    <html lang="en">
      <body className={`${roboto.variable} w-full antialiased`}>
        <Toaster position="top-center" />
        <AppProvider>
          <NextIntlClientProvider messages={message}>
            <LangInitializer />
            <RefreshToken />
            <div className="">{children}</div>
            <Footer />
          </NextIntlClientProvider>
        </AppProvider>
      </body>
    </html>
  );
}
