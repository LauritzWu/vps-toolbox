(() => {
  const root = document.documentElement;
  try {
    if (localStorage.getItem('vps-toolbox-theme') === 'dark') root.dataset.theme = 'dark';
  } catch {
    // The page can still switch themes if storage is unavailable.
  }
  if (root.dataset.theme === 'dark') {
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#201e1b');
  }
})();
