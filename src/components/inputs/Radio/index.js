import { useRef } from "react";
import PropTypes from "prop-types";
import "./styles.css";

export default function Radio({ label, checked, ...props }) {
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

Radio.propTypes = { label: PropTypes.node, checked: PropTypes.bool };
