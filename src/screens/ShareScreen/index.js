import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import Button from "../../components/inputs/Button";
import TextInput from "../../components/inputs/TextInput";
import useCancel from "../../hooks/useCancel";
import share from "../../api/share";
import "./styles.css";

/*
 * Share screen.
 *
 * @component
 */
export default function ShareScreen() {
  // This hook returns the current location object.
  const location = useLocation();

  // Return to question list in case this page was been open incorrectly.
  if (location.state === null) {
    return <Navigate to="/questions" replace />;
  }

  // Custom hook to prevent changing state after component has been unmounted.
  const isCancelled = useCancel();

  // The URL to share.
  const { from } = location.state;

  const navigate = useNavigate();

  // The email to share the URL to.
  const [email, setEmail] = useState("");

  // Whether the form is being submitted or not.
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Submit callback.
  const onSubmit = useCallback((event) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    share(email, from)
      .then((success) => {
        if (isCancelled) return success;

        if (success) {
          navigate(-1);
        } else {
          setIsSubmitting(false);
        }

        return success;
      })
      .catch(() => {
        if (isCancelled) return;
        setIsSubmitting(false);
      });
  }, []);

  return (
    <form className="card detail-card" onSubmit={onSubmit}>
      <label>Email</label>
      <TextInput
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <div className="button-container">
        <Button type="button" error onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={email.length === 0 || isSubmitting}
          secondary
        >
          Share
        </Button>
      </div>
    </form>
  );
}
