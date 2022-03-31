import { useRef, useEffect } from "react";

/*
 * Custom hook to prevent updating component states after the component has been
 * unmounted.
 *
 * @returns {boolean} true if the component is unmounted, false otherwise.
 */
export default function useCancel() {
  const cancelRef = useRef(false);

  useEffect(() => {
    return () => {
      cancelRef.current = true;
    };
  }, []);

  return cancelRef.current;
}
