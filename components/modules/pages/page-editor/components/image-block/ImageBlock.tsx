import Image from 'next/image'

export interface ImageProps {
  src: string
  alt: string
}

const ImageBlock = ({
  src,
  alt
}: ImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={800}
      className="h-auto w-full rounded-lg"
    />
  )
}

export default ImageBlock