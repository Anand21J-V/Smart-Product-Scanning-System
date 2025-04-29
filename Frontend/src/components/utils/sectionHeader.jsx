import { cn } from "./extra/cn";

const SectionHeader = ({
  title,
  subtitle,
  align = "center",
  className,
  size = "lg",
}) => {
  return (
    <div 
      className={cn(
        "relative",
        {
          "text-left": align === "left",
          "text-center": align === "center",
          "text-right": align === "right",
        },
        className
      )}
    >
      <h2 
        className={cn(
          "mega-text text-white",
          {
            "text-4xl md:text-5xl": size === "sm",
            "text-5xl md:text-7xl": size === "md",
            "text-7xl md:text-9xl": size === "lg",
          }
        )}
      >
        {title}
        {subtitle && (
          <div className="relative">
            <span className="script-text text-3xl md:text-5xl absolute left-1/2 top-[-1rem] transform -translate-x-1/2">
              {subtitle}
            </span>
          </div>
        )}
      </h2>
    </div>
  );
};

export default SectionHeader;
