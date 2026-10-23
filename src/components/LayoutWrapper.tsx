import { cn } from '../utils/cn'

function LayoutWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('m-auto flex h-full w-full flex-col gap-2 p-3 lg:gap-4 lg:py-5', className)}>{children}</div>
  )
}

export { LayoutWrapper }
