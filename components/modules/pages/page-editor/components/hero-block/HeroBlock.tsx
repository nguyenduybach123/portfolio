import Link from 'next/link'

export interface HeroProps {
  title: string
  subtitle: string
  ctaLabel: string
  ctaHref: string
}

export const HeroBlock = ({
  title,
  subtitle,
  ctaLabel,
  ctaHref
}: HeroProps) => {
  return (
    <section className="py-24 text-center">
      <h1 className="text-5xl font-bold">
        {title}
      </h1>

      <p className="mt-4 text-muted-foreground">
        {subtitle}
      </p>

      <Link
        href={ctaHref}
        className="mt-8 inline-flex rounded-md border px-6 py-3"
      >
        {ctaLabel}
      </Link>
    </section>
  )
}

export default HeroBlock