import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

/* =========================================
   ZONGO NEWS PAGE — BATCH 1
========================================= */

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];

/* DATE AND COPYRIGHT */

const currentDate = $("#current-date");
const copyrightYear = $("#copyright-year");
const today = new Date();

if (currentDate) {
  currentDate.textContent = today.toLocaleDateString("en-NG", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

if (copyrightYear) {
  copyrightYear.textContent = today.getFullYear();
}

/* MOBILE NAVIGATION */

const menuToggle = $("#menu-toggle");
const mainNav = $("#main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );

    menuToggle.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  $$("#main-nav a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
      menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
}

/* SEARCH PANEL */

const searchToggle = $("#search-toggle");
const searchPanel = $("#search-panel");
const searchInput = $("#search-input");

if (searchToggle && searchPanel) {
  searchToggle.addEventListener("click", () => {
    const isOpen = searchPanel.classList.toggle("show");

    searchToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    if (isOpen && searchInput) {
      searchInput.focus();
    }
  });
}

/* ARTICLE SEARCH AND LOAD MORE */

const articleGrid = $("#article-grid");
const noResults = $("#no-results");
const loadMoreButton = $("#load-more");
const searchForm = $("#search-form");

const articleCards = articleGrid
  ? $$(".article-card", articleGrid)
  : [];

let currentSearch = "";
let displayedArticles = 4;

function articleMatches(card) {
  const text = (
    (card.innerText || "") + " " +
    (card.dataset.search || "")
  ).toLowerCase();

  return text.includes(currentSearch);
}

function updateArticles() {
  let visibleCount = 0;

  articleCards.forEach((card, index) => {
    const matches = articleMatches(card);

    const shouldShow = currentSearch
      ? matches
      : index < displayedArticles;

    card.style.display = shouldShow ? "" : "none";

    if (shouldShow) {
      visibleCount++;
    }
  });

  if (noResults) {
    noResults.style.display =
      visibleCount === 0 ? "block" : "none";
  }

  if (loadMoreButton) {
    const moreAvailable =
      displayedArticles < articleCards.length;

    loadMoreButton.style.display =
      !currentSearch && moreAvailable
        ? "inline-flex"
        : "none";
  }
}

if (searchForm && searchInput) {
  searchForm.addEventListener("submit", event => {
    event.preventDefault();

    currentSearch = searchInput.value.trim().toLowerCase();

    updateArticles();

    const latestSection = $("#latest");

    if (latestSection) {
      latestSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });

  searchInput.addEventListener("input", () => {
    if (!searchInput.value.trim() && currentSearch) {
      currentSearch = "";
      displayedArticles = 4;
      updateArticles();
    }
  });
}

if (loadMoreButton) {
  loadMoreButton.addEventListener("click", () => {
    displayedArticles += 4;
    updateArticles();
  });
}

updateArticles();

/* TRENDING / BREAKING NEWS */

const trendingMessages = [
  "Discover the latest headlines, important developments and stories shaping everyday life.",
  "Explore news, public affairs, business and community developments.",
  "Stay informed with fresh perspectives from ZONGO Daily News."
];

const trendingText = $(".breaking-text");
let trendingIndex = 0;

if (trendingText) {
  window.setInterval(() => {
    trendingIndex =
      (trendingIndex + 1) % trendingMessages.length;

    trendingText.textContent = trendingMessages[trendingIndex];
  }, 7000);
}

/* NEWSLETTER — FIREBASE SETUP CONTINUES IN BATCH 2 */


/* =========================================
   ZONGO NEWS PAGE — BATCH 2
   FIREBASE NEWSLETTER SUBSCRIPTIONS
========================================= */

const newsletterForm = $("#newsletter-form");

if (newsletterForm) {
  const newsletterEmail = $("#newsletter-email", newsletterForm);
  const newsletterSubmit = $("#newsletter-submit", newsletterForm);
  const newsletterMessage = $("#newsletter-message");

  function showNewsletterMessage(message, success = false) {
    if (!newsletterMessage) return;

    newsletterMessage.textContent = message;
    newsletterMessage.style.color = success
      ? "#b7f7c5"
      : "#ffd1d5";
    newsletterMessage.setAttribute("role", "status");
  }

  newsletterForm.addEventListener("submit", async event => {
    event.preventDefault();

    const email = newsletterEmail?.value
      .trim()
      .toLowerCase();

    if (!email) {
      showNewsletterMessage("Please enter your email address.");
      newsletterEmail?.focus();
      return;
    }

    const validEmail =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!validEmail) {
      showNewsletterMessage("Please enter a valid email address.");
      newsletterEmail?.focus();
      return;
    }

    const originalButtonText = newsletterSubmit
      ? newsletterSubmit.textContent
      : "SUBSCRIBE FREE";

    if (newsletterSubmit) {
      newsletterSubmit.disabled = true;
      newsletterSubmit.textContent = "SUBSCRIBING...";
    }

    if (newsletterEmail) {
      newsletterEmail.disabled = true;
    }

    showNewsletterMessage("Saving your subscription...");

    try {
      await addDoc(collection(db, "newsletterSubscribers"), {
        email: email,
        status: "active",
        source: "news-page",
        page: window.location.pathname,
        consent: true,
        subscribedAt: serverTimestamp()
      });

      showNewsletterMessage(
        "Thank you for subscribing! Your email has been saved.",
        true
      );

      newsletterForm.reset();
    } catch (error) {
      console.error("Newsletter subscription failed:", error);

      if (error.code === "permission-denied") {
        showNewsletterMessage(
          "Subscription could not be saved. Please check your Firebase Firestore rules."
        );
      } else {
        showNewsletterMessage(
          "We could not save your subscription. Please check your connection and try again."
        );
      }
    } finally {
      if (newsletterSubmit) {
        newsletterSubmit.disabled = false;
        newsletterSubmit.textContent = originalButtonText;
      }

      if (newsletterEmail) {
        newsletterEmail.disabled = false;
      }
    }
  });
}

/* IMAGE FALLBACK */

$$("img").forEach(img => {
  img.addEventListener("error", () => {
    img.style.backgroundColor = "#e5e9ef";
    img.style.objectFit = "contain";
    img.setAttribute("data-image-error", "true");
  }, { once: true });
});

/* CLOSE MOBILE MENU WHEN CLICKING OUTSIDE */

document.addEventListener("click", event => {
  if (!mainNav || !menuToggle) return;

  const clickedInsideNav = mainNav.contains(event.target);
  const clickedMenuButton = menuToggle.contains(event.target);

  if (
    !clickedInsideNav &&
    !clickedMenuButton &&
    mainNav.classList.contains("open")
  ) {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }
});

console.log("ZONGO News page JavaScript loaded.");
