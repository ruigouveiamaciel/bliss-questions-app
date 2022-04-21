import Spinner from "../../components/feedback/Spinner";
import Button from "../../components/inputs/Button";
import PropTypes from "prop-types";
import "./styles.css";

/*
 * Health check screen.
 */
export default function HealthCheckScreen({ failed, onRetry }) {
  return (
    <div className="health-check-container">
      {failed ? (
        <>
          <h3>Connection Failed</h3>
          <Button error onClick={onRetry}>
            Reconnect
          </Button>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

HealthCheckScreen.propTypes = {
  /*
   * Whether the health check has failed or not.
   */
  failed: PropTypes.bool.isRequired,
  /*
   * Callback to be executed whenever the retry button is clicked.
   */
  onRetry: PropTypes.func.isRequired,
};
