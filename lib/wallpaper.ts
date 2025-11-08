export interface WallpaperImage {
  url: string
  title: string
  copyright?: string
  date: string
}

export class WallpaperService {
  private static instance: WallpaperService
  private cachedWallpaper: WallpaperImage | null = null
  private lastFetchTime: number = 0
  private readonly CACHE_DURATION = 60 * 60 * 1000 // 1小时缓存

  static getInstance(): WallpaperService {
    if (!WallpaperService.instance) {
      WallpaperService.instance = new WallpaperService()
    }
    return WallpaperService.instance
  }

  async getTodayWallpaper(): Promise<WallpaperImage> {
    const now = Date.now()

    // 检查缓存是否有效
    if (this.cachedWallpaper && (now - this.lastFetchTime) < this.CACHE_DURATION) {
      return this.cachedWallpaper
    }

    try {
      // 使用 Bing Wallpaper API
      const response = await fetch(
        'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN',
        {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch wallpaper')
      }

      const data = await response.json()
      const image = data.images[0]

      const wallpaper: WallpaperImage = {
        url: `https://www.bing.com${image.url}`,
        title: image.title,
        copyright: image.copyright,
        date: image.enddate || new Date().toISOString().split('T')[0]
      }

      this.cachedWallpaper = wallpaper
      this.lastFetchTime = now

      return wallpaper
    } catch (error) {
      console.error('Failed to fetch wallpaper:', error)

      // 返回默认壁纸
      const defaultWallpaper: WallpaperImage = {
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
        title: '美丽的山景',
        date: new Date().toISOString().split('T')[0]
      }

      this.cachedWallpaper = defaultWallpaper
      this.lastFetchTime = now

      return defaultWallpaper
    }
  }

  async getRandomWallpaper(): Promise<WallpaperImage> {
    try {
      // 获取过去7天的随机壁纸
      const randomIndex = Math.floor(Math.random() * 7)
      const response = await fetch(
        `https://www.bing.com/HPImageArchive.aspx?format=js&idx=${randomIndex}&n=1&mkt=zh-CN`,
        {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch random wallpaper')
      }

      const data = await response.json()
      const image = data.images[0]

      return {
        url: `https://www.bing.com${image.url}`,
        title: image.title,
        copyright: image.copyright,
        date: image.enddate || new Date().toISOString().split('T')[0]
      }
    } catch (error) {
      console.error('Failed to fetch random wallpaper:', error)
      return this.getTodayWallpaper()
    }
  }
}