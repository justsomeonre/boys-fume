/**
 * BOYS FUME® — Shopping Bag, Wishlist & Checkout Reveal Engine
 * "The World's Most Accessible Luxury"
 */

class CartManager {
  constructor() {
    this.cart = this.loadCart();
    this.wishlist = this.loadWishlist();
    this.initElements();
    this.bindEvents();
    this.render();
  }

  loadCart() {
    try {
      const stored = localStorage.getItem('boys_fume_cart');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.warn('LocalStorage error, using memory cart', e);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem('boys_fume_cart', JSON.stringify(this.cart));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }

  loadWishlist() {
    try {
      const stored = localStorage.getItem('boys_fume_wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  saveWishlist() {
    try {
      localStorage.setItem('boys_fume_wishlist', JSON.stringify(this.wishlist));
    } catch (e) {
      console.warn('Wishlist save failed', e);
    }
  }

  initElements() {
    // Cart DOM
    this.cartOverlay = document.getElementById('cartDrawerOverlay');
    this.cartDrawer = document.getElementById('cartDrawer');
    this.cartItemsList = document.getElementById('cartItemsList');
    this.cartEmptyState = document.getElementById('cartEmptyState');
    this.cartCountBadges = document.querySelectorAll('.cart-count-badge');
    this.cartTotalEl = document.getElementById('cartTotal');
    this.cartStrikeTotalEl = document.getElementById('cartStrikeTotal');
    this.checkoutBtn = document.getElementById('checkoutBtn');
    
    // Wishlist DOM
    this.wishlistBadges = document.querySelectorAll('.wishlist-count-badge');
    this.wishlistOverlay = document.getElementById('wishlistDrawerOverlay');
    this.wishlistItemsList = document.getElementById('wishlistItemsList');
    this.wishlistEmptyState = document.getElementById('wishlistEmptyState');

    // Checkout Reveal Modal DOM
    this.checkoutModal = document.getElementById('checkoutRevealModal');
    this.revealCloseBtn = document.getElementById('revealCloseBtn');

    // Toast Container
    this.toastContainer = document.getElementById('toastContainer');
  }

  bindEvents() {
    // Open cart drawer triggers
    document.querySelectorAll('[data-action="open-cart"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openCart();
      });
    });

    // Close cart drawer triggers
    document.querySelectorAll('[data-action="close-cart"]').forEach(btn => {
      btn.addEventListener('click', () => this.closeCart());
    });

    if (this.cartOverlay) {
      this.cartOverlay.addEventListener('click', (e) => {
        if (e.target === this.cartOverlay) this.closeCart();
      });
    }

    // Open wishlist triggers
    document.querySelectorAll('[data-action="open-wishlist"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openWishlist();
      });
    });

    document.querySelectorAll('[data-action="close-wishlist"]').forEach(btn => {
      btn.addEventListener('click', () => this.closeWishlist());
    });

    if (this.wishlistOverlay) {
      this.wishlistOverlay.addEventListener('click', (e) => {
        if (e.target === this.wishlistOverlay) this.closeWishlist();
      });
    }

    // Checkout Button Trigger -> Reveal Modal
    if (this.checkoutBtn) {
      this.checkoutBtn.addEventListener('click', () => {
        this.triggerCheckoutReveal();
      });
    }

    // Reveal Modal Close
    if (this.revealCloseBtn) {
      this.revealCloseBtn.addEventListener('click', () => {
        this.closeCheckoutReveal();
      });
    }

    if (this.checkoutModal) {
      this.checkoutModal.addEventListener('click', (e) => {
        if (e.target === this.checkoutModal) this.closeCheckoutReveal();
      });
    }

    // Global ESC key to close open overlays
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeCart();
        this.closeWishlist();
        this.closeCheckoutReveal();
      }
    });
  }

  // Cart operations
  addItem(productId, quantity = 1) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = this.cart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        subtitle: product.subtitle,
        priceMRP: product.priceMRP,
        price: product.price,
        image: product.image,
        fallbackImage: product.fallbackImage,
        quantity: quantity
      });
    }

    this.saveCart();
    this.render();
    this.animateBadge();
    this.showToast(`Added ${product.name} to your bag`);
    this.openCart();
  }

  updateQuantity(productId, delta) {
    const index = this.cart.findIndex(item => item.id === productId);
    if (index === -1) return;

    this.cart[index].quantity += delta;
    if (this.cart[index].quantity <= 0) {
      const removedName = this.cart[index].name;
      this.cart.splice(index, 1);
      this.showToast(`Removed ${removedName} from bag`);
    }

    this.saveCart();
    this.render();
  }

  removeItem(productId) {
    const index = this.cart.findIndex(item => item.id === productId);
    if (index === -1) return;

    const removedName = this.cart[index].name;
    this.cart.splice(index, 1);
    this.saveCart();
    this.render();
    this.showToast(`Removed ${removedName} from bag`);
  }

  // Wishlist operations
  toggleWishlist(productId) {
    const index = this.wishlist.indexOf(productId);
    const product = PRODUCTS.find(p => p.id === productId);
    const name = product ? product.name : 'Item';

    if (index > -1) {
      this.wishlist.splice(index, 1);
      this.showToast(`Removed ${name} from wishlist`);
    } else {
      this.wishlist.push(productId);
      this.showToast(`Saved ${name} to wishlist`);
    }

    this.saveWishlist();
    this.updateWishlistUI();
  }

  isWishlisted(productId) {
    return this.wishlist.includes(productId);
  }

  openCart() {
    if (this.cartOverlay) {
      this.cartOverlay.classList.add('active');
      document.body.classList.add('drawer-open');
    }
  }

  closeCart() {
    if (this.cartOverlay) {
      this.cartOverlay.classList.remove('active');
      document.body.classList.remove('drawer-open');
    }
  }

  openWishlist() {
    if (this.wishlistOverlay) {
      this.renderWishlist();
      this.wishlistOverlay.classList.add('active');
      document.body.classList.add('drawer-open');
    }
  }

  closeWishlist() {
    if (this.wishlistOverlay) {
      this.wishlistOverlay.classList.remove('active');
      document.body.classList.remove('drawer-open');
    }
  }

  triggerCheckoutReveal() {
    this.closeCart();
    if (this.checkoutModal) {
      this.checkoutModal.classList.add('active');
      document.body.classList.add('drawer-open');
    }
  }

  closeCheckoutReveal() {
    if (this.checkoutModal) {
      this.checkoutModal.classList.remove('active');
      document.body.classList.remove('drawer-open');
    }
  }

  animateBadge() {
    this.cartCountBadges.forEach(badge => {
      badge.classList.remove('bump');
      void badge.offsetWidth; // trigger reflow
      badge.classList.add('bump');
    });
  }

  render() {
    const totalCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    this.cartCountBadges.forEach(badge => {
      badge.textContent = totalCount;
    });

    if (!this.cartItemsList || !this.cartEmptyState) return;

    if (this.cart.length === 0) {
      this.cartItemsList.style.display = 'none';
      this.cartEmptyState.style.display = 'block';
      if (this.checkoutBtn) this.checkoutBtn.disabled = true;
      if (this.cartTotalEl) this.cartTotalEl.textContent = '₹0';
      if (this.cartStrikeTotalEl) this.cartStrikeTotalEl.textContent = '₹0';
      return;
    }

    this.cartItemsList.style.display = 'flex';
    this.cartEmptyState.style.display = 'none';
    if (this.checkoutBtn) this.checkoutBtn.disabled = false;

    let strikeTotal = 0;
    this.cartItemsList.innerHTML = this.cart.map(item => {
      strikeTotal += (item.priceMRP || 0) * item.quantity;
      return `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.onerror=null;this.src='${item.fallbackImage}'">
          <div class="cart-item-details">
            <div>
              <span class="cart-item-edition">${item.subtitle}</span>
              <h4 class="cart-item-title">${item.name}</h4>
              <div class="cart-item-price">
                <span>₹0</span>
                <span class="cart-item-strike">₹${(item.priceMRP * item.quantity).toLocaleString()}</span>
              </div>
            </div>
            <div class="cart-qty-ctrl">
              <button class="qty-btn" onclick="window.cartManager.updateQuantity('${item.id}', -1)" aria-label="Decrease quantity">−</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn" onclick="window.cartManager.updateQuantity('${item.id}', 1)" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <button class="cart-item-remove" onclick="window.cartManager.removeItem('${item.id}')" aria-label="Remove item">Remove</button>
        </div>
      `;
    }).join('');

    if (this.cartTotalEl) this.cartTotalEl.textContent = '₹0';
    if (this.cartStrikeTotalEl) this.cartStrikeTotalEl.textContent = `₹${strikeTotal.toLocaleString()}`;
    
    this.updateWishlistUI();
  }

  updateWishlistUI() {
    this.wishlistBadges.forEach(badge => {
      badge.textContent = this.wishlist.length;
    });

    document.querySelectorAll('.product-wishlist-btn').forEach(btn => {
      const id = btn.getAttribute('data-product-id');
      if (id && this.isWishlisted(id)) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  renderWishlist() {
    if (!this.wishlistItemsList || !this.wishlistEmptyState) return;

    if (this.wishlist.length === 0) {
      this.wishlistItemsList.style.display = 'none';
      this.wishlistEmptyState.style.display = 'block';
      return;
    }

    this.wishlistItemsList.style.display = 'flex';
    this.wishlistEmptyState.style.display = 'none';

    const wishlistedProducts = PRODUCTS.filter(p => this.wishlist.includes(p.id));

    this.wishlistItemsList.innerHTML = wishlistedProducts.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.onerror=null;this.src='${item.fallbackImage}'">
        <div class="cart-item-details">
          <div>
            <span class="cart-item-edition">${item.subtitle}</span>
            <h4 class="cart-item-title">${item.name}</h4>
            <div class="cart-item-price">
              <span>₹0</span>
              <span class="cart-item-strike">₹${item.priceMRP.toLocaleString()}</span>
            </div>
          </div>
          <button class="btn btn-primary" style="padding: 0.4rem 0.8rem; font-size: 0.65rem;" onclick="window.cartManager.addItem('${item.id}', 1); window.cartManager.closeWishlist();">
            Move to Bag
          </button>
        </div>
        <button class="cart-item-remove" onclick="window.cartManager.toggleWishlist('${item.id}'); window.cartManager.renderWishlist();">Remove</button>
      </div>
    `).join('');
  }

  showToast(message) {
    if (!this.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
      <span>${message}</span>
    `;

    this.toastContainer.appendChild(toast);
    
    // Trigger transition
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 2800);
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  window.cartManager = new CartManager();
});
