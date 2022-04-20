import { useRef, useEffect } from "react";

/*
 * Custom hook to prevent updating component states after the component has been
 * unmounted.
 *
 * @returns {boolean} true if the component is unmounted, false otherwise.
 */
export default function useCancel() {
  // Reference that holds a boolean value representing whether the component is
  // unmounted or not.
  //
  // False is the component is mounted and true if the component is unmounted
  const cancelRef = useRef(false);

  useEffect(() => {
    return () => {
      // Change reference value to true when the component is unmounted.
      cancelRef.current = true;
    };
  }, []);

  return cancelRef.current;
}
