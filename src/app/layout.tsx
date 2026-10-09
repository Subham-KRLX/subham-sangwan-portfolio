import type { Metadata } from "next";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";

export const metadata: Metadata = {
  metadataBase: new URL("https://subham-sangwan-portfolio-kappa.vercel.app"),
  title: {
    default: "Subham Sangwan | Product and Full-Stack Developer",
    template: "%s | Subham Sangwan",
  },
  description:
    "Portfolio of Subham Sangwan, a product management intern, full-stack developer, and open-source contributor working with React, Next.js, Node.js, Python, and AI/ML.",
  keywords: [
    "Subham Sangwan",
    "product manager intern",
    "full-stack developer",
    "open-source contributor",
    "React developer",
    "Next.js developer",
  ],
  authors: [{ name: "Subham Sangwan" }],
  creator: "Subham Sangwan",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Subham Sangwan | Product and Full-Stack Developer",
    description:
      "Explore Subham Sangwan's product, full-stack development, competitive programming, and open-source work.",
    siteName: "Subham Sangwan Portfolio",
  },
  twitter: {
    card: "summary",
    title: "Subham Sangwan | Product and Full-Stack Developer",
    description:
      "Product management, full-stack development, and open-source work by Subham Sangwan.",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>SS</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <ErrorReporter />
        {children}
      </body>
    </html>
  );
}
