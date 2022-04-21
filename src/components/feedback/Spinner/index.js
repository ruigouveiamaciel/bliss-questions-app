import "./styles.css";

/*
 * Ripple Spinner
 * Credits: https://loading.io/css/
 *
 * @component
 */
export default function Spinner() {
  return (
    <div className="lds-ripple">
      <div></div>
      <div></div>
    </div>
  );
}
