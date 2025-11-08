import Link from 'next/link'
import { getAllPosts, getAllTags, getAllCategories } from '@/lib/posts'
import { createCategoryLink, createTagLink } from '@/lib/url-helpers'
import { format } from 'date-fns'

export default function BlogPage() {
  const posts = getAllPosts()
  const tags = getAllTags()
  const categories = getAllCategories()

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4 animate-fade-in-up">
        <h1 className="text-4xl font-bold text-white text-shadow mb-4">所有文章</h1>
        <p className="text-xl text-white/90 text-shadow-light">
          浏览所有 {posts.length} 篇博客文章。
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4 text-shadow">分类</h3>
              <div className="space-y-3">
                {categories.map(category => {
                  const count = posts.filter(post => post.category === category).length
                  return (
                    <Link
                      key={category}
                      href={createCategoryLink(category)}
                      className="block text-blue-300 hover:text-blue-200 transition-colors duration-200 text-sm"
                    >
                      <span className="text-white/90">{category}</span>
                      <span className="text-white/60 text-xs ml-2">({count})</span>
                    </Link>
                  )
                })}
              </div>
            </div>

            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4 text-shadow">标签</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => {
                  const count = posts.filter(post => post.tags?.includes(tag)).length
                  return (
                    <Link
                      key={tag}
                      href={createTagLink(tag)}
                      className="inline-block glass px-3 py-1 rounded-full text-sm text-white hover:bg-white/30 transition-all duration-200"
                    >
                      {tag}
                      <span className="text-white/60 text-xs ml-1">({count})</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-3">
          <div className="space-y-8">
            {posts.map((post, index) => (
              <article
                key={post.slug}
                className="glass-card p-8 rounded-xl animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-semibold text-white mb-4 hover:text-blue-300 transition-colors duration-200 text-shadow">
                    {post.title}
                  </h2>
                </Link>

                <div className="flex items-center gap-4 text-sm text-white/80 mb-6">
                  <time>{format(new Date(post.date), 'yyyy年M月d日')}</time>
                  {post.category && (
                    <>
                      <span>•</span>
                      <Link
                        href={createCategoryLink(post.category)}
                        className="text-blue-300 hover:text-blue-200 transition-colors duration-200"
                      >
                        {post.category}
                      </Link>
                    </>
                  )}
                </div>

                {post.excerpt && (
                  <p className="text-white/90 mb-6 text-shadow-light leading-relaxed">
                    {post.excerpt}
                  </p>
                )}

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map(tag => (
                      <Link
                        key={tag}
                        href={createTagLink(tag)}
                        className="inline-block glass px-3 py-1 rounded-full text-sm text-white hover:bg-white/30 transition-all duration-200"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}

                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-300 hover:text-blue-200 font-medium transition-colors duration-200"
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