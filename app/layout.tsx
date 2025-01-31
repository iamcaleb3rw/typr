import type { Metadata } from "next";

import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";
import MetaDataImg from "@/public/MdImg.png";
export const metadata: Metadata = {
  title: "Typr | Playground",
  description:
    "The best HTML, CSS and Javascript playground for web developers.",
  openGraph: {
    images: [
      {
        url: MetaDataImg.src,
        alt: "Visit the Typr Playground",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className={GeistSans.className}>
        <body>
          <ThemeProvider defaultTheme="light" attribute="class">
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
