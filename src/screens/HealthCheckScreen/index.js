import Spinner from "../../components/feedback/Spinner";
import Button from "../../components/inputs/Button";
import PropTypes from "prop-types";
import "./styles.css";

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
  failed: PropTypes.bool.isRequired,
  onRetry: PropTypes.func.isRequired,
};
