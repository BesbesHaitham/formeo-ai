import { useLayoutEffect } from 'react';

/** Keep top-layer menus inside the viewport and flip above their trigger when needed. */
export function useMenuPosition(open, trigger, menu) {
  useLayoutEffect(() => {
    if (!open) return;

    const element = menu.current;

    function position() {
      const anchor = trigger.current.getBoundingClientRect();
      const gap = 8;
      element.style.setProperty('max-height', `${window.innerHeight - gap * 2}px`);
      const { width, height } = element.getBoundingClientRect();
      const below = window.innerHeight - anchor.bottom - gap * 2;
      const above = anchor.top - gap * 2;
      const upwards = below < height && above > below;
      const available = Math.max(48, upwards ? above : below);
      element.style.setProperty('max-height', `${available}px`);
      element.style.setProperty(
        'left',
        `${Math.max(gap, Math.min(anchor.right - width, window.innerWidth - width - gap))}px`,
      );
      element.style.setProperty(
        'top',
        `${Math.max(gap, upwards ? anchor.top - Math.min(height, available) - gap : anchor.bottom + gap)}px`,
      );
    }

    position();
    window.addEventListener('resize', position);
    window.addEventListener('scroll', position, true);

    return () => {
      window.removeEventListener('resize', position);
      window.removeEventListener('scroll', position, true);
    };
  }, [open, trigger, menu]);
}
