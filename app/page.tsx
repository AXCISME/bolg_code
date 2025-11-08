import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { format } from 'date-fns'

export default function HomePage() {
  const posts = getAllPosts()

  return (
    <div>
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          欢迎来到我的博客
        </h2>
        <p className="text-lg text-gray-600">
          博客框架使用大模型生成，耗时2个小时。
        </p>
      </div>

      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          查看所有文章 ({posts.length})
        </Link>
      </div>

      {posts.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">最新文章</h3>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 6).map((post) => (
              <div key={post.slug} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500 mb-3">
                  {format(new Date(post.date), 'yyyy年M月d日')}
                </p>
                {post.excerpt && (
                  <p className="text-gray-700 mb-4 line-clamp-3">{post.excerpt}</p>
                )}
                <div className="flex items-center justify-between">
                  {post.category && (
                    <span className="text-sm text-blue-600 font-medium">
                      {post.category}
                    </span>
                  )}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
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