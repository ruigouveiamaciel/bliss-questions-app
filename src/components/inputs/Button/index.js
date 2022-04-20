import PropTypes from "prop-types";
import "./styles.css";

/*
 * Simple colored button.
 */
export default function Button({
  error,
  secondary,
  disabled,
  className,
  ...props
}) {
  const defaultClassName = `button ${secondary ? "secondary" : ""} ${
    error ? "error" : ""
  } ${disabled ? "disabled" : ""}`;

  return (
    <button
      className={
        className ? `${defaultClassName} ${className}` : defaultClassName
      }
      disabled={disabled}
      {...props}
    />
  );
}

Button.propTypes = {
  className: PropTypes.string,
  /*
   * Whether or not the button should have the error color.
   */
  error: PropTypes.bool,
  /*
   * Whether or not the button should have the secondary color.
   */
  secondary: PropTypes.bool,
  /*
   * Whether the button is disabled or not.
   */
  disabled: PropTypes.bool,
};
