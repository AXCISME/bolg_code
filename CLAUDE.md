# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

```bash
# Start development server with hot reloading
npm run dev

# Build the application for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Architecture Overview

This is a Next.js 14 static blog using the App Router architecture. The key architectural components are:

### Content Management
- **Posts Directory**: All blog posts are stored as markdown files in the `posts/` directory
- **Front Matter**: Posts use YAML front matter with fields: title, date, excerpt, tags, category
- **Content Processing**: `lib/posts.ts` handles all markdown processing using `gray-matter`, `remark`, and `remark-html`

### Core Utilities (`lib/posts.ts`)
- `getAllPostSlugs()`: Returns all markdown filenames (without .md extension)
- `getPostBySlug(slug)`: Returns processed post with HTML content or null if not found
- `getAllPosts()`: Returns all posts sorted by date (newest first)
- `getPostsByTag(tag)` and `getPostsByCategory(category)`: Filter posts by taxonomy
- `getAllTags()` and `getAllCategories()`: Return unique taxonomies

### Routing Structure
- `/` - Homepage with latest posts
- `/blog` - All blog posts listing
- `/blog/[slug]` - Individual blog post pages
- `/tag/[tag]` - Posts filtered by tag
- `/category/[category]` - Posts filtered by category

### Key Dependencies
- **Content Processing**: gray-matter (front matter), remark (markdown parser), remark-html (HTML conversion)
- **Styling**: Tailwind CSS for utility-first styling
- **Date Handling**: date-fns for date formatting
- **Framework**: Next.js 14 with React 18 and TypeScript

### Static Site Generation
The blog uses Next.js static site generation for optimal performance. All pages are pre-rendered at build time.

### Adding New Content
To add a blog post:
1. Create a `.md` file in the `posts/` directory
2. Add required front matter (title, date) and optional fields (excerpt, tags, category)
3. Use lowercase, numbers, and hyphens for filenames
4. The post will be automatically detected and processed