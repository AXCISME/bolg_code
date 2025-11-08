import Link from 'next/link'
import { getPostsByCategory, getAllCategories } from '@/lib/posts'
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
    category: encodeURIComponent(category),
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // 解码分类名
  const decodedCategory = decodeURIComponent(params.category)
  const posts = getPostsByCategory(decodedCategory)

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
          分类：{decodedCategory}
        </h1>
        <p className="text-gray-600">
          此分类下找到 {posts.length} 篇文章。
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
              <span>•</span>
              <span className="text-blue-600 font-medium">
                {post.category}
              </span>
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
                    #{tag}
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