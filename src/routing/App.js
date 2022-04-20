import { useState, useEffect, useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import getHealthStatus from "../api/getHealthStatus";
import useCancel from "../hooks/useCancel";
import useConnectivity from "../hooks/useConnectivity";
import HealthCheckScreen from "../screens/HealthCheckScreen";
import QuestionsListScreen from "../screens/QuestionsListScreen";
import DetailScreen from "../screens/DetailScreen";
import ShareScreen from "../screens/ShareScreen";
import NoConnectivityScreen from "../screens/NoConnectivityScreen";
import "./App.css";

/*
 * Component that handles routing of the application.
 */
export default function App() {
  // Whether or not we are checking the health of the API
  const [loading, setLoading] = useState(true);
  // Whether or not the API is healthy.
  const [healthy, setHealthy] = useState(false);
  // Custom hook that prevents state being updated after the component has been
  // unmounted.
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

  // Check API healthy when application is first started.
  useEffect(() => {
    fetchHealthStatus();
  }, []);

  // Custom hook that checks if the client is connected to the internet or not.
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
            {/* Redirect to /questions all paths that don't match the above routes */}
            <Route path="*" element={<Navigate to="/questions" replace />} />
          </Routes>
        )}
      </div>
      {/* If the API is healthy and we lost connection to internet, show the
       no connectivity screen */}
      {!isConnected && healthy && (
        <div>
          <NoConnectivityScreen />
        </div>
      )}
    </main>
  );
}
