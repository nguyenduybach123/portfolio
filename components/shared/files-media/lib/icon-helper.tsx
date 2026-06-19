import { FileType } from './types'
import {
  FileText,
  Image,
  Video,
  Folder,
  File,
  AudioWaveform,
} from 'lucide-react'

export function getFileIcon(
  fileType: FileType,
  isFolder?: boolean,
  size: 'sm' | 'md' | 'lg' = 'md'
) {
  const sizeMap = { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-12 w-12' }
  const sizeClass = sizeMap[size]

  if (isFolder) {
    return <Folder className={`${sizeClass} text-blue-400`} />
  }

  switch (fileType) {
    case 'image':
      return <Image className={`${sizeClass} text-green-400`} />
    case 'video':
      return <Video className={`${sizeClass} text-purple-400`} />
    case 'audio':
      return <AudioWaveform className={`${sizeClass} text-pink-400`} />
    case 'document':
      return <FileText className={`${sizeClass} text-orange-400`} />
    default:
      return <File className={`${sizeClass} text-gray-400`} />
  }
}
