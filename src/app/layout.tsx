import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Parallel Base — Landing Pages & Ad Campaigns for Real Estate Agents",
  description:
    "High-performance landing pages and precision-targeted ad campaigns, fully integrated and built to convert. Stop guessing. Start closing.",
  metadataBase: new URL("https://parallelbase.io"),
  openGraph: {
    title: "Parallel Base — Landing Pages & Ad Campaigns for Real Estate Agents",
    description:
      "High-performance landing pages and precision-targeted ad campaigns, fully integrated and built to convert.",
    url: "https://parallelbase.io",
    siteName: "Parallel Base",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parallel Base",
    description:
      "High-performance landing pages and precision-targeted ad campaigns for real estate agents.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
