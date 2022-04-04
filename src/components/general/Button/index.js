import PropTypes from "prop-types";
import "./styles.css";

export default function Button({ error, disabled, className, ...props }) {
  const defaultClassName = `button ${error ? "error" : "normal"} ${
    disabled ? "disabled" : ""
  }`;

  return (
    <button
      className={
        className ? `${defaultClassName} ${className}` : defaultClassName
      }
      {...props}
    />
  );
}

Button.propTypes = {
  className: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
};
