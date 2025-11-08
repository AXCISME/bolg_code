import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { format } from 'date-fns'

export default function HomePage() {
  const posts = getAllPosts()

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4 animate-fade-in-up">
        <h2 className="text-5xl font-bold text-white mb-6 text-shadow">
          欢迎来到我的博客
        </h2>
        <p className="text-xl text-white/90 text-shadow-light max-w-2xl mx-auto">
          博客框架使用大模型生成，耗时2个小时。在这里分享技术见解和生活感悟。
        </p>
      </div>

      <div className="text-center">
        <Link
          href="/blog"
          className="inline-block glass-card px-8 py-4 rounded-xl text-white font-semibold hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
        >
          查看所有文章 ({posts.length})
        </Link>
      </div>

      {posts.length > 0 && (
        <div className="space-y-8">
          <h3 className="text-3xl font-bold text-white text-center text-shadow">最新文章</h3>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 6).map((post, index) => (
              <div
                key={post.slug}
                className="glass-card p-6 rounded-xl text-white animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-xl font-semibold mb-3 hover:text-blue-300 transition-colors duration-200 text-shadow">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-sm text-white/80 mb-4">
                  {format(new Date(post.date), 'yyyy年M月d日')}
                </p>
                {post.excerpt && (
                  <p className="text-white/90 mb-6 line-clamp-3 text-shadow-light">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  {post.category && (
                    <span className="text-sm bg-blue-500/30 backdrop-blur px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  )}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-blue-300 hover:text-blue-200 font-medium text-sm transition-colors duration-200"
                  >
                    阅读更多 →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}