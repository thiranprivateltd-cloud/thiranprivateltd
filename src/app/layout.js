import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import ParticleBackground from "@/components/ParticleBackground";
import IntroScreen from "@/components/IntroScreen";
import Navbar from "@/components/Navbar";
import FloatingSocials from "@/components/FloatingSocials";
import Footer from "@/components/Footer";
import { IndependenceDayProvider } from "@/components/independence-day/IndependenceDayProvider";
import IndependenceDayOverlay from "@/components/independence-day/IndependenceDayOverlay";
import FloatingFlags from "@/components/independence-day/FloatingFlags";
import CustomCursor from "@/components/CustomCursor";
import Chatbot from "@/components/Chatbot";

export const metadata = {
  title: "Thiran Private Ltd | Smarter Steps Forward",
  description: "Thiran Private Ltd is a Chennai-based education-focused startup building AI-powered products (LaunchLab, NextStep) that guide, empower, and transform the lives of students across India.",
  keywords: ["Thiran", "Thiran Private Ltd", "NextStep", "LaunchLab", "Education Startup", "AI Career Guidance", "Chennai Startup", "E Erode student", "Varshith", "D Spark Web Solutions"],
  metadataBase: new URL("https://thiran.in"),
  openGraph: {
    title: "Thiran Private Ltd | Smarter Steps Forward",
    description: "Building the Future of Education in India through AI-powered student guidance ecosystems.",
    url: "https://thiran.in",
    siteName: "Thiran Private Ltd",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen bg-[#0A0A0A] text-white flex flex-col relative overflow-x-hidden font-body">
        <IndependenceDayProvider>
          <LanguageProvider>
            <CustomCursor />
            <IndependenceDayOverlay />
            <ParticleBackground />
            <IntroScreen />
            <Navbar />
            <main className="flex-grow w-full relative">
              {children}
            </main>
            <Footer />
            <FloatingSocials />
            <FloatingFlags />
            <Chatbot />
          </LanguageProvider>
        </IndependenceDayProvider>
      </body>
    </html>
  );
}
