import { cn } from '@/lib/cn'
import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { Slot } from '@radix-ui/react-slot'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-bold transition-colors ease-out active:scale-95 disabled:pointer-events-none disabled:opacity-50 focus-visible:ring focus-visible:ring-inset focus-visible:ring-white',
  {
    variants: {
      variant: {
        default: 'bg-black text-white hover:bg-zinc-400',
        outline:
          'border-2 border-zinc-300 hover:border-zinc-400 hover:bg-zinc-400 border-zinc-700 hover:bg-zinc-700',
        danger:
          'text-white bg-red-600 font-bold tracking-wide hover:bg-red-800',
        ghost: 'hover:bg-zinc-700',
        link: 'font-semibold bg-transparent underline-offset-4 hover:underline text-slate-200 hover:bg-transparent',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-8 sm:h-9 px-2 sm:px-3',
        lg: 'h-15 py-3 px-5 text-lg',
      },
    },

    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant,
      asChild = false,
      isLoading,
      size,
      disabled: buttonDisabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    const disabled = isLoading ?? buttonDisabled

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled}
        {...props}>
        {isLoading ? <Loader2 className="h-auto w-4 animate-spin" /> : children}
      </Comp>
    )
  }
)

Button.displayName = 'Button'
export { Button, buttonVariants }
