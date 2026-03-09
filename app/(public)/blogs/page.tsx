import { blogs } from '@/data/blog-data'
import { BlogItem } from './_components'
import { GridWrapper } from '@/components/shared'

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

        <GridWrapper animation='stagger'>
          {blogs.map((blog) => (
            <div key={blog.id} className='mb-8 break-inside-avoid'>
              <BlogItem blog={blog} />
            </div>
          ))}
        </GridWrapper>
      </div>
    </section>
  )
}

export default Blogs
