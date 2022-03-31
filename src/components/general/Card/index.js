import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

const Card = React.forwardRef(({ className, ...props }, ref) => {
  const defaultClassName = "card";

  return (
    <div
      ref={ref}
      className={
        className ? `${defaultClassName} ${className}` : defaultClassName
      }
      {...props}
    />
  );
});

Card.displayName = "Card";

Card.propTypes = {
  className: PropTypes.string,
};

export default Card;
