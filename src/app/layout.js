import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import ParticleBackground from "@/components/ParticleBackground";
import IntroScreen from "@/components/IntroScreen";
import Navbar from "@/components/Navbar";
import FloatingSocials from "@/components/FloatingSocials";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Chatbot from "@/components/Chatbot";

export const metadata = {
  title: "Thiran Private Ltd | Smarter Steps Forward",
  description: "Thiran Private Ltd is an Indian education and technology firm building AI guidance engines (NextStep) and enterprise digital platforms (LaunchLab). Headquartered in Chennai, Tamil Nadu.",
  keywords: ["Thiran", "Thiran Private Ltd", "NextStep", "LaunchLab", "Indian Education Startup", "AI Career Guidance", "Chennai Startup", "Erode", "Varshith"],
  metadataBase: new URL("https://thiran.in"),
  openGraph: {
    title: "Thiran Private Ltd | Smarter Steps Forward",
    description: "Building the Future of Education in India through AI-powered student guidance ecosystems.",
    url: "https://thiran.in",
    siteName: "Thiran Private Ltd",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col relative overflow-x-hidden font-body">
        <ThemeProvider>
          <LanguageProvider>
            <CustomCursor />
            <ParticleBackground />
            <IntroScreen />
            <Navbar />
            <main className="flex-grow w-full relative">
              {children}
            </main>
            <Footer />
            <FloatingSocials />
            <Chatbot />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
