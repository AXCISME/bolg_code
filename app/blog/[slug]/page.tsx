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
    <article className="animate-fade-in-up">
      <div className="glass-card p-8 mb-8 rounded-xl">
        <Link
          href="/blog"
          className="text-blue-300 hover:text-blue-200 font-medium mb-6 inline-block transition-colors duration-200"
        >
          ← 返回所有文章
        </Link>

        <h1 className="text-4xl font-bold text-white mb-4 text-shadow">{post.title}</h1>

        <div className="flex items-center gap-4 text-white/80 mb-6">
          <time>{format(new Date(post.date), 'yyyy年M月d日')}</time>
          {post.category && (
            <>
              <span>•</span>
              <Link
                href={`/category/${post.category}`}
                className="text-blue-300 hover:text-blue-200 transition-colors duration-200"
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
                className="inline-block glass px-3 py-1 rounded-full text-sm text-white hover:bg-white/30 transition-all duration-200"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="glass-card eye-care-green p-8 rounded-xl">
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />
      </div>
    </article>
  )
}