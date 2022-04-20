import { useEffect, useState } from "react";

export default function useConnectivity() {
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    const onOffline = () => {
      setConnected(false);
    };

    const onOnline = () => {
      setConnected(true);
    };

    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);

    // Remove event listeners on unmount
    return () => {
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
    };
  }, []);

  return connected;
}
