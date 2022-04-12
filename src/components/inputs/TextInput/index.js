import { forwardRef } from "react";
import PropTypes from "prop-types";
import "./styles.css";

const TextInput = forwardRef(({ className = "", ...props }, ref) => {
  return (
    <input className={`text-input card ${className}`} ref={ref} {...props} />
  );
});

TextInput.displayName = "TextInput";

TextInput.propTypes = {
  className: PropTypes.string,
};

export default TextInput;
