import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
};

export const viewport: Viewport = {
  themeColor: "#08080a",
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
      className={`${geistSans.variable} ${geistMono.variable} dark scroll-smooth`}
    >
      <body className="min-h-screen bg-[#08080a] text-zinc-100 font-sans antialiased selection:bg-orange-500/30 selection:text-white bg-grid-pattern relative">
        {/* Ambient Top Glow Layer */}
        <div className="fixed inset-0 pointer-events-none bg-radial-gradient z-0" />

        {/* Main Application Content */}
        <div className="relative z-10 flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
