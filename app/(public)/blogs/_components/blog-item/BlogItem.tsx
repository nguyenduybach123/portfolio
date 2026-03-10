'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays } from 'lucide-react'
import { Blog } from '@/types/blogs'

interface Props {
  blog: Blog
}

const BlogItem = ({ blog }: Props) => {
  return (
    <motion.article
      initial='rest'
      whileHover='hover'
      animate='rest'
      className='group relative mb-8 cursor-pointer rounded-2xl bg-white shadow-md transition-shadow hover:shadow-xl'
    >
      {/* IMAGE */}
      <div className='relative'>
        <Image
          src={blog.image || '/images/placeholder.png'}
          alt={blog.title}
          width={600}
          height={400}
          className='w-full object-cover transition-transform duration-700 group-hover:scale-110'
        />

        {/* Gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
      </div>

      {/* CONTENT */}
      <div className='p-6'>
        {/* Date */}
        <div className='mb-3 flex items-center gap-2 text-xs text-slate-400'>
          <CalendarDays size={14} />
          <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
        </div>

        {/* Title */}
        <h3 className='text-lg font-semibold text-slate-800 transition-colors group-hover:text-black'>{blog.title}</h3>

        {/* Description */}
        <p className='mt-2 line-clamp-2 text-sm text-slate-500'>{blog.description}</p>

        {/* Read more */}
        <motion.div
          variants={{
            rest: { x: 0 },
            hover: { x: 5 }
          }}
          transition={{ duration: 0.3 }}
          className='mt-4 text-sm font-medium text-primary'
        >
          <Link href={`/blogs/${blog.id}`}>Read article →</Link>
        </motion.div>
      </div>
    </motion.article>
  )
}

export default BlogItem
