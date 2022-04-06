import { useState, useEffect } from "react";
import useCancel from "./useCancel";

/*
 * @typedef {Object} UseVisibleData
 * @property {function} ref The reference.
 * @property {boolean} isVisible True if the referenced element is visible on
 * the browser, false otherwise.
 */

/*
 * Custom hook to detect whether an element is visible on the browser or not.
 *
 * @returns {UseVisibleData} An object containing a reference and a boolean
 * value representing whether the element is visible or not.
 */
export default function useVisible() {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState(null);
  const isCancelled = useCancel();

  useEffect(() => {
    if (ref) {
      // Check if the ref element is visible using an observer
      const observer = new IntersectionObserver(([entry]) => {
        if (!isCancelled) {
          setIsVisible(entry.isIntersecting);
        }
      });

      observer.observe(ref);

      // Make sure to delete the observer when it's no longer needed
      return () => {
        setIsVisible(false);
        observer.disconnect();
      };
    } else {
      setIsVisible(false);
    }
  }, [isCancelled, ref]);

  return {
    ref: setRef,
    isVisible,
  };
}
