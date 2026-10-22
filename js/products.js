/**
 * BOYS FUME® — Product Catalog & Data Layer
 * "The World's Most Accessible Luxury"
 */

const PRODUCTS = [
  {
    id: "still",
    name: "STILL",
    subtitle: "COMPOSITION Nº 01",
    badge: "THE ORIGINAL",
    tagline: "That fresh shower feeling. But all day.",
    subtext: "Smells like a fresh start. Because it is one.",
    priceMRP: 1999,
    price: 0,
    image: "assets/images/product-still.webp",
    fallbackImage: "assets/images/product-still.jpg",
    detailImage: "assets/images/still-detail.webp",
    fallbackDetailImage: "assets/images/still-detail.jpg",
    description: "Distilled through municipal plumbing and delivered at optimal atmospheric pressure, STILL captures the quiet clarity of 7:15 AM before notifications begin. A pristine composition that smells exactly like fresh water, because that is precisely what it is.",
    notes: {
      top: "Cold morning tap water",
      heart: "Room temperature water",
      base: "The municipal water bill your family is already paying"
    },
    specs: {
      volume: "100ml / Unlimited refills",
      concentration: "100% Aqueous Solution",
      longevity: "Until evaporated (approx. 4 mins)",
      sillage: "Arm's length (if you splash enthusiastically)"
    },
    joke: "No bottle required for the free experience. Just walk over to your sink."
  },
  {
    id: "after-hours",
    name: "AFTER HOURS",
    subtitle: "COMPOSITION Nº 02",
    badge: "AFTER DARK",
    tagline: "For late-night overthinkers and early-morning legends.",
    subtext: "Notes of cold water, questionable decisions, and a 7:00 AM alarm.",
    priceMRP: 2499,
    price: 0,
    image: "assets/images/product-after-hours.webp",
    fallbackImage: "assets/images/product-after-hours.jpg",
    detailImage: "assets/images/after-hours-detail.webp",
    fallbackDetailImage: "assets/images/after-hours-detail.jpg",
    description: "Formulated for the 2:30 AM kitchen water drinker standing quietly in the pale glow of an open refrigerator. Crisp, chilling, and existential. Pairs harmoniously with unread messages, late-night thoughts, and unearned confidence.",
    notes: {
      top: "Chilled midnight splash",
      heart: "Questionable late-night decisions",
      base: "A 7:00 AM alarm you will definitely snooze"
    },
    specs: {
      volume: "100ml / Infinite nocturnal flow",
      concentration: "100% Midnight H₂O",
      longevity: "Until dawn",
      sillage: "Intimate existential contemplation"
    },
    joke: "Proven to increase late-night clarity by 0% and hydration by 100%."
  },
  {
    id: "almost",
    name: "ALMOST",
    subtitle: "COMPOSITION Nº 03",
    badge: "LIMITED NOTHING",
    tagline: "For those who tried perfume, but found a better option.",
    subtext: "A bold opening of water. A dry-down of financial responsibility.",
    priceMRP: 1499,
    price: 0,
    image: "assets/images/product-almost.webp",
    fallbackImage: "assets/images/product-almost.jpg",
    detailImage: "assets/images/almost-detail.webp",
    fallbackDetailImage: "assets/images/almost-detail.jpg",
    description: "An austere olfactory statement against spending thousands on crushed petals and French ad campaigns. ALMOST opens with an uncompromising droplet of tap water and dries down into the calming sensation of retaining all your money.",
    notes: {
      top: "A bold opening of water",
      heart: "Room temperature realism",
      base: "A dry-down of financial responsibility"
    },
    specs: {
      volume: "100ml / Zero packaging footprint",
      concentration: "Pure Natural Solvent",
      longevity: "Timeless",
      sillage: "Fiscal discipline"
    },
    joke: "Recommended by 9 out of 10 bank accounts surveyed."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PRODUCTS };
}
