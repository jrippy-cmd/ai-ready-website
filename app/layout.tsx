// app/layout.tsx
import { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { Roboto_Mono, Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";
import ColorStyles from "@/components/shared/color-styles/color-styles";
import Scrollbar from "@/components/ui/scrollbar";
import "styles/main.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400","500","600","700"], variable: "--font-sans" });
const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: ["400","500"], variable: "--font-roboto-mono" });

export const metadata: Metadata = {
  title: "Localhowl AI-Ready Scanner",
  description: "Check if your site is AI-ready by Localhowl",
  icons: { icon: "/favicon.png" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><ColorStyles /></head>
      <body className={`${poppins.variable} ${GeistMono.variable} ${robotoMono.variable} font-sans text-foreground bg-background-base overflow-x-clip`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="overflow-x-clip">{children}</main>
          <Scrollbar />
        </ThemeProvider>
      </body>
    </html>
  );
}
