import { useRef, useState, useCallback } from "react";
import useCancel from "./useCancel";

/*
 * @typedef {Object} UseCooldownData
 * @property {boolean} onCooldown True if cooldown is active, false otherwise.
 * @property {function} setCooldown A function that activates the cooldown with
 * the given amount of time (in milliseconds).
 */

/*
 * Custom hook to handle cooldowns.
 *
 * @returns {UseCooldownData} An object containing a function to set the
 * cooldown and a boolean indicating whether we're on cooldown or not.
 */
export default function useCooldown() {
  // Whether the cooldown is active or not.
  const [onCooldown, setOnCooldown] = useState(false);
  // Custom hook to prevent changing state after component has been unmounted.
  const isCancelled = useCancel();
  // Reference to hold the timeout ID that is going to reset the cooldown.
  // This is used to make sure only one timeout exists at a time.
  const timeoutRef = useRef();

  const setCooldown = useCallback(
    (cooldown) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setOnCooldown(true);

      timeoutRef.current = setTimeout(() => {
        if (!isCancelled) {
          setOnCooldown(false);
          timeoutRef.current = null;
        }
      }, cooldown);
    },
    [isCancelled]
  );

  return {
    onCooldown,
    setCooldown,
  };
}
