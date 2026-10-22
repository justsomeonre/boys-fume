/**
 * BOYS FUME® — Main Application Controller
 * UI Interactions, Search, FAQ, Modals & Quick View
 */

class AppController {
  constructor() {
    this.initNavigation();
    this.initSearch();
    this.initFAQ();
    this.initQuickView();
    this.initNewsletter();
    this.initBackToTop();
  }

  initNavigation() {
    const header = document.querySelector('.site-header');
    const mobileToggle = document.getElementById('mobileNavToggle');
    const navLinks = document.getElementById('navLinks');

    // Sticky header shadow on scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    });

    // Mobile nav toggle
    if (mobileToggle && navLinks) {
      mobileToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        mobileToggle.classList.toggle('open');
        mobileToggle.setAttribute('aria-expanded', isOpen);
      });

      // Close menu when clicking link
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('open');
          mobileToggle.classList.remove('open');
          mobileToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  initSearch() {
    const searchTrigger = document.getElementById('searchTrigger');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    if (!searchTrigger || !searchOverlay) return;

    searchTrigger.addEventListener('click', () => {
      searchOverlay.classList.add('active');
      document.body.classList.add('drawer-open');
      setTimeout(() => searchInput?.focus(), 100);
      this.renderSearchResults('');
    });

    const closeSearch = () => {
      searchOverlay.classList.remove('active');
      document.body.classList.remove('drawer-open');
      if (searchInput) searchInput.value = '';
    };

    searchClose?.addEventListener('click', closeSearch);

    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) closeSearch();
    });

    searchInput?.addEventListener('input', (e) => {
      this.renderSearchResults(e.target.value.trim().toLowerCase());
    });
  }

  renderSearchResults(query) {
    const resultsContainer = document.getElementById('searchResults');
    if (!resultsContainer) return;

    const matched = PRODUCTS.filter(p => {
      if (!query) return true;
      return p.name.toLowerCase().includes(query) ||
             p.subtitle.toLowerCase().includes(query) ||
             p.tagline.toLowerCase().includes(query) ||
             p.description.toLowerCase().includes(query);
    });

    if (matched.length === 0) {
      resultsContainer.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: var(--color-warm-grey); font-family: var(--font-mono); font-size: 0.85rem;">
          No bottled illusions matched "${query}". Have you considered the tap?
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = matched.map(p => `
      <div class="search-result-item" onclick="window.appController.openQuickView('${p.id}'); document.getElementById('searchOverlay').classList.remove('active'); document.body.classList.remove('drawer-open');">
        <img src="${p.image}" alt="${p.name}" class="search-result-img" onerror="this.onerror=null;this.src='${p.fallbackImage}'">
        <div>
          <span style="font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-warm-grey);">${p.subtitle}</span>
          <h4 style="font-family: var(--font-serif); font-size: 1.15rem; color: var(--color-deep-black);">${p.name}</h4>
          <p style="font-size: 0.82rem; color: #55574F;">${p.tagline}</p>
        </div>
        <div style="margin-left: auto; font-family: var(--font-mono); font-weight: 600;">₹0</div>
      </div>
    `).join('');
  }

  initFAQ() {
    const faqButtons = document.querySelectorAll('.faq-question-btn');
    faqButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isActive = item.classList.contains('active');

        // Close other items
        document.querySelectorAll('.faq-item').forEach(other => {
          if (other !== item) other.classList.remove('active');
        });

        item.classList.toggle('active', !isActive);
        btn.setAttribute('aria-expanded', !isActive);
      });
    });
  }

  initQuickView() {
    const modal = document.getElementById('quickViewModal');
    const closeBtn = document.getElementById('quickViewCloseBtn');

    closeBtn?.addEventListener('click', () => this.closeQuickView());

    modal?.addEventListener('click', (e) => {
      if (e.target === modal) this.closeQuickView();
    });
  }

  openQuickView(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('quickViewModal');
    const content = document.getElementById('quickViewContent');
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="quickview-layout">
        <div class="quickview-gallery">
          <img id="qvMainImg" src="${product.image}" alt="${product.name}" class="quickview-main-img" onerror="this.onerror=null;this.src='${product.fallbackImage}'">
          <div class="quickview-thumbs">
            <div class="quickview-thumb active" onclick="document.getElementById('qvMainImg').src='${product.image}'">
              <img src="${product.image}" alt="Main View" onerror="this.onerror=null;this.src='${product.fallbackImage}'">
            </div>
            <div class="quickview-thumb" onclick="document.getElementById('qvMainImg').src='${product.detailImage}'">
              <img src="${product.detailImage}" alt="Detail View" onerror="this.onerror=null;this.src='${product.fallbackDetailImage}'">
            </div>
            <div class="quickview-thumb" onclick="document.getElementById('qvMainImg').src='assets/images/bottle-closeup.webp'">
              <img src="assets/images/bottle-closeup.webp" alt="Flacon Macro" onerror="this.onerror=null;this.src='assets/images/bottle-closeup.jpg'">
            </div>
          </div>
        </div>
        <div class="quickview-content">
          <span class="product-edition">${product.subtitle} · ${product.badge}</span>
          <h2 class="section-title" style="margin-bottom: 0.25rem;">${product.name}</h2>
          <p class="product-tagline" style="font-size: 1.05rem; margin-bottom: 0.25rem;">${product.tagline}</p>
          <p class="product-subtext">${product.subtext}</p>

          <div class="product-pricing" style="margin: 0.5rem 0 1rem;">
            <span class="price-strike">₹${product.priceMRP.toLocaleString()}</span>
            <span class="price-actual">₹0</span>
            <span class="price-sub">Free / In Your Tap</span>
          </div>

          <p style="font-size: 0.9rem; line-height: 1.6; color: #444; margin-bottom: 1.25rem;">
            ${product.description}
          </p>

          <div class="quickview-notes">
            <div class="note-item">
              <span class="note-name">Top Note</span>
              <span class="note-desc">${product.notes.top}</span>
            </div>
            <div class="note-item">
              <span class="note-name">Heart Note</span>
              <span class="note-desc">${product.notes.heart}</span>
            </div>
            <div class="note-item">
              <span class="note-name">Base Note</span>
              <span class="note-desc">${product.notes.base}</span>
            </div>
          </div>

          <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--color-warm-grey); margin-bottom: 1.5rem;">
            <div>VOLUME: ${product.specs.volume}</div>
            <div>CONCENTRATION: ${product.specs.concentration}</div>
            <div>LONGEVITY: ${product.specs.longevity}</div>
          </div>

          <div style="display: flex; gap: 0.75rem; margin-top: auto;">
            <button class="btn btn-primary" style="flex-grow: 1;" onclick="window.cartManager.addItem('${product.id}', 1); window.appController.closeQuickView();">
              Add to Bag · ₹0
            </button>
            <button class="btn btn-outline" onclick="window.cartManager.toggleWishlist('${product.id}')">
              Wishlist
            </button>
          </div>

          <p style="font-family: var(--font-mono); font-size: 0.65rem; color: #888; text-align: center; margin-top: 1rem;">
            ${product.joke}
          </p>
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.classList.add('drawer-open');
  }

  closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.classList.remove('drawer-open');
    }
  }

  initNewsletter() {
    const form = document.getElementById('newsletterForm');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.footer-input');
      if (input && input.value) {
        window.cartManager?.showToast("Subscribed! You will receive 0 emails. Enjoy the quiet.");
        input.value = '';
      }
    });
  }

  initBackToTop() {
    const btn = document.getElementById('backToTopBtn');
    btn?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  window.appController = new AppController();
});
