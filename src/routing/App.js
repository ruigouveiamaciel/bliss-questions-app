import { useState, useEffect, useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import getHealthStatus from "../api/getHealthStatus";
import useCancel from "../hooks/useCancel";
import useConnectivity from "../hooks/useConnectivity";
import "./App.css";
import HealthCheckScreen from "../screens/HealthCheckScreen";
import QuestionsListScreen from "../screens/QuestionsListScreen";
import DetailScreen from "../screens/DetailScreen";
import ShareScreen from "../screens/ShareScreen";
import NoConnectivityScreen from "../screens/NoConnectivityScreen";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [healthy, setHealthy] = useState(false);

  // useCancel prevents promises updating the state of the component after it
  // has been unmounted.
  const isCancelled = useCancel();

  const fetchHealthStatus = useCallback(() => {
    // Reset states in case we have already tried to fetch before
    setLoading(true);
    setHealthy(false);

    getHealthStatus()
      .then((healthy) => {
        if (!isCancelled) {
          setLoading(false);
          setHealthy(healthy);
        }

        return healthy;
      })
      .catch(() => {
        if (!isCancelled) {
          setLoading(false);
          setHealthy(false);
        }
      });
  }, []);

  useEffect(() => {
    fetchHealthStatus();
  }, []);

  const isConnected = useConnectivity();

  return (
    <main className="container">
      <div className={!isConnected && healthy ? "hidden" : undefined}>
        {loading || !healthy ? (
          <HealthCheckScreen
            failed={!loading && !healthy}
            onRetry={fetchHealthStatus}
          />
        ) : (
          <Routes>
            <Route
              path="/questions/:questionID"
              exact
              element={<DetailScreen />}
            />
            <Route path="/questions" exact element={<QuestionsListScreen />} />
            <Route path="/share" exact element={<ShareScreen />} />
            <Route path="*" element={<Navigate to="/questions" replace />} />
          </Routes>
        )}
      </div>
      {!isConnected && healthy && (
        <div>
          <NoConnectivityScreen />
        </div>
      )}
    </main>
  );
}
