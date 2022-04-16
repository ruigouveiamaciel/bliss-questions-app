import { forwardRef } from "react";
import PropTypes from "prop-types";
import "./styles.css";

const TextInput = forwardRef(
  ({ className = "", whiteBackground, ...props }, ref) => {
    return (
      <input
        className={`text-input card ${
          whiteBackground ? "white" : ""
        } ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);

TextInput.displayName = "TextInput";

TextInput.propTypes = {
  className: PropTypes.string,
  whiteBackground: PropTypes.bool,
};

export default TextInput;
