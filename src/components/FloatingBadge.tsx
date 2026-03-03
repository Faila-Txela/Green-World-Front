interface FloatingBadgeProps {
  children: React.ReactNode
  className?: string
}

export const FloatingBadge = ({ children, className }: FloatingBadgeProps) => {
  return (
    <div
      className={`
        border border-gray-200
        absolute 
        z-20
        px-6 py-2 
        bg-white/80 backdrop-blur-md
        text-primary
        shadow-xl
        rounded-full 
        text-sm font-medium
        animate-float
        ${className}
      `}
    >
      {children}
    </div>
  )
}