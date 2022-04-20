import { useEffect, useRef } from "react";
import useVisible from "./useVisible";
import useCooldown from "./useCooldown";
import useCancel from "./useCancel";

/*
 * Custom hook to handle infinite loading.
 *
 * @param {function} callback The callback function to be called whenever we
 * want to load more content. Supports asyncroumous functions.
 * @param {cooldown} cooldown The time to wait before the callback can be called
 * again.
 * @returns {function} The reference. This reference should be used on the
 * element that should trigger the callback whenever the elements is visible
 * on the browser.
 */
export default function useInfiniteLoading(callback, cooldown = 1000) {
  // Custom hook that checks whether an element is visible or not.
  const { isVisible, ref } = useVisible();
  // Custom hook to handle cooldowns
  const { onCooldown, setCooldown } = useCooldown();
  // Custom hook to prevent changing state after component has been unmounted.
  const isCancelled = useCancel();
  // A reference to hold whether the callback is running or not.
  // This is required to support asyncroumous callbacks.
  const runningRef = useRef(false);

  useEffect(() => {
    // If component is visible, not on cooldown and the callback is not already
    // running, then call the callback.
    if (!onCooldown && isVisible && !runningRef.current) {
      const result = callback();

      if (result instanceof Promise) {
        runningRef.current = true;
        result.finally(() => {
          if (!isCancelled) {
            setCooldown(cooldown);
            runningRef.current = false;
          }
        });
      } else {
        setCooldown(cooldown);
      }
    }
  }, [callback, isVisible, isCancelled, onCooldown, setCooldown, cooldown]);

  return ref;
}
