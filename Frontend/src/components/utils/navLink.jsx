import { Link } from "react-router-dom";
import { cn } from "./extra/cn";

const NavLink = ({ href, children, className, isExternal = false }) => {
  const classes = cn("nav-link", className);

  if (isExternal) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className={classes}>
      {children}
    </Link>
  );
};

export default NavLink;
