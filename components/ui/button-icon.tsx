import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { IconName } from '../shared/icon-component'
import { icons } from 'lucide-react'
import { Separator } from '@radix-ui/react-separator'

const buttonIconVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonIconProps
  extends
    React.ButtonHTMLAttributes<Omit<HTMLButtonElement, 'icon' | 'children'>>,
    VariantProps<typeof buttonIconVariants> {
  title?: string
  icon: IconName
  asChild?: boolean
}

const ButtonIcon = React.forwardRef<HTMLButtonElement, ButtonIconProps>(
  ({ title, icon, className, variant, size, asChild = false, ...props }, ref) => {
    const Icon = icons[icon]
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp className={cn(buttonIconVariants({ variant, size, className }))} ref={ref} {...props}>
        <span className='sr-only'>{title}</span>
        <Separator orientation='vertical' className='mx-1 h-4 bg-muted' />
        <Icon className={cn(buttonIconVariants({ variant, size, className }), 'rounded-l-md')} />
      </Comp>
    )
  }
)
ButtonIcon.displayName = 'ButtonIcon'

export { ButtonIcon, buttonIconVariants }
