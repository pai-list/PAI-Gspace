import React from 'react'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { ThemeProvider } from 'next-themes'
import './globals.css'
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'PAI Gspace — Global Workspace',
    template: '%s | PAI Gspace',
  },
  description: 'PAI Gspace — Global Workspace for monitoring, collaboration, and secure AI teams',
  keywords: ['PAI', 'AI agents', 'workspace', 'collaboration', 'Pi Network', 'ADP', 'AxiomID'],
  authors: [{ name: 'PAI Team', url: 'https://axiomid.app' }],
  creator: 'PAI Team',
  publisher: 'PAI Universe',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased bg-gray-50 text-gray-900 dark:bg-slate-950 dark:text-gray-100 min-h-screen`}>
        <Script
          id="speed-insights"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.si = window.si || function(){(si.q=si.q||[]).push(arguments)};
            `,
          }}
        />
        <Script
          id="service-worker"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function() {});
                });
              }
            `,
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
