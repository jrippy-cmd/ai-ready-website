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
  title: {
    default: "Localhowl AI-Ready Scanner",
    template: "%s · Localhowl AI-Ready Scanner",
  },
  description: "Check if your site is AI-ready by Localhowl",
  icons: {
    // Keep /favicon.png if you’re using a single PNG in /public or app/icon.png for auto.
    icon: [{ url: "/favicon.png", type: "image/png" }],
    // Optional extras if you add the files to /public:
    // icon: [
    //   { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    //   { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    // ],
    apple: "/apple-touch-icon.png", // optional
    shortcut: "/favicon.ico",       // optional
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorStyles />
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
