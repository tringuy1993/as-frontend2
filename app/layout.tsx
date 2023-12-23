import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/Theme-Provider";
import { SiteHeader } from "@/components/site-header";

// const inter = Inter({ subsets: ['latin'] })

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Alpha-Seekers",
  description: "Seeking Greek Alphas",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div vaul-drawer-wrapper="">
            <div className="relative flex min-h-screen flex-col bg-background">
              <SiteHeader />
              <main className="flex-1">{children}</main>
            </div>
          </div>
          {/* {children} */}
        </ThemeProvider>
      </body>
    </html>
  );
}
