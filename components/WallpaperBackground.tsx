'use client'

import React, { useState, useEffect } from 'react'
import { WallpaperService, type WallpaperImage } from '@/lib/wallpaper'

interface WallpaperBackgroundProps {
  children: React.ReactNode
  className?: string
  enableRefresh?: boolean
}

export default function WallpaperBackground({
  children,
  className = '',
  enableRefresh = false
}: WallpaperBackgroundProps) {
  const [wallpaper, setWallpaper] = useState<WallpaperImage | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)

  const fetchWallpaper = async () => {
    setIsLoading(true)
    setImageLoaded(false)
    try {
      const wallpaperService = WallpaperService.getInstance()
      const newWallpaper = await wallpaperService.getTodayWallpaper()
      setWallpaper(newWallpaper)
    } catch (error) {
      console.error('Failed to load wallpaper:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchRandomWallpaper = async () => {
    setIsLoading(true)
    setImageLoaded(false)
    try {
      const wallpaperService = WallpaperService.getInstance()
      const newWallpaper = await wallpaperService.getRandomWallpaper()
      setWallpaper(newWallpaper)
    } catch (error) {
      console.error('Failed to load random wallpaper:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchWallpaper()
  }, [])

  return (
    <div className={`relative min-h-screen ${className}`}>
      {/* 背景壁纸 */}
      {wallpaper && (
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-black/20" /> {/* 暗色遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" /> {/* 渐变遮罩 */}
          <img
            src={wallpaper.url}
            alt={wallpaper.title}
            className={`w-full h-full object-cover transition-all duration-1000 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      )}

      {/* 刷新按钮 */}
      {enableRefresh && (
        <button
          onClick={fetchRandomWallpaper}
          className="fixed top-4 right-4 z-50 bg-white/10 backdrop-blur-md border border-white/20 text-white p-2 rounded-lg hover:bg-white/20 transition-all duration-200"
          title="换一张壁纸"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      )}

      {/* 加载指示器 */}
      {isLoading && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
          <div className="text-white">正在加载壁纸...</div>
        </div>
      )}

      {/* 内容 */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}