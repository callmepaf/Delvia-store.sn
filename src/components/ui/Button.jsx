import { cn } from '../../utils/cn'

const variants = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  outline: 'border border-border bg-transparent hover:bg-secondary text-foreground',
  ghost: 'hover:bg-secondary text-foreground',
  destructive: 'bg-destructive/10 text-destructive hover:bg-destructive/20',
}

export function buttonClasses({ variant = 'default', className = '' } = {}) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors active:translate-y-px disabled:pointer-events-none disabled:opacity-50 h-9 px-4 outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
    variants[variant],
    className,
  )
}

export default function Button({ variant = 'default', className = '', ...props }) {
  return <button className={buttonClasses({ variant, className })} {...props} />
}
