import { useRef } from "react";
import PropTypes from "prop-types";
import "./styles.css";

/*
 * Radio input component.
 */
export default function Radio({ label, checked, ...props }) {
  // Input reference. Used to increase the click area of the input.
  const ref = useRef();

  return (
    <label
      className="radio-container"
      onClick={() => {
        ref.current.click();
      }}
    >
      <span className="radio">
        <span className={`radio-inner ${checked ? "checked" : ""}`}>
          <input ref={ref} type="radio" checked={checked} {...props} />
        </span>
      </span>
      <span className="radio-label">{label}</span>
    </label>
  );
}

Radio.propTypes = {
  /*
   * The label's content
   */
  label: PropTypes.node,
  /*
   * Whether the radio is checked or not.
   */
  checked: PropTypes.bool,
};
