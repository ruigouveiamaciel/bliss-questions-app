import { useEffect, useState } from "react";

/*
 * Custom hook that checks if there is an internet connection.
 *
 * @returns {boolean} True if connected to the internet, false otherwise.
 */
export default function useConnectivity() {
  // Whether we are connected to the internet or not.
  //
  // Defaults to true because this custom hook is meant to be used after
  // checking that the API is healthy.
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    // Listen to "online" and "offline" events and change state accordingly.
    const onOffline = () => {
      setConnected(false);
    };

    const onOnline = () => {
      setConnected(true);
    };

    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);

    // Remove event listeners on component unmount.
    return () => {
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
    };
  }, []);

  return connected;
}
