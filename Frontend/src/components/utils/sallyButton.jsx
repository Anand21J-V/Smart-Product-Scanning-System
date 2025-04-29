import { cn } from "./extra/cn";

const SallyButton = ({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
}) => {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center transition-all duration-300 ease-out",
        {
          "bg-sally-orange text-black hover:bg-white": variant === "primary",
          "bg-transparent border border-white text-white hover:bg-white hover:text-black": variant === "outline",
          "bg-transparent text-white hover:text-sally-orange": variant === "ghost",
        },
        {
          "text-xs px-4 py-2 rounded-full": size === "sm",
          "px-6 py-3 rounded-full": size === "md",
          "text-lg px-8 py-4 rounded-full": size === "lg",
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default SallyButton;
