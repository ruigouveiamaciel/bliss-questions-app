import { forwardRef } from "react";
import PropTypes from "prop-types";
import "./styles.css";

/*
 * Text input component.
 */
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
  /*
   * Whether the input should have a white background or not.
   */
  whiteBackground: PropTypes.bool,
};

export default TextInput;
