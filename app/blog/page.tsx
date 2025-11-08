import Link from 'next/link'
import { getAllPosts, getAllTags, getAllCategories } from '@/lib/posts'
import { format } from 'date-fns'

export default function BlogPage() {
  const posts = getAllPosts()
  const tags = getAllTags()
  const categories = getAllCategories()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">所有文章</h1>
        <p className="text-gray-600">
          浏览所有 {posts.length} 篇博客文章。
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">分类</h3>
              <div className="space-y-2">
                {categories.map(category => {
                  const count = posts.filter(post => post.category === category).length
                  return (
                    <Link
                      key={category}
                      href={`/category/${encodeURIComponent(category)}`}
                      className="block text-blue-600 hover:text-blue-700"
                    >
                      {category} ({count})
                    </Link>
                  )
                })}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">标签</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => {
                  const count = posts.filter(post => post.tags?.includes(tag)).length
                  return (
                    <Link
                      key={tag}
                      href={`/tag/${encodeURIComponent(tag)}`}
                      className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200"
                    >
                      {tag} ({count})
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-3">
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.slug} className="bg-white p-6 rounded-lg shadow-sm">
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3 hover:text-blue-600">
                    {post.title}
                  </h2>
                </Link>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <time>{format(new Date(post.date), 'yyyy年M月d日')}</time>
                  {post.category && (
                    <>
                      <span>•</span>
                      <Link
                        href={`/category/${encodeURIComponent(post.category)}`}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        {post.category}
                      </Link>
                    </>
                  )}
                </div>

                {post.excerpt && (
                  <p className="text-gray-700 mb-4">{post.excerpt}</p>
                )}

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <Link
                        key={tag}
                        href={`/tag/${encodeURIComponent(tag)}`}
                        className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm hover:bg-blue-100"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}

                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  阅读更多 →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}