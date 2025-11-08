import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import WallpaperBackground from '@/components/WallpaperBackground'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '我的博客',
  description: '使用 Next.js 构建的博客',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <WallpaperBackground enableRefresh={true}>
          <div className="min-h-screen">
            <header className="glass sticky top-0 z-50">
              <div className="max-w-6xl mx-auto px-4 py-4">
                <h1 className="text-2xl font-bold text-white text-shadow">
                  <a href="/" className="hover:text-blue-300 transition-colors duration-200">
                    我的博客
                  </a>
                </h1>
              </div>
            </header>
            <main className="max-w-6xl mx-auto px-4 py-8">
              {children}
            </main>
          </div>
        </WallpaperBackground>
      </body>
    </html>
  )
}