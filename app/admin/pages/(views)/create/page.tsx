'use client'

import dynamic from 'next/dynamic'

const PageEditorWithNoSSR = dynamic(() => import('@/components/modules/pages/page-editor/PageEditor'), { ssr: false })

const CreatePage = () => {
  return <PageEditorWithNoSSR />
}

export default CreatePage
