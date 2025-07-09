import { useEffect, useState, useCallback, RefObject } from "react";

export function useProjectScroll(
  containerRef: RefObject<HTMLDivElement>,
  nextProject: () => void,
  prevProject: () => void
) {
  const [lastScrollTime, setLastScrollTime] = useState(0);
  const scrollDelay = 800;

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      if (
        containerRef.current &&
        containerRef.current.contains(event.target as Node)
      ) {
        event.preventDefault();
        const currentTime = Date.now();

        if (currentTime - lastScrollTime > scrollDelay) {
          const delta = event.deltaY;
          if (Math.abs(delta) > 10) {
            if (delta > 0) {
              nextProject();
            } else {
              prevProject();
            }
            setLastScrollTime(currentTime);
          }
        }
      }
    },
    [nextProject, prevProject, lastScrollTime, scrollDelay, containerRef]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [handleWheel, containerRef]);
}
