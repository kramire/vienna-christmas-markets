function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="m-auto flex h-full min-h-[calc(100vh-132px)] w-full flex-col gap-2 p-3 lg:gap-4 lg:py-5">
      {children}
    </div>
  )
}

export { LayoutWrapper }
