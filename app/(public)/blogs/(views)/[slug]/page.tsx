'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, CalendarIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const blogPosts = {
  id: 1,
  title: 'Best WordPress Themes For Affiliate Marketing In 2020',
  slug: 'best-wordpress-themes-affiliate',
  author: 'admin',
  date: '9 Nov 2021',
  tags: ['html', 'css', 'javascript'],
  image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop',
  content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`
}
export default function BlogDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const post = blogPosts

  return (
    <main className='min-h-screen bg-[#f3f3f3] px-6 py-20'>
      <article className='mx-auto max-w-6xl'>
        <div className='mx-auto max-w-3xl px-6 md:px-12'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='space-y-10'
          >
            {/* Back Link */}
            <Link href='/blog'>
              <motion.div
                className='flex w-fit cursor-pointer items-center gap-2 font-serif text-base text-slate-700 transition-colors hover:text-orange-500'
                whileHover={{ x: -4 }}
              >
                <ArrowLeft className='h-4 w-4' />
                <span>Back to Blog</span>
              </motion.div>
            </Link>

            {/* Meta Information */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className='flex items-center gap-4 text-sm'
            >
              <div className='flex items-center gap-2'>
                <UserIcon size={14} className='text-orange-500' />
                <span className='font-mono text-slate-700'>{post.author}</span>
              </div>
              <span className='text-slate-300'>|</span>
              <div className='flex items-center gap-2'>
                <CalendarIcon size={14} className='text-orange-500' />
                <span className='font-mono text-slate-700'>{post.date}</span>
              </div>
              <span className='text-slate-300'>|</span>
              <div className='flex items-center gap-2'>
                <span className='text-orange-500'>#</span>
                <span className='font-mono text-slate-700'>{post.tags.join(', ')}</span>
              </div>
            </motion.div>

            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className='overflow-hidden rounded-2xl'
            >
              <img src={post.image} alt={post.title} className='h-auto w-full object-cover' />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className='font-serif text-4xl font-bold leading-tight text-slate-900 md:text-5xl lg:text-6xl'
            >
              {post.title}
            </motion.h1>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className='space-y-6'
            >
              {post.content.split('\n\n').map((paragraph: string, index: number) => (
                <p key={index} className='font-mono text-base leading-relaxed text-slate-700'>
                  {paragraph}
                </p>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </article>
    </main>
  )
}
