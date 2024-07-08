import { useEffect, useState, useRef } from "react";

export interface UseBottomRectReachedOptions {
  threshold?: number;
}

export const useBottomRectReached = ({
  threshold = 0.6,
}: UseBottomRectReachedOptions = {}) => {
  const [isBottomRectReached, setIsBottomRectReached] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const isReached = rect.top >= windowHeight * threshold;
        setIsBottomRectReached(isReached);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return [ref, isBottomRectReached] as const;
};

export default useBottomRectReached;
