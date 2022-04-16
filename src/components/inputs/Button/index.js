import PropTypes from "prop-types";
import "./styles.css";

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
  error: PropTypes.bool,
  secondary: PropTypes.bool,
  disabled: PropTypes.bool,
};
