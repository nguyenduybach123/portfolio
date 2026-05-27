import { memo } from 'react'
import { ActionButtonAttachment } from '../../extensions'
import { RichTextCodeBlock } from '../../extensions/CodeBlock/components/RichTextCodeBlock'
import { RichTextFontFamily } from '../../extensions/FontFamily'
import { RichTextFontSize } from '../../extensions/FontSize'
import { RichTextHeading } from '../../extensions/Heading/components/RichTextHeading'
import { RichTextImage } from '../../extensions/Image/components/RichTextImage'
import { RichTextTable } from '../../extensions/Table'
import { RichTextTaskList } from '../../extensions/TaskList'
import { RichTextAlign } from '../../extensions/TextAlign/components/RichTextAlign'
import { RichTextTextDirection } from '../../extensions/TextDirection/components/RichTextTextDirection'
import { RichTextUnderline } from '../../extensions/TextUnderline'
import { RichTextColor } from '../../extensions/Color'
import { RichTextColumn } from '../../extensions/Column'
import { RichTextBlockquote } from '../../extensions/Blockquote'
import { RichTextBold } from '../../extensions/Bold'
import { RichTextItalic } from '../../extensions/Italic'
import { RichTextSearchAndReplace } from '../../extensions/SearchAndReplace'
import { RichTextClear } from '../../extensions/Clear'

const Toolbar = () => {
  console.log('Rendering Toolbar')

  return (
    <div className='flex flex-wrap border-b bg-card px-2 py-4'>
      <ActionButtonAttachment />
      <RichTextImage />
      <RichTextCodeBlock />
      <RichTextSearchAndReplace />
      <RichTextBold />
      <RichTextItalic />
      <RichTextUnderline />
      <RichTextFontFamily />
      <RichTextFontSize />
      <RichTextHeading />
      <RichTextClear />
      <RichTextTaskList />
      <RichTextAlign />
      <RichTextTextDirection />
      <RichTextBlockquote />
      <RichTextColor />
      <RichTextTable />
    </div>
  )
}

export default memo(Toolbar)
