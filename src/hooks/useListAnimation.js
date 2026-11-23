import { useLayoutEffect, useRef } from 'react';

/** Animate list layout changes without changing the document order or drag behavior. */
export function useListAnimation(items, enabled = true) {
  const container = useRef(null);
  const positions = useRef(new Map());

  useLayoutEffect(() => {
    const next = new Map();
    const animations = [];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (enabled) {
      for (const element of container.current.children) {
        const position = { top: element.offsetTop, left: element.offsetLeft };
        const previous = positions.current.get(element.dataset.id);
        next.set(element.dataset.id, position);

        if (reducedMotion) continue;

        if (previous) {
          const x = previous.left - position.left;
          const y = previous.top - position.top;

          if (!x && !y) continue;

          animations.push(
            element.animate(
              [{ transform: `translate(${x}px, ${y}px)` }, { transform: 'translate(0, 0)' }],
              { duration: 180, easing: 'ease-out' },
            ),
          );
        } else if (positions.current.size) {
          animations.push(
            element.animate(
              [
                { opacity: 0, transform: 'translateY(8px)' },
                { opacity: 1, transform: 'translateY(0)' },
              ],
              {
                duration: 180,
                easing: 'ease-out',
              },
            ),
          );
        }
      }
    }

    positions.current = next;

    return () => animations.forEach((animation) => animation.cancel());
  }, [items, enabled]);

  return container;
}
