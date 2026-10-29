import type { Metadata, Viewport } from "next";

import "./globals.css";



export const metadata: Metadata = {
  title: {
    template: "%s | Muhammad Usman Tahir",
    default: "Muhammad Usman Tahir — Web Developer | Problem Solver in C++",
  },
  description:
    "Portfolio of Muhammad Usman Tahir, BSCS student at University of Agriculture Faisalabad and Web Development Trainee at Saylani Welfare Trust. Seeking a Web Development Internship.",
  keywords: [
    "Muhammad Usman Tahir",
    "Web Developer",
    "Problem Solver in C++",
    "C++",
    "JavaScript",
    "TypeScript",
    "Redux",
    "React",
    "Next.js",
    "BSCS Student",
    "University of Agriculture Faisalabad",
    "Saylani Welfare Trust",
    "Frontend Development",
    "Pakistan",
  ],
  authors: [{ name: "Muhammad Usman Tahir" }],
  creator: "Muhammad Usman Tahir",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/Usman-CyberCode",
    title: "Muhammad Usman Tahir — Web Developer | Problem Solver in C++",
    description:
      "BSCS student at University of Agriculture Faisalabad with experience in front-end web technologies and C++ problem solving. Seeking a Web Development Internship.",
    siteName: "Muhammad Usman Tahir Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Usman Tahir — Web Developer | Problem Solver in C++",
    description:
      "BSCS student at University of Agriculture Faisalabad with experience in front-end web technologies and C++ problem solving. Seeking a Web Development Internship.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};


export const viewport: Viewport = {
  themeColor: "#04060d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="dark scroll-smooth"
    >
      <body className="min-h-screen bg-[#04060d] text-slate-100 font-sans antialiased selection:bg-blue-500/30 selection:text-white bg-grid-pattern relative">
        {/* Subtle Ambient Radial Vignette Layer */}
        <div className="fixed inset-0 pointer-events-none bg-radial-gradient z-0" />

        {/* Main Application Content */}
        <div className="relative z-10 flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
