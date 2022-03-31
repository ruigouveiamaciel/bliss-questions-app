import PropTypes from "prop-types";
import "./styles.css";

export default function Button({ error, className, ...props }) {
  const defaultClassName = `button ${error ? "error" : "normal"}`;

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
};
