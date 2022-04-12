import { useLocation, Navigate } from "react-router-dom";

export default function ShareScreen() {
  const location = useLocation();

  // Return to question list in case this page was open incorrectly.
  if (location.state === null) {
    return <Navigate to="/questions" replace />;
  }

  const { from } = location.state;

  return <>{from}</>;
}
