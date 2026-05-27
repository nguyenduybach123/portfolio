import { useEffect, useState } from 'react'
import { useActive, useButtonProps, useEditorInstance } from '../../../lib/hooks'
import { SearchAndReplace } from '../SearchAndReplace'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import ActionButton from '../../../components/action-button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'

export function RichTextSearchAndReplace() {
  const editor = useEditorInstance()
  const buttonProps = useButtonProps(SearchAndReplace.name)

  const {
    icon = undefined,
    tooltip = undefined,
    shortcutKeys = undefined,
    tooltipOptions = {},
    action = undefined,
    isActive = undefined
  } = buttonProps?.componentProps ?? {}

  const { disabled } = useActive(isActive)

  const [visible, setVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [replaceTerm, setReplaceTerm] = useState('')
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [result, setResult] = useState('')

  const updateResult = () => {
    setResult(
      `${editor?.storage?.searchAndReplace?.resultIndex + 1}/${editor?.storage?.searchAndReplace?.results.length}`
    )
  }

  useEffect(() => {
    if (editor) {
      updateResult()
    }
  }, [editor])

  const onAction = () => {
    if (disabled) return

    if (action) action()
  }

  const updateSearchReplace = (clearIndex = false) => {
    if (!editor) return

    if (clearIndex) editor?.commands?.resetIndex?.()

    editor?.commands?.setSearchTerm?.(searchTerm)
    editor?.commands?.setReplaceTerm?.(replaceTerm)
    editor?.commands?.setCaseSensitive?.(caseSensitive)

    updateResult()
  }

  const goToSelection = () => {
    if (!editor) return

    const { results, resultIndex } = editor.storage.searchAndReplace
    //@ts-expect-error
    const position: Range = results[resultIndex]

    if (!position) return
    //@ts-expect-error
    editor?.commands?.setTextSelection?.(position)

    const { node } = editor.view.domAtPos(editor.state.selection.anchor)
    if (node instanceof HTMLElement) node.scrollIntoView({ behavior: 'smooth', block: 'center' })

    updateResult()
  }

  useEffect(() => {
    if (!searchTerm.trim()) clear()
    if (searchTerm.trim()) updateSearchReplace(true)
  }, [searchTerm])

  useEffect(() => {
    if (replaceTerm.trim()) updateSearchReplace()
  }, [replaceTerm])

  useEffect(() => {
    updateSearchReplace(true)
  }, [caseSensitive])

  const replace = () => {
    editor?.commands?.replace?.()
    goToSelection()
  }

  const next = () => {
    editor?.commands?.nextSearchResult?.()
    goToSelection()
  }

  const previous = () => {
    editor?.commands?.previousSearchResult?.()
    goToSelection()
  }

  const clear = () => {
    setSearchTerm('')
    setReplaceTerm('')

    editor?.commands?.resetIndex?.()
    updateResult()
  }

  const replaceAll = () => {
    editor?.commands?.replaceAll?.()
    setResult('0/0')
  }

  if (!buttonProps) {
    return <></>
  }

  return (
    <Popover onOpenChange={setVisible} open={visible}>
      <PopoverTrigger asChild disabled={disabled}>
        <ActionButton
          action={onAction}
          disabled={disabled}
          icon={'TextSearch'}
          shortcutKeys={shortcutKeys}
          tooltip={tooltip}
          tooltipOptions={tooltipOptions}
        />
      </PopoverTrigger>

      <PopoverContent align='start' className='richtext-w-full' hideWhenDetached side='bottom'>
        <div className='richtext-flex richtext-items-center richtext-justify-between mb-2'>
          <Label>Search & Replace</Label>

          <span className='richtext-font-semibold'>{result}</span>
        </div>

        <div className='richtext-mb-[10px] richtext-flex richtext-w-full richtext-max-w-sm richtext-items-center richtext-gap-1.5 space-x-3'>
          <Input
            autoFocus
            className='richtext-w-full'
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Text'
            required
            type='text'
            value={searchTerm}
          />

          <Button className='richtext-flex-1' onClick={previous}>
            <ChevronUpIcon />
          </Button>

          <Button className='richtext-flex-1' onClick={next}>
            <ChevronDownIcon />
          </Button>

          <Button className='richtext-flex-1' onClick={clear}>
            Clear
          </Button>
        </div>

        <Label className='richtext-mb-[6px]'>Replace</Label>

        <div className='richtext-mb-[5px] richtext-flex richtext-w-full richtext-max-w-sm richtext-items-center richtext-gap-1.5 space-x-3'>
          <div className='richtext-relative richtext-w-full richtext-max-w-sm richtext-items-center'>
            <Input
              className='richtext-w-80'
              onChange={(e) => setReplaceTerm(e.target.value)}
              placeholder='Text'
              required
              type='text'
              value={replaceTerm}
            />
          </div>
        </div>

        <div className='richtext-flex richtext-items-center richtext-gap-1 my-2 space-x-1'>
          <Checkbox
            checked={caseSensitive}
            onCheckedChange={(v) => {
              setCaseSensitive(v as boolean)
              editor.commands.setCaseSensitive(v as boolean)
            }}
          />

          <Label>Case Sensitive</Label>
        </div>

        <div className='richtext-flex richtext-items-center justify-end gap-2'>
          <Button className='richtext-flex-1' onClick={replace}>
            Replace
          </Button>

          <Button className='richtext-flex-1' onClick={replaceAll}>
            Replace All
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
