// app/layout.tsx
import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { Roboto_Mono, Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";
import ColorStyles from "@/components/shared/color-styles/color-styles";
import Scrollbar from "@/components/ui/scrollbar";
import "styles/main.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aiready.localhowl.com"),
  title: {
    default: "Localhowl AI-Ready Scanner",
    template: "%s · Localhowl AI-Ready Scanner",
  },
  description: "Check if your site is AI-ready by Localhowl",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=5" },
      { url: "/favicon.png?v=5", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png?v=5", sizes: "180x180" }],
    shortcut: "/favicon.ico?v=5",
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg?v=5", color: "#0865FC" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    url: "/",
    title: "Localhowl AI-Ready Scanner",
    description: "Check if your site is AI-ready by Localhowl",
    images: [{ url: "/og.png?v=5", width: 1200, height: 630, alt: "AI-Ready Scanner" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Localhowl AI-Ready Scanner",
    description: "Check if your site is AI-ready by Localhowl",
    images: ["/og.png?v=5"],
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
  other: {
    "msapplication-TileColor": "#0865FC",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorStyles />
        {/* Optional: preconnects (not needed for next/font) 
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /> 
        */}
      </head>
      <body
        className={`${poppins.variable} ${GeistMono.variable} ${robotoMono.variable} font-sans text-foreground bg-background-base overflow-x-clip`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="overflow-x-clip">{children}</main>
          <Scrollbar />
        </ThemeProvider>
      </body>
    </html>
  );
}
