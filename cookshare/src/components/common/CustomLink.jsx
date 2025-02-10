import React from "react";
import { Link } from "react-scroll";

const CustomLink = ({
  to,
  children,
  smooth = true,
  duration = 500,
  className = "",
  style = {},
  onClick,
}) => {
  return (
    <Link
      to={to}
      smooth={smooth}
      duration={duration}
      className={className}
      style={style}
      onClick={onClick}>
      {children}
    </Link>
  );
};

export default CustomLink;
