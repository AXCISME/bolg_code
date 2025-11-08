import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { format } from 'date-fns'
import type { Metadata } from 'next'

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: '文章未找到',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article>
      <div className="mb-8">
        <Link
          href="/blog"
          className="text-blue-600 hover:text-blue-700 font-medium mb-4 inline-block"
        >
          ← 返回所有文章
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

        <div className="flex items-center gap-4 text-gray-600 mb-6">
          <time>{format(new Date(post.date), 'yyyy年M月d日')}</time>
          {post.category && (
            <>
              <span>•</span>
              <Link
                href={`/category/${post.category}`}
                className="text-blue-600 hover:text-blue-700"
              >
                {post.category}
              </Link>
            </>
          )}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
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
      </div>

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content || '' }}
      />
    </article>
  )
}