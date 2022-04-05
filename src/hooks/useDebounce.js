import { useState, useEffect } from "react";
import useCancel from "./useCancel";

/*
 * Custom hook to debounce a value. The debounced value is the same as the input
 * but it's value is only updated after the input hasn't been modified in the
 * given delay.
 *
 * @param {any} value The input value to debounce.
 * @param {number} delay The amount (in milliseconds) toof time to wait before
 * updating the debounced value.
 * @returns {any} The debounced value.
 */
export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const isCancelled = useCancel();

  useEffect(() => {
    /* Start a timeout to update the debounced value after the delay */
    const timeout = setTimeout(() => {
      if (!isCancelled) {
        setDebouncedValue(value);
      }
    }, delay);

    /* Cancel the timeout if the value or the delay changes */
    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay, isCancelled]);

  return debouncedValue;
}
