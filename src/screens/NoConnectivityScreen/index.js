import "./styles.css";

/*
 * No connectivity screen.
 */
export default function NoConnectivityScreen() {
  return (
    <div className="no-connectivity-container">
      <h3>Connection Lost</h3>
      <p>{"Oops, looks like there's no internet connection."}</p>
      <p>{"Progress will be restored when the connection is restored."}</p>
    </div>
  );
}
