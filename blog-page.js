import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// ========================================
// INITIALIZE NEWSLETTER FORM
// ========================================

function initializeNewsletterForm() {
  const form = document.getElementById("newsletterForm");
  const emailInput = document.getElementById("newsletterEmail");
  const message = document.getElementById("newsletterMessage");

  if (!form || !emailInput || !message) {
    console.warn("Newsletter form elements were not found.");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = emailInput.value.trim().toLowerCase();
    const button = form.querySelector('button[type="submit"]');

    if (!emailInput.checkValidity()) {
      message.textContent = "Please enter a valid email address.";
      return;
    }

    if (button) {
      button.disabled = true;
      button.textContent = "Subscribing...";
    }

    message.textContent = "";

    try {
      await addDoc(collection(db, "newsletterSubscribers"), {
        email,
        status: "active",
        source: "blog-page",
        subscribedAt: serverTimestamp()
      });

      message.textContent = "Thank you! You have successfully subscribed.";
      form.reset();

    } catch (error) {
      console.error("Newsletter subscription failed:", error);

      message.textContent =
        "Subscription failed. Please try again later.";

    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = "Subscribe";
      }
    }
  });
}

// ========================================
// START NEWSLETTER FORM
// ========================================

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeNewsletterForm);
} else {
  initializeNewsletterForm();
}

/* ==========================================
   ZONGO BLOG ARTICLE PAGE
   File: blog-page.js
========================================== */

document.addEventListener("DOMContentLoaded", function () {

  "use strict";

  /* ==========================================
     1. MOBILE NAVIGATION
  ========================================== */

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  function closeMenu() {
    if (!menuToggle || !mainNav) return;

    mainNav.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");

    const icon = menuToggle.querySelector("i");

    if (icon) {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  }

  if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", function () {

      const isOpen = mainNav.classList.toggle("active");

      menuToggle.setAttribute("aria-expanded", String(isOpen));

      const icon = menuToggle.querySelector("i");

      if (icon) {
        icon.classList.toggle("fa-bars", !isOpen);
        icon.classList.toggle("fa-xmark", isOpen);
      }

    });

    mainNav.querySelectorAll("a").forEach(function (link) {

      link.addEventListener("click", closeMenu);

    });

    document.addEventListener("click", function (event) {

      if (
        mainNav.classList.contains("active") &&
        !mainNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }

    });

    document.addEventListener("keydown", function (event) {

      if (event.key === "Escape") {
        closeMenu();
      }

    });

    window.addEventListener("resize", function () {

      if (window.innerWidth > 800) {
        closeMenu();
      }

    });

  }


  /* ==========================================
     2. ARTICLE INFORMATION
  ========================================== */

  const articleTitleElement =
    document.getElementById("articleTitle");

  const articleContentElement =
    document.getElementById("articleContent");

  const articleTitle = articleTitleElement
    ? articleTitleElement.textContent.trim()
    : document.title;

  const articleUrl = window.location.href;

  const articleDescriptionElement =
    document.querySelector('meta[name="description"]');

  const articleDescription = articleDescriptionElement
    ? articleDescriptionElement.content
    : "Read this story on ZONGO.";

  const articleShareText =
    articleTitle + "\n\n" + articleDescription;


  /* ==========================================
     3. SHARE ON FACEBOOK
  ========================================== */

  const facebookShare = document.getElementById("facebookShare");

  if (facebookShare) {

    facebookShare.addEventListener("click", function () {

      const shareUrl =
        "https://www.facebook.com/sharer/sharer.php?u=" +
        encodeURIComponent(articleUrl);

      window.open(
        shareUrl,
        "_blank",
        "noopener,noreferrer,width=650,height=500"
      );

    });

  }


  /* ==========================================
     4. SHARE ON WHATSAPP
  ========================================== */

  const whatsappShare = document.getElementById("whatsappShare");

  if (whatsappShare) {

    whatsappShare.addEventListener("click", function () {

      const message =
        articleShareText + "\n\nRead more: " + articleUrl;

      const shareUrl =
        "https://api.whatsapp.com/send?text=" +
        encodeURIComponent(message);

      window.open(
        shareUrl,
        "_blank",
        "noopener,noreferrer"
      );

    });

  }


  /* ==========================================
     5. SHARE ON X
  ========================================== */

  const xShare = document.getElementById("xShare");

  if (xShare) {

    xShare.addEventListener("click", function () {

      const shareUrl =
        "https://twitter.com/intent/tweet?text=" +
        encodeURIComponent(articleTitle) +
        "&url=" +
        encodeURIComponent(articleUrl);

      window.open(
        shareUrl,
        "_blank",
        "noopener,noreferrer,width=650,height=500"
      );

    });

  }


  /* ==========================================
     6. COPY ARTICLE LINK
  ========================================== */

  const copyLinkButton = document.getElementById("copyLink");
  const copyMessage = document.getElementById("copyMessage");

  async function copyText(text) {

    if (navigator.clipboard && window.isSecureContext) {

      await navigator.clipboard.writeText(text);

      return true;

    }

    /*
      Fallback for browsers where Clipboard API
      is unavailable, including some local pages.
    */

    const temporaryInput = document.createElement("textarea");

    temporaryInput.value = text;
    temporaryInput.setAttribute("readonly", "");
    temporaryInput.style.position = "fixed";
    temporaryInput.style.left = "-9999px";
    temporaryInput.style.top = "0";

    document.body.appendChild(temporaryInput);

    temporaryInput.focus();
    temporaryInput.select();

    let copied = false;

    try {

      copied = document.execCommand("copy");

    } catch (error) {

      copied = false;

    }

    temporaryInput.remove();

    return copied;

  }

  if (copyLinkButton) {

    copyLinkButton.addEventListener("click", async function () {

      if (copyMessage) {
        copyMessage.textContent = "";
      }

      try {

        const copied = await copyText(window.location.href);

        if (copied) {

          if (copyMessage) {
            copyMessage.textContent = "Article link copied successfully.";
          }

        } else {

          if (copyMessage) {
            copyMessage.textContent =
              "Unable to copy automatically. Please copy the page address.";
          }

        }

      } catch (error) {

        if (copyMessage) {
          copyMessage.textContent =
            "Unable to copy the link. Please copy the page address manually.";
        }

      }

    });

  }


  /* ==========================================
     7. AUTOMATIC READING TIME
  ========================================== */

  const readingTimeElement = document.getElementById("readingTime");

  if (articleContentElement && readingTimeElement) {

    const articleText = articleContentElement.innerText
      .replace(/\s+/g, " ")
      .trim();

    const wordCount = articleText
      ? articleText.split(" ").length
      : 0;

    /*
      Average reading speed: 200 words per minute.
      A minimum of one minute is displayed.
    */

    const minutes = Math.max(1, Math.ceil(wordCount / 200));

    readingTimeElement.textContent = minutes + " min read";

  }


  /* ==========================================
     8. CURRENT YEAR
  ========================================== */

  const currentYearElement = document.getElementById("currentYear");

  if (currentYearElement) {

    currentYearElement.textContent = new Date().getFullYear();

  }


  /* ==========================================
     9. BACK TO TOP
  ========================================== */

  const backToTop = document.getElementById("backToTop");

  const floatingBackToTop =
    document.getElementById("floatingBackToTop");

  function scrollToTop() {

    window.scrollTo({
      top: 0,
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches ? "auto" : "smooth"
    });

  }

  if (backToTop) {

    backToTop.addEventListener("click", function (event) {

      event.preventDefault();

      scrollToTop();

    });

  }

  if (floatingBackToTop) {

    floatingBackToTop.addEventListener("click", scrollToTop);

  }

  function updateBackToTopVisibility() {

    if (!floatingBackToTop) return;

    if (window.scrollY > 450) {

      floatingBackToTop.classList.add("visible");

    } else {

      floatingBackToTop.classList.remove("visible");

    }

  }

  window.addEventListener(
    "scroll",
    updateBackToTopVisibility,
    { passive: true }
  );

  updateBackToTopVisibility();


  /* ==========================================
     10. NEWSLETTER FORM FEEDBACK
  ========================================== */

  const newsletterForm = document.getElementById("newsletterForm");

  const newsletterEmail = document.getElementById("newsletterEmail");

  const newsletterMessage =
    document.getElementById("newsletterMessage");

  if (newsletterForm) {

    newsletterForm.addEventListener("submit", function (event) {

      event.preventDefault();

      if (!newsletterEmail || !newsletterMessage) return;

      const email = newsletterEmail.value.trim();

      if (!email) {

        newsletterMessage.textContent =
          "Please enter your email address.";

        return;

      }

      if (!newsletterEmail.checkValidity()) {

        newsletterMessage.textContent =
          "Please enter a valid email address.";

        newsletterEmail.focus();

        return;

      }

      /*
        This is only a front-end demonstration.

        No email is stored or submitted.
        Connect this form to your newsletter service
        or backend before using it to collect subscribers.
      */

      newsletterMessage.textContent =
        "The newsletter service is not connected yet.";

    });

  }


  /* ==========================================
     11. ARTICLE IMAGE FALLBACK
  ========================================== */

  const articleImage = document.getElementById("articleImage");

  if (articleImage) {

    articleImage.addEventListener("error", function () {

      /*
        Avoid repeatedly trying a broken image.
      */

      articleImage.onerror = null;

      articleImage.alt = "Article image unavailable";

      articleImage.style.display = "none";

    });

  }


  /* ==========================================
     12. DYNAMIC ARTICLE PAGE TITLE
  ========================================== */

  if (articleTitleElement) {

    const title = articleTitleElement.textContent.trim();

    if (title && title !== "Article Title Goes Here") {

      document.title = title + " | ZONGO";

    }

  }
  
  
  

});

