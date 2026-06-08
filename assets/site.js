const current = document.body.dataset.page || "";
const root = document.body.dataset.root || "";
const navItems = [
  ["index.html", "HOME", "home"],
  ["portfolio.html", "PORTFOLIO", "portfolio"]
];
const withRoot = (path) => `${root}${path}`;
const header = document.getElementById("site-header");
if (header) {
  header.innerHTML = `
    <header class="site-header" id="header-shell">
      <div class="container header-inner">
        <a class="brand" href="${withRoot("index.html")}" aria-label="JAde Wii home">
          <img src="${withRoot("images/jade8bit.gif")}" alt="JAde Wii logo">
          <span>JAde Wii</span>
        </a>
        <button class="nav-toggle" type="button" aria-label="Open menu" id="nav-toggle">
          <span></span><span></span><span></span>
        </button>
        <nav class="primary-nav" aria-label="Primary navigation">
          ${navItems.map(([href,label,key]) => `<a href="${withRoot(href)}" class="${current === key ? 'active' : ''}">${label}</a>`).join('')}
        </nav>
      </div>
    </header>`;
  const shell = document.getElementById("header-shell");
  const toggle = document.getElementById("nav-toggle");
  if (toggle) toggle.addEventListener("click", () => shell.classList.toggle("open"));
}
const footer = document.getElementById("site-footer");
if (footer) {
  // Show donate button on main pages with grids (home, portfolio, apps, games, music, videos, plugins)
  const showDonate = current === "home" || current === "portfolio" || current === "apps" || current === "games" || current === "music" || current === "videos" || current === "plugins";
  footer.innerHTML = showDonate ? `
    <footer class="site-footer">
      <div class="container" style="display: flex; justify-content: center; padding: 40px 0 60px;">
        <a
          href="https://www.patreon.com/cw/jadewii/membership"
          style="display: inline-flex; align-items: center; justify-content: center; padding: 12px 28px; font-weight: 600; text-decoration: none; color: #fff; background: #111; border-radius: 999px; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em; transition: 0.2s ease;"
          target="_blank"
          rel="noopener noreferrer"
        >donate</a>
      </div>
    </footer>` : '';
}
