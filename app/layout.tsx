import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" })

export const metadata: Metadata = {
  title: "Garv Anand — AI/ML Engineer & GenAI Developer",
  description: "AI/ML Engineer from VIT. Specializing in GenAI, computer vision, and NLP pipelines. Built ElderAI and interned at ROVA.",
  keywords: [
    "Garv Anand",
    "AI/ML Engineer",
    "GenAI Developer",
    "Machine Learning",
    "Computer Vision",
    "YOLOv8",
    "LangChain",
    "VIT",
  ],
  authors: [{ name: "Garv Anand" }],
  creator: "Garv Anand",
  openGraph: {
    title: "Garv Anand — AI/ML Engineer & GenAI Developer",
    description: "AI/ML Engineer from VIT. Specializing in GenAI, computer vision, and NLP pipelines. Built ElderAI and interned at ROVA.",
    url: "https://garvanand.com",
    siteName: "Garv Anand Portfolio",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Garv Anand — AI/ML Engineer & GenAI Developer",
    description: "AI/ML Engineer from VIT. Specializing in GenAI, computer vision, and NLP pipelines. Built ElderAI and interned at ROVA.",
    images: ["/api/og"],
  },
  alternates: {
    canonical: "https://garvanand.com",
  },
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Garv Anand",
  url: "https://garvanand.com",
  jobTitle: "AI/ML Engineer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "VIT"
  },
  sameAs: [
    "https://www.linkedin.com/in/garv-anand-1bb36b270/",
    "https://github.com/Garvanand"
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans bg-[#060608] text-[#e8e6e3] antialiased overflow-x-hidden min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <main className="relative w-full min-h-screen">
            {children}
          </main>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
