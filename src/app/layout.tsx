import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/providers/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LUMA — Motion Design Studio",
  description:
    "LUMA is an independent motion design studio crafting bold, kinetic identities for ambitious brands. We blend animation, code, and storytelling.",
  keywords: [
    "motion design",
    "creative studio",
    "GSAP",
    "Framer Motion",
    "Next.js",
    "brand animation",
    "interactive",
  ],
  authors: [{ name: "LUMA Studio" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "LUMA — Motion Design Studio",
    description:
      "Independent motion design studio crafting bold, kinetic identities for ambitious brands.",
    url: "https://luma.studio",
    siteName: "LUMA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LUMA — Motion Design Studio",
    description:
      "Independent motion design studio crafting bold, kinetic identities for ambitious brands.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
