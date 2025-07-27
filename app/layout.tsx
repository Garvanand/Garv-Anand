import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Garv Anand - AI/ML & Full Stack Developer",
  description:
    "Portfolio of Garv Anand, B.Tech CSE (AI/ML) student at VIT Bhopal University. GenAI Solution Developer, Microsoft Learn Student Ambassador, and AI Research Enthusiast.",
  keywords: [
    "Garv Anand",
    "AI/ML Engineer",
    "Full Stack Developer",
    "VIT Bhopal",
    "Machine Learning",
    "Deep Learning",
    "React",
    "Python",
    "TensorFlow",
    "PyTorch",
  ],
  authors: [{ name: "Garv Anand" }],
  creator: "Garv Anand",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <div className="min-h-screen bg-background">
            <Navigation />
            <main className="pt-16">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
