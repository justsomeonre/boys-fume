# BOYS FUME®
### *“The World's Most Accessible Luxury.”*

Signature Concept: **EAU DE TAP™**  
Category: **Fictional Luxury Fragrance / Satirical E-Commerce**  
Permanent Slogan: **“Real Fragrance Lives Here. Not in a bottle. In your tap.”**

---

## 1. Executive Summary

**BOYS FUME®** is a production-grade, highly polished satirical e-commerce website designed to look, feel, and function like an ultra-prestigious international luxury fragrance house (such as Byredo, Le Labo, or Aesop).

Behind the austere cream palettes, typography, and museum-grade commercial photography lies an unapologetically absurd truth: **the brand is marketing ordinary tap water as high luxury fragrance.**

Visitors admire the aesthetic, browse the notes (*Top note: water; Heart note: more water; Base note: your municipal water bill*), add compositions to their shopping bag, and experience the grand comedic climax at checkout:

> **“Bro. It’s water. Open your tap. Splash some water on yourself. IT IS FREE, BRO.”**

---

## 2. Brand Architecture & Visual Identity

### 2.1 The Palette
- **Warm Cream (`#F5F2EA`)**: Primary background atmosphere, soft paper-like tactility.
- **Soft Ivory (`#FAF8F3`)**: Elevated card backgrounds and module containers.
- **Charcoal (`#191A17`)**: High-contrast editorial typography and microcopy.
- **Deep Black (`#11120F`)**: Immersion blocks, footer, buttons, and dramatic campaign banners.
- **Muted Sage (`#AEB5A4`)**: Subtle accents, purity badges, and technical highlights.
- **Stone Beige (`#D5CABB`)**: Warm travertine tone references.
- **Subtle Borders (`#D9D5CC`)**: Architectural hairline borders separating editorial panels.

### 2.2 Typography
- **Headlines & Editorial Statements**: `Playfair Display` (Serif, italicized accents).
- **Body Copy, Navigation & Controls**: `DM Sans` (Clean geometric sans-serif).
- **Product Metadata, Formulations & Pricing**: `DM Mono` (Technical monospace, uppercase tracking).

---

## 3. The Signature Trilogy

1. **STILL — COMPOSITION Nº 01 (The Original)**
   - *“That fresh shower feeling. But all day.”*
   - Fictional MRP: `₹1,999` | **Actual Due: `₹0`**
   - Notes: Cold morning tap water, room-temperature water, municipal water bill.
   - Sizing: 100ml / Unlimited refills.

2. **AFTER HOURS — COMPOSITION Nº 02 (After Dark)**
   - *“For late-night overthinkers and early-morning legends.”*
   - Fictional MRP: `₹2,499` | **Actual Due: `₹0`**
   - Notes: Chilled midnight splash, questionable decisions, 7:00 AM alarm.
   - Sizing: 100ml / Infinite nocturnal flow.

3. **ALMOST — COMPOSITION Nº 03 (Limited Nothing)**
   - *“For those who tried perfume, but found a better option.”*
   - Fictional MRP: `₹1,499` | **Actual Due: `₹0`**
   - Notes: Bold opening of water, room temperature realism, financial responsibility.
   - Sizing: 100ml / Zero packaging footprint.

---

## 4. Photographic Asset Library

All 16 required photographic assets were either custom-generated via AI subagent photography or created as high-resolution detail crops, formatted in both `.jpg` and `.webp` for maximum browser compatibility:

| Filename | Role | Composition & Description |
|---|---|---|
| `hero-campaign.webp` | Main Hero | 16:9 cinematic shot of BOYS FUME flacon on wet limestone vanity with running chrome tap in soft focus. |
| `product-still.webp` | Product 01 | 4:5 portrait flacon beside a modern rainfall shower with water streams and morning light. |
| `product-after-hours.webp` | Product 02 | 4:5 portrait flacon on wet charcoal slate with moody chiaroscuro lighting. |
| `product-almost.webp` | Product 03 | 4:5 portrait flacon on honed travertine next to sunlit water basin. |
| `water-ripple.webp` | Story Media | 3:2 macro of a single water droplet generating concentric ripples. |
| `ingredient-hands.webp` | Ingredients Hero | 16:9 dark dramatic photograph of cupped hands catching running water from a chrome tap. |
| `bathroom-campaign.webp` | Campaign Banner | 16:9 travertine vanity with flacon, folded waffle towel, and sunlight. |
| `bottle-closeup.webp` | Macro Detail | Extreme macro of heavy glass flacon base, label, and condensation droplets. |
| `shower-bottle.webp` | Dynamic Feature | High-speed water stream cascading around the crystal flacon. |
| `bathroom-interior.webp` | Architecture | 16:9 wide view of a luxury minimalist bathroom with natural limestone. |
| `human-shower.webp` | Lifestyle | Tasteful, editorial portrait of an adult refreshing in morning shower water. |
| `final-water-campaign.webp` | Final Campaign | 16:9 cinematic obsidian water with gentle gold-tipped ripples. |
| `still-detail.webp` | STILL Detail | Close-up focus on STILL flacon glass architecture. |
| `after-hours-detail.webp` | AFTER HOURS Detail| Close-up focus on AFTER HOURS dark slate reflections. |
| `almost-detail.webp` | ALMOST Detail | Architectural view of ALMOST beside morning water ripples. |
| `editorial-water.webp` | Editorial Macro | Pure fluid dynamics across textured beige stone. |

---

## 5. Interactive Features

- **Persistent Shopping Bag**: Full front-end cart engine with real-time quantity controls, badge bump animation, item deletion, subtotal calculations (always ₹0), and localStorage persistence.
- **The Checkout Reveal Punchline**: Clicking "Proceed to Checkout" bypasses payment gateways and displays the comedic reveal modal with custom water icon, bold typography, and return to shopping.
- **Interactive Product Quick View**: Modal overlay featuring high-res imagery, thumbnail gallery switching, full olfactory pyramids, technical specs, and instant cart additions.
- **Wishlist Engine**: Persistent wishlist drawer with live badge counter and interactive heart toggles on all product cards.
- **Live Search Overlay**: Instant client-side search across all compositions, editions, and notes.
- **Accessible Accordion FAQ**: Smooth disclosure panels for all brand and plumbing inquiries.
- **Mobile Responsive Drawer**: Functional slide-out navigation menu for mobile devices.
- **Spam-Free Newsletter**: Parody email signup with interactive toast confirmation: *"Subscribed. You will receive 0 emails. Enjoy the quiet."*

---

## 6. Local Setup & Testing

### Option A: Direct Browser Launch
Simply double-click `index.html` or open it with any modern web browser (Google Chrome, Safari, Firefox, Microsoft Edge).

### Option B: Local Web Server
If you prefer running via a local server:

```bash
# Using Python (if available):
cd boys-fume
python -m http.server 8000

# Using Node / NPX:
npx serve .

# Then open in browser:
http://localhost:8000
```

---

## 7. GitHub & GitHub Pages Deployment Guide

The website is engineered with strict **relative paths** (`./`, `../`), ensuring 100% compatibility when hosted either at root or as a GitHub project subpath (e.g. `https://<username>.github.io/boys-fume/`).

### Step-by-Step Deployment:

1. **Initialize Git Repository**:
   ```bash
   cd boys-fume
   git init
   git add .
   git commit -m "Initial release: BOYS FUME luxury fragrance e-commerce"
   ```

2. **Connect to GitHub**:
   ```bash
   # Create a new repository on github.com named 'boys-fume'
   git remote add origin https://github.com/<YOUR_USERNAME>/boys-fume.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub.
   - Click **Settings** &rarr; **Pages** (under Code and automation).
   - Under **Build and deployment**:
     - Source: **Deploy from a branch**
     - Branch: **`main`** / Folder: **`/ (root)`**
   - Click **Save**.
   - Your site will be live within 60 seconds at `https://<YOUR_USERNAME>.github.io/boys-fume/`.

---

## 8. Quality Assurance & Verification Checklist

- [x] **Zero Console Errors**: Verified error-free JavaScript execution.
- [x] **Complete Image Manifest**: All 16 photographic assets verified on disk.
- [x] **Fallback Resilience**: All `<picture>` and `<img>` tags feature `.webp` primary and `.jpg` fallback.
- [x] **Cart Functionality**: Add, Remove, Increment, Decrement, Badge Counter tested and working.
- [x] **Wishlist Engine**: Toggle, LocalStorage persistence, and drawer listing verified.
- [x] **Checkout Comedy Reveal**: Triggers instantly without collecting private user information.
- [x] **Responsive Adaptation**: Tested at desktop (1440px), laptop (1024px), tablet (768px), and mobile (375px).
- [x] **Semantic HTML & Accessibility**: Focus outlines, ARIA attributes, and keyboard navigation supported.
- [x] **Subpage Links**: All 5 subpages (`shop.html`, `story.html`, `ingredients.html`, `reviews.html`, `faq.html`) verified with bidirectional links.

---

## 9. Credits & Production Team

- **Creative Direction**: Award-Winning Satirical Brand Strategy
- **UI/UX & Product Design**: Minimalist Luxury Editorial Systems
- **Commercial Photography & Art Direction**: Photorealistic AI Commercial Camerawork
- **Copywriting**: High-Contrast Luxury Comedy & Satire
- **Frontend & Responsive Engineering**: Semantic HTML5 / CSS3 / ES6 Architecture
- **Packaging & Delivery**: Antigravity Autonomous Engineering
