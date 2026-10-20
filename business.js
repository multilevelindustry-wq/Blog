/* =========================================
ZONGO BLOG — BUSINESS PAGE JAVASCRIPT
File: business.js
Firebase Firestore v11.10.0
========================================= */

"use strict";

import { db } from "./firebase.js";

import {
collection,
addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

/* =====================================
ELEMENTS
===================================== */

const $ = (selector, parent = document) =>
parent.querySelector(selector);

const menuToggle = $("#menuToggle");
const mainNav = $("#mainNav");

const searchForm = $("#businessSearchForm");
const searchInput = $("#businessSearchInput");

const searchStatus = $("#searchStatus");
const articleGrid = $("#articleGrid");
const noResults = $("#noResults");
const loadMoreButton = $("#loadMoreButton");
const clearSearchButton = $("#clearSearchButton");

const newsletterForm = $("#newsletterForm");
const newsletterName = $("#newsletterName");
const newsletterEmail = $("#newsletterEmail");
const newsletterMessage = $("#newsletterMessage");

const currentYear = $("#currentYear");

/* =====================================
COPYRIGHT YEAR
===================================== */

if (currentYear) {
currentYear.textContent = new Date().getFullYear();
}

/* =====================================
MOBILE NAVIGATION
===================================== */

function closeMenu() {
if (!menuToggle || !mainNav) return;

mainNav.classList.remove("nav-open");

menuToggle.setAttribute("aria-expanded", "false");
menuToggle.setAttribute("aria-label", "Open navigation menu");

const icon = menuToggle.querySelector("i");

if (icon) {
  icon.classList.add("fa-bars");
  icon.classList.remove("fa-xmark");
}

}

if (menuToggle && mainNav) {

menuToggle.addEventListener("click", () => {

  const isOpen = mainNav.classList.toggle("nav-open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));

  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );

  const icon = menuToggle.querySelector("i");

  if (icon) {
    icon.classList.toggle("fa-bars", !isOpen);
    icon.classList.toggle("fa-xmark", isOpen);
  }

});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("click", event => {

  if (
    mainNav.classList.contains("nav-open") &&
    !mainNav.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    closeMenu();
  }

});

}

/* =====================================
ARTICLE SEARCH AND LOAD MORE
===================================== */

const articleCards = articleGrid
? Array.from(articleGrid.querySelectorAll(".article-card"))
: [];

const featuredArticle = $(".featured-article");

const affiliateUnits = articleGrid
? Array.from(articleGrid.querySelectorAll(".affiliate-unit"))
: [];

const articlesPerPage = 6;

let visibleArticleLimit = articlesPerPage;
let currentSearch = "";

function normalizeText(value) {
return String(value || "")
.toLowerCase()
.trim()
.replace(/\s+/g, " ");
}

function getSearchText(element) {
return normalizeText([
element.innerText || element.textContent || "",
element.dataset.category || "",
element.dataset.keywords || ""
].join(" "));
}

function matchesSearch(element, query) {

if (!query) return true;

const articleText = getSearchText(element);

const terms = query.split(/\s+/).filter(Boolean);

return terms.every(term => articleText.includes(term));

}

function updateArticles() {

const isSearching = Boolean(currentSearch);

let matchingCards = [];

articleCards.forEach(card => {

  if (matchesSearch(card, currentSearch)) {
    matchingCards.push(card);
  }

});

const visibleCards = isSearching
  ? matchingCards
  : matchingCards.slice(0, visibleArticleLimit);

articleCards.forEach(card => {
  card.hidden = !visibleCards.includes(card);
});

let featuredMatches = false;

if (featuredArticle) {

  featuredMatches = matchesSearch(
    featuredArticle,
    currentSearch
  );

  featuredArticle.hidden = !featuredMatches;

}

affiliateUnits.forEach(unit => {
  unit.hidden = isSearching;
});

const totalMatches =
  matchingCards.length + (featuredMatches ? 1 : 0);

if (searchStatus) {

  searchStatus.textContent = isSearching
    ? `${totalMatches} matching article${totalMatches === 1 ? "" : "s"} found.`
    : "";

  searchStatus.hidden = !isSearching;

}

if (noResults) {
  noResults.hidden = totalMatches !== 0;
}

if (loadMoreButton) {

  const hasMore =
    !isSearching &&
    matchingCards.length > visibleArticleLimit;

  loadMoreButton.hidden = !hasMore;

}

}

if (searchForm && searchInput) {

searchForm.addEventListener("submit", event => {

  event.preventDefault();

  currentSearch = normalizeText(searchInput.value);
  visibleArticleLimit = articlesPerPage;

  updateArticles();

  const latestSection = $("#latestArticles");

  if (latestSection) {
    latestSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

});

searchInput.addEventListener("input", () => {

  currentSearch = normalizeText(searchInput.value);
  visibleArticleLimit = articlesPerPage;

  updateArticles();

});

}

if (loadMoreButton) {

loadMoreButton.addEventListener("click", () => {

  visibleArticleLimit += articlesPerPage;

  updateArticles();

});

}

if (clearSearchButton) {

clearSearchButton.addEventListener("click", () => {

  currentSearch = "";
  visibleArticleLimit = articlesPerPage;

  if (searchInput) {
    searchInput.value = "";
  }

  updateArticles();

});

}

/* =====================================
NEWSLETTER MESSAGE
===================================== */

function showNewsletterMessage(message, type = "error") {

if (!newsletterMessage) return;

newsletterMessage.textContent = message;
newsletterMessage.hidden = false;
newsletterMessage.style.display = "block";
newsletterMessage.setAttribute("role", "status");
newsletterMessage.setAttribute("aria-live", "polite");

const colors = {
  success: "#15803d",
  error: "#b91c1c",
  info: "#344563"
};

newsletterMessage.style.color = colors[type] || colors.info;

}

/* Newsletter submission code continues in Batch 2. */

updateArticles();

});


/* =====================================
FIREBASE NEWSLETTER SUBSCRIPTION
===================================== */

if (newsletterForm && newsletterName && newsletterEmail) {

newsletterForm.addEventListener("submit", async event => {

  event.preventDefault();

  const name = newsletterName.value.trim();
  const email = newsletterEmail.value.trim().toLowerCase();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name) {
    showNewsletterMessage("Please enter your name.", "error");
    newsletterName.focus();
    return;
  }

  if (name.length > 100) {
    showNewsletterMessage(
      "Your name must not exceed 100 characters.",
      "error"
    );
    newsletterName.focus();
    return;
  }

  if (!email || !emailPattern.test(email) || email.length > 254) {
    showNewsletterMessage(
      "Please enter a valid email address.",
      "error"
    );
    newsletterEmail.focus();
    return;
  }

  const submitButton = newsletterForm.querySelector(
    'button[type="submit"]'
  );

  if (submitButton && submitButton.disabled) return;

  const originalButtonHTML = submitButton
    ? submitButton.innerHTML
    : "";

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.innerHTML =
      '<i class="fa-solid fa-spinner fa-spin"></i> Subscribing...';
  }

  try {

    await addDoc(collection(db, "newsletterSubscribers"), {

      name: name,
      email: email,
      status: "active",
      source: "business-page",
      page: window.location.pathname,
      subscribedAt: serverTimestamp()

    });

    showNewsletterMessage(
      "Thank you for subscribing! Your details have been saved successfully.",
      "success"
    );

    newsletterForm.reset();

  } catch (error) {

    console.error("Business newsletter subscription failed:", error);

    if (
      error.code === "permission-denied" ||
      error.code === "firestore/permission-denied"
    ) {

      showNewsletterMessage(
        "Firebase denied the subscription. Please check your Firestore security rules.",
        "error"
      );

    } else if (
      error.code === "unavailable" ||
      error.code === "firestore/unavailable"
    ) {

      showNewsletterMessage(
        "The service is temporarily unavailable. Check your internet connection and try again.",
        "error"
      );

    } else {

      showNewsletterMessage(
        "We could not save your subscription. Please try again.",
        "error"
      );

    }

  } finally {

    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonHTML;
    }

  }

});

}

