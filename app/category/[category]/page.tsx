import Link from 'next/link'
import { getPostsByCategory, getAllCategories } from '@/lib/posts'
import { createTagLink } from '@/lib/url-helpers'
import { format } from 'date-fns'
import { notFound } from 'next/navigation'

interface CategoryPageProps {
  params: {
    category: string
  }
}

export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((category) => ({
    category: category, // 使用原始字符
  }))
}

export async function generateMetadata({ params }: CategoryPageProps) {
  return {
    title: `分类：${params.category}`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // 尝试解码参数
  let categoryName = params.category

  try {
    // 如果参数是URL编码的，进行解码
    categoryName = decodeURIComponent(params.category)
  } catch {
    // 如果解码失败，使用原始参数
    categoryName = params.category
  }

  // 尝试获取分类文章
  let posts = getPostsByCategory(categoryName)

  // 如果没有找到文章，可能是编码问题，尝试多种编码方式
  if (posts.length === 0) {
    // 尝试不同的解码方式
    try {
      const decoded = decodeURIComponent(categoryName)
      if (decoded !== categoryName) {
        posts = getPostsByCategory(decoded)
      }
    } catch {
      // 解码失败，继续使用原参数
    }
  }

  if (posts.length === 0) {
    notFound()
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="glass-card p-8 rounded-xl">
        <Link
          href="/blog"
          className="text-blue-300 hover:text-blue-200 font-medium mb-6 inline-block transition-colors duration-200"
        >
          ← 返回所有文章
        </Link>
        <h1 className="text-4xl font-bold text-white mb-4 text-shadow">
          分类：{categoryName}
        </h1>
        <p className="text-white/90 text-lg">
          此分类下找到 {posts.length} 篇文章。
        </p>
      </div>

      <div className="space-y-8">
        {posts.map((post, index) => (
          <article
            key={post.slug}
            className="glass-card p-8 rounded-xl"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-semibold text-white mb-4 hover:text-blue-300 transition-colors duration-200 text-shadow">
                {post.title}
              </h2>
            </Link>

            <div className="flex items-center gap-4 text-sm text-white/80 mb-6">
              <time>{format(new Date(post.date), 'yyyy年M月d日')}</time>
              <span>•</span>
              <span className="text-blue-300 font-medium">
                {post.category}
              </span>
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
                    #{tag}
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
  )
}