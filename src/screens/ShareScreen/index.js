import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import Button from "../../components/inputs/Button";
import TextInput from "../../components/inputs/TextInput";
import useCancel from "../../hooks/useCancel";
import share from "../../api/share";
import "./styles.css";

export default function ShareScreen() {
  const location = useLocation();
  const isCancelled = useCancel();

  // Return to question list in case this page was open incorrectly.
  if (location.state === null) {
    return <Navigate to="/questions" replace />;
  }

  const { from } = location.state;

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = useCallback((event) => {
    event.preventDefault();

    if (!isSubmitting) {
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
          if (!isCancelled) {
            setIsSubmitting(false);
          }
        });
    }
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
