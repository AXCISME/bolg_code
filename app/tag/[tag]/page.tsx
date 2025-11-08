import Link from 'next/link'
import { getPostsByTag, getAllTags } from '@/lib/posts'
import { createCategoryLink, createTagLink } from '@/lib/url-helpers'
import { format } from 'date-fns'
import { notFound } from 'next/navigation'

interface TagPageProps {
  params: {
    tag: string
  }
}

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    tag: tag, // 使用原始字符
  }))
}

export async function generateMetadata({ params }: TagPageProps) {
  return {
    title: `标签：${params.tag}`,
  }
}

export default async function TagPage({ params }: TagPageProps) {
  // 尝试解码参数
  let tagName = params.tag

  try {
    // 如果参数是URL编码的，进行解码
    tagName = decodeURIComponent(params.tag)
  } catch {
    // 如果解码失败，使用原始参数
    tagName = params.tag
  }

  // 尝试获取标签文章
  let posts = getPostsByTag(tagName)

  // 如果没有找到文章，可能是编码问题，尝试多种编码方式
  if (posts.length === 0) {
    // 尝试不同的解码方式
    try {
      const decoded = decodeURIComponent(tagName)
      if (decoded !== tagName) {
        posts = getPostsByTag(decoded)
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
          标签：{tagName}
        </h1>
        <p className="text-white/90 text-lg">
          找到 {posts.length} 篇带有此标签的文章。
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
                    className={`inline-block px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                      tag === tagName
                        ? 'glass text-white bg-white/20'
                        : 'glass text-white hover:bg-white/30'
                    }`}
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
  )
}