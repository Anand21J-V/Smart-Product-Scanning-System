import { ChevronRight } from "lucide-react";
import { cn } from "./extra/cn";

const ServiceBadge = ({
  children,
  className,
  icon = <ChevronRight className="chevron-right" />,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "service-btn",
        className
      )}
    >
      {children} {icon}
    </button>
  );
};

export default ServiceBadge;
