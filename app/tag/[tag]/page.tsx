import Link from 'next/link'
import { getPostsByTag, getAllTags } from '@/lib/posts'
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
    tag: encodeURIComponent(tag),
  }))
}

export default async function TagPage({ params }: TagPageProps) {
  // 解码标签名
  const decodedTag = decodeURIComponent(params.tag)
  const posts = getPostsByTag(decodedTag)

  if (posts.length === 0) {
    notFound()
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/blog"
          className="text-blue-600 hover:text-blue-700 font-medium mb-4 inline-block"
        >
          ← 返回所有文章
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          标签：{decodedTag}
        </h1>
        <p className="text-gray-600">
          找到 {posts.length} 篇带有此标签的文章。
        </p>
      </div>

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
                    className={`inline-block px-3 py-1 rounded-full text-sm ${
                      tag === decodedTag
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    }`}
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
  )
}