// Simple section router — shows only the clicked section
const links = document.querySelectorAll('[data-section]');
const sections = {
  welcome: document.getElementById('welcome'),
  sculptures: document.getElementById('sculptures'),
  products: document.getElementById('products'),
  support: document.getElementById('support')
};

function setActive(sectionKey) {
  // Toggle active tab
  document.querySelectorAll('.menu a').forEach(a => {
    const isActive = a.dataset.section === sectionKey;
    a.classList.toggle('active', isActive);
    a.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  // Show only the chosen section; welcome shows only when selected
  Object.entries(sections).forEach(([key, el]) => {
    if (!el) return;
    if (key === 'welcome') {
      el.style.display = (sectionKey === 'welcome') ? 'block' : 'none';
    } else {
      el.classList.toggle('active', key === sectionKey);
      if (key !== sectionKey) el.classList.remove('active');
    }
  });

  // Update URL hash
  if (sectionKey === 'welcome') history.replaceState(null, '', '#welcome');
  else location.hash = sectionKey;
}

// Menu click wiring
links.forEach(link => link.addEventListener('click', (e) => {
  const key = e.currentTarget.dataset.section;
  if (!key) return;
  setActive(key);
}));

// First load
(function init() {
  const hash = (location.hash || '#welcome').replace('#','');
  if (['sculptures','products','support'].includes(hash)) setActive(hash);
  else setActive('welcome');
  document.getElementById('year').textContent = new Date().getFullYear();
})();
