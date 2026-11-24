import { useCallback } from 'react';
import { setCssVariables } from '../utils/cssVariables';

/** React applies this ref on commit, including when the runtime values change. */
export function useCssVariables(values = {}) {
  return useCallback(
    (element) => {
      setCssVariables(element, values);

      if (!element) return;

      return () =>
        setCssVariables(
          element,
          Object.fromEntries(Object.keys(values).map((name) => [name, null])),
        );
    },
    [values],
  );
}
