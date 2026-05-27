interface ValidateFileOptions {
  acceptMimes: string[]
  maxSize: number
  onError?: (error: { type: 'size' | 'type' | 'upload'; message: string; file?: File }) => void
}

function isAcceptedMime(file: File, acceptMimes: string[]): boolean {
  const fileType = file.type
  const fileName = file.name.toLowerCase()
  const ext = fileName.split('.').pop()
  if (!ext) return false

  const mimeByExt: Record<string, string> = {
    heif: 'image/heif',
    heic: 'image/heic',
    dng: 'image/x-adobe-dng',
    cr2: 'image/x-canon-cr2',
    nef: 'image/x-nikon-nef',
    arw: 'image/x-sony-arw',
    raf: 'image/x-fuji-raf',
    orf: 'image/x-olympus-orf'
  }

  const guessedMime = fileType || mimeByExt[ext]

  return acceptMimes.some((accept) => {
    // File extension matching
    if (accept.startsWith('.')) {
      return fileName.endsWith(accept)
    }

    // Wildcard type matching
    if (accept.endsWith('/*')) {
      const base = accept.split('/')[0]
      return guessedMime?.startsWith(base + '/')
    }

    // Exact type matching
    return guessedMime === accept
  })
}

export function validateFiles(files: File[] | { [key: string]: File }, options: ValidateFileOptions): File[] {
  const { acceptMimes, maxSize } = options
  const validFiles: File[] = []

  const filesArray = Array.isArray(files) ? files : Object.values(files)

  filesArray.forEach((file) => {
    // Validate file type
    if (!isAcceptedMime(file, acceptMimes)) {
      if (options.onError) {
        options.onError({
          type: 'type',
          message: `File type not supported: ${file.name}`,
          file
        })
      } else {
        console.warn(`File type not supported: ${file.name}`)
      }
      return
    }

    // Validate file size
    if (file.size > maxSize) {
      const maxSizeInMB = (maxSize / 1024 / 1024).toFixed(2)
      if (options.onError) {
        options.onError({
          type: 'size',
          message: `File size exceeds limit (${maxSizeInMB} MB): ${file.name}`,
          file
        })
      } else {
        console.warn(`File size exceeds limit (${maxSizeInMB} MB): ${file.name}`)
      }
      return
    }

    validFiles.push(file)
  })

  return validFiles
}
