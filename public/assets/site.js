// Progressive enhancement only. Links, FAQs and menus also work without JS.
// This version has no network requests, analytics, storage or payment handling.
(function () {
  function closeMenus(event) {
    document.querySelectorAll('.mobile-menu[open], .more-menu[open]').forEach(function (menu) {
      if (event.type === 'keydown' && event.key === 'Escape') {
        menu.removeAttribute('open');
        menu.querySelector('summary').focus();
      } else if (event.type === 'click' && !menu.contains(event.target)) {
        menu.removeAttribute('open');
      }
    });
  }
  document.addEventListener('keydown', closeMenus);
  document.addEventListener('click', closeMenus);
  document.addEventListener('submit', function(event) {
    if (event.target.matches('[data-preview-form]')) event.preventDefault();
  });
})();
