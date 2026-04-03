import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gitworkflowassistant.com"),
  title: {
    default: "Git Workflow Assistant",
    template: "%s | Git Workflow Assistant",
  },
  description:
    "Generate professional branch names, commit messages and pull request descriptions with a consistent Git workflow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <link rel="icon" href="/pani_cat_transparente.png" sizes="any" />
      <body
        className={`${inter.variable} scroll-minimal  min-h-screen font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
