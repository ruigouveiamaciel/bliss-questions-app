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
 */
export default function useInfiniteLoading(callback, cooldown = 1000) {
  const { isVisible, ref } = useVisible();
  const { onCooldown, setCooldown } = useCooldown();
  const isCancelled = useCancel();
  // A reference to hold whether the callback is running or not.
  // This is required to support asyncroumous callbacks.
  const runningRef = useRef(false);

  useEffect(() => {
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
