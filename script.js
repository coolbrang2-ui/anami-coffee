"use strict";

// Data menu historis sementara. Konfirmasikan setiap hidangan dan harga sebelum dipublikasikan.
const menuItems = [
  { name: "Anami Chicken Wings", category: "Hidangan Pembuka", prices: ["Rp35.000"] },
  { name: "Roti Goreng Tuna", category: "Hidangan Pembuka", prices: ["Rp25.000"] },
  { name: "Nasi Lidah Cabe Hijau", category: "Indonesia / Nusantara", prices: ["Rp48.000"] },
  { name: "Nasi Oseng Paru Mercon", category: "Indonesia / Nusantara", prices: ["Rp40.000"] },
  { name: "Nasi Oseng Daging Mercon", category: "Indonesia / Nusantara", prices: ["Rp40.000"] },
  { name: "Sop Buntut", category: "Indonesia / Nusantara", prices: ["Rp65.000"] },
  { name: "Asem-Asem Iga", category: "Indonesia / Nusantara", prices: ["Rp45.000"] },
  { name: "Crispy Chicken Sambal Matah", category: "Indonesia / Nusantara", prices: ["Rp38.000"] },
  { name: "Crispy Dory Sambal Matah", category: "Indonesia / Nusantara", prices: ["Rp38.000"] },
  { name: "Gyutan Don", category: "Jepang & Barat", prices: ["Rp48.000"] },
  { name: "Hambagu Curry Rice", category: "Jepang & Barat", prices: ["Rp40.000"] },
  { name: "Fish Aglio Olio", category: "Jepang & Barat", prices: ["Rp50.000"] },
  { name: "Simple Breakfast", category: "Sarapan & Hidangan Penutup", prices: ["Rp40.000"] },
  { name: "Singaporean Breakfast", category: "Sarapan & Hidangan Penutup", prices: ["Rp40.000"] },
  { name: "Ketan Susu Durian", category: "Sarapan & Hidangan Penutup", prices: ["Rp20.000"] },
  { name: "Kopi Klasik", category: "Kopi", prices: ["Rp28.000"] },
  { name: "Irish Cream Coffee", category: "Kopi", prices: ["Rp28.000"] },
  { name: "Cappuccino", category: "Kopi", prices: ["Rp28.000", "Rp32.000"] },
  { name: "Hazelnut Latte", category: "Kopi", prices: ["Rp33.000", "Rp36.000"] },
  { name: "Iced Yuzu Lychee Tea", category: "Teh", prices: ["Rp27.000"] },
  { name: "Teh Tarik", category: "Teh", prices: ["Rp22.000", "Rp25.000"] },
  { name: "Peach Mango-cha", category: "Mocktail", prices: ["Rp28.000"] },
  { name: "Yuzu Sakura", category: "Mocktail", prices: ["Rp28.000"] },
  { name: "Lychees Hibiscus", category: "Mocktail", prices: ["Rp28.000"] },
  { name: "Hot Chocolate", category: "Minuman Lainnya", prices: ["Rp35.000"] }
];

// Perbarui informasi bisnis sementara ini setelah dikonfirmasi.
const businessDetails = {
  address: "Anami Coffee & Eatery, Jl. Cemara No. 1, Selong, Kebayoran Baru, Jakarta Selatan 12110, Indonesia.",
  hours: [
    { days: "Senin–Jumat", hours: "10.00–21.00 WIB" },
    { days: "Sabtu–Minggu", hours: "08.00–21.00 WIB" }
  ],
  phoneDisplay: "0878-7543-9888",
  phoneInternational: "+62 878-7543-9888",
  whatsappNumber: "6287875439888",
  whatsappMessage: "Halo%20Anami%20Coffee%20%26%20Eatery%2C%20saya%20ingin%20melakukan%20reservasi.%20Mohon%20informasikan%20ketersediaan%20untuk%20tanggal%20dan%20waktu%20yang%20saya%20inginkan.",
  instagramUrl: "https://www.instagram.com/anami.coffee/",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Anami+Coffee+and+Eatery+Jl+Cemara+No+1+Jakarta"
};

const menuGrid = document.querySelector("#menu-grid");
const categoryList = document.querySelector("#menu-categories");
const searchInput = document.querySelector("#menu-search");
const clearSearchButton = document.querySelector("#clear-search");
const emptyState = document.querySelector("#empty-state");
const menuStatus = document.querySelector("#menu-status");
const categoryNames = ["Semua", ...new Set(menuItems.map((item) => item.category))];
let activeCategory = "Semua";

function renderCategories() {
  categoryList.innerHTML = categoryNames.map((category) => `
    <button class="category-button" type="button" data-category="${category}" aria-pressed="${category === activeCategory}">
      ${category}
    </button>
  `).join("");
}

function renderMenu() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === "Semua" || item.category === activeCategory;
    const matchesSearch = !query || `${item.name} ${item.category}`.toLocaleLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  menuGrid.innerHTML = filteredItems.map((item) => {
    const multiPriceNote = item.prices.length > 1
      ? '<span class="menu-card__note">Dua harga tercantum, menunggu konfirmasi</span>'
      : "";
    return `
      <article class="menu-card">
        <div>
          <h3 class="menu-card__name">${item.name}</h3>
          <p class="menu-card__category">${item.category}</p>
        </div>
        <div class="menu-card__price">${item.prices.join(" / ")}${multiPriceNote}</div>
      </article>
    `;
  }).join("");

  const hasResults = filteredItems.length > 0;
  emptyState.hidden = hasResults;
  menuGrid.hidden = !hasResults;
  menuStatus.textContent = hasResults
    ? `${filteredItems.length} pilihan${activeCategory === "Semua" ? "" : ` · ${activeCategory}`}${query ? ` · cocok dengan “${searchInput.value.trim()}”` : ""}`
    : "";
  clearSearchButton.hidden = !searchInput.value;
}

function resetMenu() {
  activeCategory = "Semua";
  searchInput.value = "";
  renderCategories();
  renderMenu();
  document.querySelector("#menu-search").focus();
}

function renderBusinessDetails() {
  document.querySelector("#address-display").textContent = businessDetails.address;
  document.querySelector("#footer-address").textContent = businessDetails.address;
  document.querySelector("#hours-list").innerHTML = businessDetails.hours.map(({ days, hours }) => `
    <li><span>${days}</span><time>${hours}</time></li>
  `).join("");

  const directionsLink = document.querySelector("#directions-inline");
  directionsLink.href = businessDetails.mapsUrl;
  const phoneLink = document.querySelector("#phone-link");
  phoneLink.href = `tel:${businessDetails.phoneInternational.replaceAll(" ", "")}`;
  phoneLink.textContent = businessDetails.phoneDisplay;
  const whatsappLink = document.querySelector("#whatsapp-link");
  const heroWhatsappLink = document.querySelector("#hero-whatsapp-link");
  const whatsappUrl = `https://wa.me/${businessDetails.whatsappNumber}?text=${businessDetails.whatsappMessage}`;
  whatsappLink.href = whatsappUrl;
  heroWhatsappLink.href = whatsappUrl;
  document.querySelector("#instagram-link").href = businessDetails.instagramUrl;
  document.querySelector("#footer-instagram-link").href = businessDetails.instagramUrl;
  document.querySelector("#copyright-year").textContent = new Date().getFullYear();
}

categoryList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderCategories();
  renderMenu();
});

searchInput.addEventListener("input", renderMenu);
clearSearchButton.addEventListener("click", () => {
  searchInput.value = "";
  renderMenu();
  searchInput.focus();
});
document.querySelector("#reset-menu").addEventListener("click", resetMenu);

const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");
function closeNavigation() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Buka navigasi");
  primaryNavigation.classList.remove("is-open");
}
menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Buka navigasi" : "Tutup navigasi");
  primaryNavigation.classList.toggle("is-open", !isExpanded);
});
primaryNavigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeNavigation();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    closeNavigation();
    menuToggle.focus();
  }
});
window.matchMedia("(min-width: 641px)").addEventListener("change", closeNavigation);

renderCategories();
renderMenu();
renderBusinessDetails();
