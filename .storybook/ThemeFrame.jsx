import { useLayoutEffect } from 'react';

export default function ThemeFrame({ theme, fullscreen, children }) {
  useLayoutEffect(() => {
    const previous = document.documentElement.dataset.theme;
    document.documentElement.dataset.theme = theme;

    return () => {
      if (previous) document.documentElement.dataset.theme = previous;
      else delete document.documentElement.dataset.theme;
    };
  }, [theme]);

  return (
    <div
      data-theme={theme}
      style={{
        padding: fullscreen ? 0 : 24,
        color: 'var(--text)',
        background: 'var(--bg)',
        minHeight: '100vh',
      }}
    >
      {children}
    </div>
  );
}
