'use client'

import { blogs } from '@/data/blog-data'
import { BlogItem } from './_components'
import { GalleryWrapper } from '@/components/shared'
import { motion } from 'framer-motion'
import { FileTextIcon } from 'lucide-react'

const Blogs = () => {
  return (
    <section className='min-h-screen bg-[#f3f3f3] px-6 py-20'>
      <div className='mx-auto max-w-6xl'>
        <div className='text-center'>
          <h1 className='mb-8 text-center font-serif text-6xl md:text-7xl'>
            <span className='text-slate-700'>Blogs </span>
            <span className='text-orange-500'>Portfolio</span>
          </h1>
          <p className='mb-8 text-muted-foreground'>
            Here are some of the blogs I have written. Click on each blog to see more details.
          </p>
        </div>

        {blogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className='mx-auto mt-10 flex max-w-md flex-col items-center justify-center p-10 text-center'
          >
            {/* Title */}
            <h3 className='text-lg font-semibold text-slate-800'>No blogs yet</h3>

            {/* Description */}
            <p className='mt-2 text-sm text-slate-500'>
              There are currently no blog posts available. Please check back later for new content.
            </p>
          </motion.div>
        )}

        <GalleryWrapper animation='stagger'>
          {blogs.map((blog) => (
            <div key={blog.id} className='mb-8 break-inside-avoid'>
              <BlogItem blog={blog} />
            </div>
          ))}
        </GalleryWrapper>
      </div>
    </section>
  )
}

export default Blogs
