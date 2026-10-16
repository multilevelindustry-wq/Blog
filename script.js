"use strict";

/* =========================================
   ZONGO BLOG — HOMEPAGE JAVASCRIPT
   Firebase + Newsletter + Articles + Search
========================================= */

import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";


/* =========================================
   1. WEBSITE SETTINGS
========================================= */

const ZONGO_CONFIG = {
  siteName: "ZONGO",
  affiliateDisclosure:
    "ZONGO may earn a commission from qualifying purchases."
};


/* =========================================
   2. HELPER FUNCTIONS
========================================= */

function getElement(id) {
  return document.getElementById(id);
}


function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}


function safeImageURL(url) {
  try {
    const parsed = new URL(url, window.location.href);

    if (
      parsed.protocol === "https:" ||
      parsed.protocol === "http:"
    ) {
      return parsed.href;
    }
  } catch (error) {
    console.warn("Invalid image URL:", error);
  }

  return "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=900&q=80";
}


function safeLinkURL(url) {
  try {
    const parsed = new URL(url, window.location.href);

    if (
      parsed.protocol === "https:" ||
      parsed.protocol === "http:"
    ) {
      return parsed.href;
    }
  } catch (error) {
    console.warn("Invalid link URL:", error);
  }

  return "#";
}


function formatDate(dateValue) {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Recently published";
  }

  return date.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}


function showToast(message) {
  const toast = getElement("siteToast");

  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timeout);

  showToast.timeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}


/* =========================================
   3. DATE AND FOOTER YEAR
========================================= */

function initializeDate() {
  const dateElement = getElement("currentDate");

  if (dateElement) {
    dateElement.textContent = new Date().toLocaleDateString(
      "en-NG",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      }
    );
  }

  const yearElement = getElement("copyrightYear");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}


/* =========================================
   4. MOBILE NAVIGATION
========================================= */

function initializeMobileMenu() {
  const toggle = getElement("mobileMenuToggle");
  const navigation = getElement("mainNav");

  if (!toggle || !navigation) return;

  toggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    toggle.setAttribute("aria-expanded", String(isOpen));

    toggle.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  navigation.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");

      toggle.setAttribute("aria-expanded", "false");

      toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      navigation.classList.remove("open");

      toggle.setAttribute("aria-expanded", "false");

      toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
  });
}


/* =========================================
   5. ARTICLE DATA
========================================= */

const ARTICLES = [

  {
    id: "story-001",
    title: "Understanding the Stories Shaping Our World Today",
    category: "News",
    excerpt: "Explore the developments, conversations and ideas helping readers make sense of a changing world.",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=900&q=80",
    date: "2026-10-14",
    readTime: 6,
    url: "news.html",
    featured: true
  },

  {
    id: "story-002",
    title: "Practical Ideas for Building a Stronger Business",
    category: "Business",
    excerpt: "Discover strategies, opportunities and lessons for entrepreneurs and ambitious professionals.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
    date: "2026-10-13",
    readTime: 5,
    url: "business.html"
  },

  {
    id: "story-003",
    title: "Small Changes That Can Make Everyday Life Better",
    category: "Lifestyle",
    excerpt: "Fresh perspectives on personal growth, wellbeing and making the most of every day.",
    image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=900&q=80",
    date: "2026-10-12",
    readTime: 4,
    url: "lifestyle.html"
  },

  {
    id: "story-004",
    title: "Digital Skills That Can Open New Doors",
    category: "Technology",
    excerpt: "Learn how practical digital skills can support learning, work and new opportunities.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
    date: "2026-10-11",
    readTime: 7,
    url: "technology.html"
  },

  {
    id: "story-005",
    title: "The Creative Energy Bringing People Together",
    category: "Entertainment",
    excerpt: "Discover the creative people, performances and cultural moments inspiring audiences.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80",
    date: "2026-10-10",
    readTime: 4,
    url: "entertainment.html"
  },

  {
    id: "story-006",
    title: "Finding More Joy in the Little Things",
    category: "Lifestyle",
    excerpt: "Thoughtful ideas for appreciating ordinary moments and building a more fulfilling routine.",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=900&q=80",
    date: "2026-10-09",
    readTime: 4,
    url: "lifestyle.html"
  },

  {
    id: "story-007",
    title: "Making Sense of the Technology Changing Daily Life",
    category: "Technology",
    excerpt: "A clear look at digital tools and innovations influencing how people live and work.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    date: "2026-10-08",
    readTime: 6,
    url: "technology.html"
  },

  {
    id: "story-008",
    title: "Building Habits That Support Your Goals",
    category: "Lifestyle",
    excerpt: "Explore practical ways to make consistent progress towards your personal ambitions.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
    date: "2026-10-07",
    readTime: 5,
    url: "lifestyle.html"
  },

  {
    id: "story-009",
    title: "Stories on Screen That Keep Audiences Talking",
    category: "Entertainment",
    excerpt: "Explore film, storytelling and the creative choices that keep audiences interested.",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80",
    date: "2026-10-06",
    readTime: 5,
    url: "entertainment.html"
  },

  {
    id: "story-010",
    title: "Digital Opportunities for Small Businesses",
    category: "Business",
    excerpt: "Understand practical ways businesses can use digital tools to connect with customers.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
    date: "2026-10-05",
    readTime: 6,
    url: "business.html"
  },

  {
    id: "story-011",
    title: "How to Become a More Informed News Reader",
    category: "News",
    excerpt: "Simple ways to assess information, check claims and follow important developments.",
    image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=900&q=80",
    date: "2026-10-04",
    readTime: 5,
    url: "news.html"
  },

  {
    id: "story-012",
    title: "Everyday Innovations Worth Understanding",
    category: "Technology",
    excerpt: "Discover the ideas behind useful technologies and how they affect everyday experiences.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
    date: "2026-10-03",
    readTime: 5,
    url: "technology.html"
  }

];


/* =========================================
   6. ARTICLE CARD
========================================= */

function createArticleCard(article) {
  const title = escapeHTML(article.title);
  const category = escapeHTML(article.category);
  const excerpt = escapeHTML(article.excerpt);
  const image = escapeHTML(safeImageURL(article.image));
  const url = escapeHTML(safeLinkURL(article.url));
  const date = escapeHTML(formatDate(article.date));

  const readTime = Math.max(
    1,
    Math.min(120, Number(article.readTime) || 4)
  );

  return `
    <article class="article-card">

      <a
        class="article-image"
        href="${url}"
        aria-label="${title}"
      >
        <img
          src="${image}"
          alt="${title}"
          loading="lazy"
          decoding="async"
        >

        <span class="image-category">${category}</span>
      </a>

      <div class="article-card-content">

        <div class="article-card-meta">
          <span class="category-label">${category}</span>
          <time>${date}</time>
        </div>

        <h3>
          <a href="${url}">${title}</a>
        </h3>

        <p>${excerpt}</p>

        <div class="article-card-footer">

          <span>
            <i class="fa-regular fa-clock"></i>
            ${readTime} min read
          </span>

          <a href="${url}">
            Read story
            <i class="fa-solid fa-arrow-right"></i>
          </a>

        </div>

      </div>
    </article>
  `;
}


/* =========================================
   7. ARTICLE FEED AND LOAD MORE
========================================= */

let visibleArticleCount = 6;

const ARTICLES_PER_PAGE = 3;

let activeSearchTerm = "";


function getFilteredArticles() {
  const term = activeSearchTerm.trim().toLowerCase();

  if (!term) return ARTICLES;

  return ARTICLES.filter(article => {
    const searchableText = [
      article.title,
      article.category,
      article.excerpt
    ].join(" ").toLowerCase();

    return searchableText.includes(term);
  });
}


function renderArticleFeed() {
  const container = getElement("latestArticles");
  const moreContainer = getElement("moreArticles");
  const loadMoreButton = getElement("loadMoreArticles");

  if (!container) return;

  const filteredArticles = getFilteredArticles();

  const visibleArticles = filteredArticles.slice(
    0,
    visibleArticleCount
  );

  if (!filteredArticles.length) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-magnifying-glass"></i>
        <p>No matching stories were found.</p>
        <p>Try another search term.</p>
      </div>
    `;

    if (moreContainer) {
      moreContainer.innerHTML = "";
    }

    if (loadMoreButton) {
      loadMoreButton.disabled = true;
      loadMoreButton.style.display = "none";
    }

    return;
  }

  container.innerHTML = visibleArticles
    .map(createArticleCard)
    .join("");

  /*
    Keep the additional article section from duplicating
    articles already displayed in the main feed.
  */

  if (moreContainer) {
    const extraArticles = filteredArticles.slice(
      visibleArticleCount,
      visibleArticleCount + 6
    );

    moreContainer.innerHTML = extraArticles
      .map(createArticleCard)
      .join("");
  }

  if (loadMoreButton) {
    const hasMore =
      visibleArticleCount < filteredArticles.length;

    loadMoreButton.style.display = hasMore
      ? "inline-block"
      : "none";

    loadMoreButton.disabled = !hasMore;
  }
}


function initializeArticleFeed() {
  renderArticleFeed();

  const loadMoreButton = getElement("loadMoreArticles");

  if (!loadMoreButton) return;

  loadMoreButton.addEventListener("click", () => {
    visibleArticleCount += ARTICLES_PER_PAGE;
    renderArticleFeed();
  });
}


/* =========================================
   8. SEARCH
========================================= */

function initializeSearch() {
  const form = getElement("searchForm");
  const input = getElement("searchInput");

  if (!form || !input) return;

  form.addEventListener("submit", event => {
    event.preventDefault();

    activeSearchTerm = input.value.trim();

    visibleArticleCount = 6;

    renderArticleFeed();

    const heading = document.querySelector(
      "#latest .section-heading h2"
    );

    if (heading) {
      heading.textContent = activeSearchTerm
        ? `Search results: ${activeSearchTerm}`
        : "Latest Stories";
    }

    const latestSection = getElement("latest");

    if (latestSection) {
      latestSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
}


/* =========================================
   9. TRENDING TICKER
========================================= */

function initializeTrendingTicker() {
  const ticker = getElement("trendingTicker");

  if (!ticker) return;

  ticker.textContent = ARTICLES
    .slice(0, 5)
    .map(article => article.title)
    .join("  •  ");
}


/* =========================================
   10. AFFILIATE PRODUCTS
========================================= */

const AFFILIATE_PRODUCTS = [

  {
    id: "affiliate-001",
    title: "Everyday Technology Essentials",
    description: "Explore useful accessories and technology products for daily life.",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=700&q=80",
    destination: "https://example.com/replace-with-your-affiliate-link",
    badge: "TECH PICKS"
  },

  {
    id: "affiliate-002",
    title: "Home & Living Discoveries",
    description: "Browse practical ideas for making your living space more comfortable.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=700&q=80",
    destination: "https://example.com/replace-with-your-affiliate-link",
    badge: "HOME PICKS"
  },

  {
    id: "affiliate-003",
    title: "Books & Learning Resources",
    description: "Discover reading materials and resources for learning new skills.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=80",
    destination: "https://example.com/replace-with-your-affiliate-link",
    badge: "EDITOR'S PICK"
  },

  {
    id: "affiliate-004",
    title: "Fashion & Personal Style",
    description: "Explore products and accessories that complement your personal style.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=80",
    destination: "https://example.com/replace-with-your-affiliate-link",
    badge: "STYLE PICKS"
  }

];


function createAffiliateCard(product) {
  const title = escapeHTML(product.title);
  const description = escapeHTML(product.description);
  const image = escapeHTML(safeImageURL(product.image));
  const destination = escapeHTML(
    safeLinkURL(product.destination)
  );
  const badge = escapeHTML(product.badge || "RECOMMENDED");

  return `
    <article class="affiliate-product">

      <a
        class="affiliate-product-image"
        href="${destination}"
        target="_blank"
        rel="sponsored nofollow noopener noreferrer"
        aria-label="View ${title}"
      >

        <img
          src="${image}"
          alt="${title}"
          loading="lazy"
          decoding="async"
        >

        <span class="affiliate-badge">${badge}</span>

      </a>

      <div class="affiliate-product-content">

        <span class="category-label">
          Affiliate recommendation
        </span>

        <h3>
          <a
            href="${destination}"
            target="_blank"
            rel="sponsored nofollow noopener noreferrer"
          >
            ${title}
          </a>
        </h3>

        <p>${description}</p>

        <div class="affiliate-product-action">

          <small>See product details</small>

          <a
            href="${destination}"
            target="_blank"
            rel="sponsored nofollow noopener noreferrer"
          >
            Explore
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>

        </div>

      </div>
    </article>
  `;
}


function renderAffiliateProducts() {
  const slots = [
    {
      id: "affiliateSlot1",
      products: AFFILIATE_PRODUCTS.slice(0, 1)
    },
    {
      id: "affiliateSlot2",
      products: AFFILIATE_PRODUCTS.slice(1, 2)
    },
    {
      id: "affiliateSlot3",
      products: AFFILIATE_PRODUCTS.slice(2, 3)
    },
    {
      id: "affiliateSlot4",
      products: AFFILIATE_PRODUCTS.slice(3, 4)
    }
  ];

  slots.forEach(slot => {
    const container = getElement(slot.id);

    if (!container) return;

    container.innerHTML = slot.products
      .map(createAffiliateCard)
      .join("");
  });
}


/* =========================================
   11. FIREBASE NEWSLETTER SUBSCRIPTIONS
========================================= */

/*
  Supports newsletter forms using either:

  id="newsletterForm"

  or

  class="newsletter-form"

  Each form needs an email input. The message element
  is optional; one will be created if necessary.

  Subscribers are stored in Firestore:
  newsletterSubscribers

  This implementation intentionally does not query
  the subscriber collection because public reads should
  remain disabled in Firestore security rules.
*/


async function initializeNewsletterForms() {
  const forms = document.querySelectorAll(
    "#newsletterForm, .newsletter-form"
  );

  if (!forms.length) {
    return;
  }

  forms.forEach(form => {
    if (form.dataset.newsletterInitialized === "true") {
      return;
    }

    form.dataset.newsletterInitialized = "true";

    form.addEventListener("submit", async event => {
      event.preventDefault();

      const emailInput = form.querySelector(
        'input[type="email"], input[name="email"]'
      );

      let message = form.querySelector(
        "#newsletterMessage, .newsletter-message"
      );

      const button = form.querySelector(
        'button[type="submit"], input[type="submit"]'
      );

      if (!message) {
        message = document.createElement("p");
        message.className = "newsletter-message";
        message.setAttribute("aria-live", "polite");
        form.appendChild(message);
      }

      if (!emailInput) {
        message.textContent =
          "Newsletter email input was not found.";
        return;
      }

      const email = emailInput.value.trim().toLowerCase();

      if (!email || !emailInput.checkValidity()) {
        message.textContent =
          "Please enter a valid email address.";

        emailInput.focus();
        return;
      }

      const originalButtonContent = button
        ? button.innerHTML
        : "";

      if (button) {
        button.disabled = true;
        button.textContent = "Subscribing...";
      }

      message.textContent = "";
      message.classList.remove("success", "error");

      try {
        await addDoc(
          collection(db, "newsletterSubscribers"),
          {
            email: email,
            status: "active",
            source: window.location.pathname === "/"
              ? "home-page"
              : "zongo-website",
            page: window.location.pathname,
            subscribedAt: serverTimestamp()
          }
        );

        message.textContent =
          "Thank you! You have successfully subscribed.";

        message.classList.add("success");

        form.reset();

      } catch (error) {
        console.error(
          "Firebase newsletter subscription error:",
          error
        );

        if (error.code === "permission-denied") {
          message.textContent =
            "Subscription is currently unavailable. Please try again later.";
        } else {
          message.textContent =
            "We couldn't save your subscription. Please try again.";
        }

        message.classList.add("error");

      } finally {
        if (button) {
          button.disabled = false;
          button.innerHTML = originalButtonContent;
        }
      }
    });
  });
}


/* =========================================
   12. BACK TO TOP
========================================= */

function initializeBackToTop() {
  const button = getElement("backToTop");

  if (!button) return;

  function updateButton() {
    button.classList.toggle(
      "visible",
      window.scrollY > 500
    );
  }

  window.addEventListener("scroll", updateButton, {
    passive: true
  });

  updateButton();

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}


/* =========================================
   13. IMAGE FALLBACK
========================================= */

function initializeImageFallbacks() {
  document.addEventListener("error", event => {
    const image = event.target;

    if (!(image instanceof HTMLImageElement)) {
      return;
    }

    if (image.dataset.fallbackApplied === "true") {
      return;
    }

    image.dataset.fallbackApplied = "true";

    image.src =
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=900&q=80";

  }, true);
}


/* =========================================
   14. HOMEPAGE INITIALIZATION
========================================= */

async function initializeHomepage() {
  initializeDate();

  initializeMobileMenu();

  initializeArticleFeed();

  initializeSearch();

  initializeTrendingTicker();

  renderAffiliateProducts();

  initializeBackToTop();

  initializeImageFallbacks();

  await initializeNewsletterForms();
}


if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initializeHomepage,
    { once: true }
  );
} else {
  initializeHomepage();
}




/* =========================================
   END OF ZONGO HOMEPAGE JAVASCRIPT
========================================= */