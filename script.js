
/* =====================================================
   ZONGO HOMEPAGE JAVASCRIPT
   BATCH 1 OF 2
===================================================== */

/* ---------- 1. ARTICLE DATA ---------- */

const zongoArticles = [
  {
    title: "Understanding the Stories Shaping Our World Today",
    category: "News",
    description: "Explore the developments, conversations and ideas helping readers understand a changing world.",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=900&q=80",
    url: "news.html",
    time: "6 min read"
  },
  {
    title: "Practical Ideas for Building a Stronger Business",
    category: "Business",
    description: "Discover strategies, opportunities and lessons for entrepreneurs and ambitious professionals.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
    url: "business.html",
    time: "5 min read"
  },
  {
    title: "Small Changes That Can Make Everyday Life Better",
    category: "Lifestyle",
    description: "Fresh perspectives on personal growth, wellbeing and making the most of every day.",
    image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=900&q=80",
    url: "lifestyle.html",
    time: "4 min read"
  },
  {
    title: "Digital Skills That Can Open New Doors",
    category: "Technology",
    description: "Learn how useful digital skills can support learning, work and business.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
    url: "technology.html",
    time: "7 min read"
  },
  {
    title: "The Creative Energy Bringing People Together",
    category: "Entertainment",
    description: "Explore music, creativity and cultural moments connecting people.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80",
    url: "entertainment.html",
    time: "5 min read"
  },
  {
    title: "Building Habits That Support Your Goals",
    category: "Lifestyle",
    description: "Practical inspiration for creating routines that support your ambitions.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
    url: "lifestyle.html",
    time: "4 min read"
  },
  {
    title: "Making Sense of Technology Changing Daily Life",
    category: "Technology",
    description: "Clear explanations of digital tools and innovations shaping our future.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    url: "technology.html",
    time: "6 min read"
  },
  {
    title: "Stories on Screen That Keep Audiences Talking",
    category: "Entertainment",
    description: "Discover films, performances and creative ideas making an impact.",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80",
    url: "entertainment.html",
    time: "5 min read"
  },
  {
    title: "Good Ideas Deserve a Bigger Audience",
    category: "Business",
    description: "Explore practical guides and opportunities for people building something meaningful.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
    url: "business.html",
    time: "6 min read"
  },
  {
    title: "Finding More Joy in the Little Things",
    category: "Lifestyle",
    description: "Thoughtful ideas for making everyday moments count.",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=900&q=80",
    url: "lifestyle.html",
    time: "3 min read"
  },
  {
    title: "Technology Ideas Worth Understanding",
    category: "Technology",
    description: "Explore digital developments and tools that could prove useful.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
    url: "technology.html",
    time: "5 min read"
  },
  {
    title: "Discovering New Voices in Popular Culture",
    category: "Entertainment",
    description: "Meet the creators and cultural conversations worth exploring.",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80",
    url: "entertainment.html",
    time: "4 min read"
  }
];


/* ---------- 2. AFFILIATE PRODUCT DATA ---------- */
/* Replace demo links with your real affiliate links. */

const zongoProducts = [
  {
    name: "Recommended Shopping Finds",
    description: "Explore selected products and useful discoveries.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    url: "tinubu-election.html"
  },
  {
    name: "Everyday Technology",
    description: "Discover gadgets and digital accessories.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    url: "tinubu-election.html"
  },
  {
    name: "Home and Lifestyle",
    description: "Explore useful products for everyday living.",
    image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=600&q=80",
    url: "tinubu-election.html"
  },
  {
    name: "Personal Accessories",
    description: "Browse accessories and shopping ideas.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
    url: "tinubu-election.html"
  },
  {
    name: "Workspace Essentials",
    description: "Ideas for a more comfortable workspace.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
    url: "tinubu-election.html"
  },
  {
    name: "Fashion Discoveries",
    description: "Explore fashion and style inspiration.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
    url: "tinubu-election.html"
  },
  {
    name: "Smart Everyday Picks",
    description: "Find more products worth exploring.",
    image: "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=600&q=80",
    url: "tinubu-election.html"
  },
  {
    name: "More Recommended Products",
    description: "See more shopping recommendations.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80",
    url: "tinubu-election.html"
  }
];


/* ---------- 3. HELPER FUNCTIONS ---------- */

function zongoEscape(value) {
  return String(value ?? "").replace(/[&<>"']/g, function (char) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[char];
  });
}

function zongoToast(message) {
  const toast = document.getElementById("siteToast");

  if (!toast) {
    console.log(message);
    return;
  }

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(zongoToast.timer);

  zongoToast.timer = setTimeout(function () {
    toast.classList.remove("show");
  }, 3500);
}


/* ---------- 4. DATE AND COPYRIGHT ---------- */

function initializeZongoDate() {
  const date = document.getElementById("currentDate");
  const year = document.getElementById("copyrightYear");

  if (date) {
    date.textContent = new Intl.DateTimeFormat("en-NG", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(new Date());
  }

  if (year) {
    year.textContent = new Date().getFullYear();
  }
}


/* ---------- 5. MOBILE MENU ---------- */

function initializeMobileMenu() {
  const toggle = document.getElementById("mobileMenuToggle");
  const nav = document.getElementById("mainNav");

  if (!toggle || !nav) return;

  function setMenu(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute(
      "aria-label",
      open ? "Close navigation menu" : "Open navigation menu"
    );

    const icon = toggle.querySelector("i");

    if (icon) {
      icon.classList.toggle("fa-bars", !open);
      icon.classList.toggle("fa-xmark", open);
    }
  }

  toggle.addEventListener("click", function () {
    setMenu(!nav.classList.contains("open"));
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setMenu(false);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setMenu(false);
  });
}


/* ---------- 6. ARTICLE CARD TEMPLATE ---------- */

function createZongoArticleCard(article) {
  const title = zongoEscape(article.title);
  const category = zongoEscape(article.category);
  const description = zongoEscape(article.description);
  const image = zongoEscape(article.image);
  const url = zongoEscape(article.url);
  const time = zongoEscape(article.time);
  const categoryClass = category.toLowerCase();

  return `
    <article class="article-card">
      <a href="${url}" class="article-card-image image-link">
        <img
          src="${image}"
          alt="${title}"
          loading="lazy"
          decoding="async"
        >
      </a>

      <div class="article-card-content">
        <div class="article-meta">
          <span class="category-label category-${categoryClass}">
            ${category}
          </span>
          <span>
            <i class="fa-regular fa-clock"></i> ${time}
          </span>
        </div>

        <h3><a href="${url}">${title}</a></h3>
        <p>${description}</p>

        <a href="${url}" class="read-link">
          Read story <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </article>
  `;
}


/* ---------- 7. RENDER LATEST AND MORE STORIES ---------- */

let zongoFilteredArticles = [...zongoArticles];
let zongoVisibleArticles = 6;

function renderZongoLatest() {
  const container = document.getElementById("latestArticles");
  if (!container) return;

  const shown = zongoFilteredArticles.slice(0, zongoVisibleArticles);

  if (!shown.length) {
    container.innerHTML = `
      <div class="article-empty-state">
        <h3>No matching stories found</h3>
        <p>Try searching with different words.</p>
      </div>
    `;
  } else {
    container.innerHTML = shown.map(createZongoArticleCard).join("");
  }

  const moreButton = document.getElementById("loadMoreArticles");

  if (moreButton) {
    moreButton.hidden = zongoVisibleArticles >= zongoFilteredArticles.length;
  }
}

function renderZongoMore() {
  const container = document.getElementById("moreArticles");
  if (!container) return;

  container.innerHTML = zongoArticles
    .slice(6, 12)
    .map(createZongoArticleCard)
    .join("");
}


/* ---------- 8. LOAD MORE BUTTON ---------- */

function initializeLoadMore() {
  const button = document.getElementById("loadMoreArticles");
  if (!button) return;

  button.addEventListener("click", function () {
    zongoVisibleArticles += 6;
    renderZongoLatest();
  });
}


/* ---------- 9. SEARCH STORIES ---------- */

function initializeZongoSearch() {
  const form = document.getElementById("searchForm");
  const input = document.getElementById("searchInput");

  if (!form || !input) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const term = input.value.trim().toLowerCase();

    if (!term) {
      zongoFilteredArticles = [...zongoArticles];
      zongoVisibleArticles = 6;
      renderZongoLatest();
      zongoToast("Enter a word or phrase to search.");
      return;
    }

    zongoFilteredArticles = zongoArticles.filter(function (article) {
      return [
        article.title,
        article.category,
        article.description
      ].join(" ").toLowerCase().includes(term);
    });

    zongoVisibleArticles = 6;
    renderZongoLatest();

    document.getElementById("latest")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    if (!zongoFilteredArticles.length) {
      zongoToast("No stories matched your search.");
    } else {
      zongoToast(
        zongoFilteredArticles.length +
        (zongoFilteredArticles.length === 1
          ? " matching story found."
          : " matching stories found.")
      );
    }
  });
}


/* ---------- END OF BATCH 1 ----------
   CONTINUE DIRECTLY WITH BATCH 2 BELOW.
*/

/* =====================================================
   ZONGO HOMEPAGE JAVASCRIPT
   BATCH 2 OF 2
===================================================== */


/* ---------- 10. TRENDING TICKER ---------- */

function initializeTrendingTicker() {
  const ticker = document.getElementById("trendingTicker");
  if (!ticker || !zongoArticles.length) return;

  let index = 0;

  function showNextStory() {
    const article = zongoArticles[index];

    ticker.innerHTML = `
      <a href="${zongoEscape(article.url)}">
        ${zongoEscape(article.title)}
      </a>
    `;

    index = (index + 1) % zongoArticles.length;
  }

  showNextStory();
  setInterval(showNextStory, 5000);
}


/* ---------- 11. AFFILIATE PRODUCT CARDS ---------- */

function createZongoProductCard(product) {
  return `
    <article class="affiliate-card">
      <a
        href="${zongoEscape(product.url)}"
        class="affiliate-card-image"
      >
        <img
          src="${zongoEscape(product.image)}"
          alt="${zongoEscape(product.name)}"
          loading="lazy"
          decoding="async"
        >
      </a>

      <div class="affiliate-card-content">
        <span class="affiliate-disclosure">
          Affiliate recommendation
        </span>

        <h3>
          <a href="${zongoEscape(product.url)}">
            ${zongoEscape(product.name)}
          </a>
        </h3>

        <p>${zongoEscape(product.description)}</p>

        <a href="${zongoEscape(product.url)}" class="read-link">
          Explore product
          <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </article>
  `;
}

function initializeZongoProducts() {
  const slots = [
    {
      id: "affiliateSlot1",
      products: zongoProducts.slice(0, 3)
    },
    {
      id: "affiliateSlot2",
      products: zongoProducts.slice(3, 6)
    },
    {
      id: "affiliateSlot3",
      products: zongoProducts.slice(0, 2)
    },
    {
      id: "affiliateSlot4",
      products: zongoProducts.slice(6, 8)
    }
  ];

  slots.forEach(function (slot) {
    const container = document.getElementById(slot.id);
    if (!container) return;

    container.innerHTML = slot.products
      .map(createZongoProductCard)
      .join("");
  });
}


/* ---------- 12. IMAGE ERROR HANDLING ---------- */

function initializeImageFallback() {
  document.addEventListener("error", function (event) {
    const img = event.target;

    if (!(img instanceof HTMLImageElement)) return;
    if (img.dataset.fallbackApplied === "true") return;

    img.dataset.fallbackApplied = "true";
    img.removeAttribute("src");
    img.alt = img.alt || "Image unavailable";
  }, true);
}


/* ---------- 13. BACK TO TOP ---------- */

function initializeBackToTop() {
  const button = document.getElementById("backToTop");
  if (!button) return;

  function updateVisibility() {
    button.classList.toggle("visible", window.scrollY > 400);
  }

  window.addEventListener("scroll", updateVisibility, {
    passive: true
  });

  button.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  updateVisibility();
}


/* ---------- 14. FIREBASE NEWSLETTER ---------- */

/*
  Both newsletter forms currently have duplicate IDs in the HTML.
  This function locates fields inside each form, so both forms
  can work independently without relying on getElementById()
  for the duplicated field IDs.

  firebase.js must export the initialized Firestore database:
  export { app, db, auth };
*/

function initializeNewsletterForms() {
  const forms = document.querySelectorAll("form.newsletter-form");

  forms.forEach(function (form) {
    if (form.dataset.newsletterInitialized === "true") return;

    const emailInput = form.querySelector('input[type="email"]');
    const nameInput = form.querySelector('input[name="name"]');
    const consentInput = form.querySelector('input[type="checkbox"]');
    const submitButton = form.querySelector('button[type="submit"]');
    const message = form.querySelector(".form-message");

    if (!emailInput || !consentInput || !submitButton || !message) {
      console.error("A newsletter form is missing a required field.", form);
      return;
    }

    form.dataset.newsletterInitialized = "true";

    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      const email = emailInput.value.trim().toLowerCase();
      const name = nameInput ? nameInput.value.trim() : "";

      message.textContent = "";
      message.classList.remove("success", "error");

      if (!emailInput.checkValidity()) {
        message.textContent = "Please enter a valid email address.";
        message.classList.add("error");
        emailInput.focus();
        return;
      }

      if (!consentInput.checked) {
        message.textContent = "Please agree to receive email updates.";
        message.classList.add("error");
        consentInput.focus();
        return;
      }

      const originalButtonHTML = submitButton.innerHTML;

      submitButton.disabled = true;
      submitButton.textContent = "Subscribing...";

      try {
        const firebaseModule = await import("./firebase.js");
        const db = firebaseModule.db;

        if (!db) {
          throw new Error(
            "Firestore db was not exported from firebase.js."
          );
        }

        const firestore = await import(
          "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js"
        );

        const subscriberData = {
          email: email,
          status: "active",
          source: "home-page",
          page: window.location.pathname,
          consent: true,
          consentAt: firestore.serverTimestamp(),
          subscribedAt: firestore.serverTimestamp()
        };

        /*
          Save name only if supplied. If you use strict Firestore
          rules, update them to allow the optional "name" field.
        */
        if (name) {
          subscriberData.name = name;
        }

        await firestore.addDoc(
          firestore.collection(db, "newsletterSubscribers"),
          subscriberData
        );

        message.textContent =
          "Thank you! You have successfully joined the ZONGO newsletter.";

        message.classList.add("success");
        form.reset();

      } catch (error) {
        console.error("ZONGO newsletter error:", error);

        if (error.code === "permission-denied") {
          message.textContent =
            "We couldn't save your subscription. Please check your Firebase security rules.";
        } else if (error.code === "unavailable") {
          message.textContent =
            "The service is temporarily unavailable. Please try again.";
        } else {
          message.textContent =
            "We couldn't save your subscription. Please try again.";
        }

        message.classList.add("error");

      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonHTML;
      }
    });
  });
}


/* ---------- 15. ACTIVE NAVIGATION ---------- */

function initializeActiveNavigation() {
  const currentPage =
    window.location.pathname.split("/").pop().toLowerCase()
    || "index.html";

  document.querySelectorAll(".main-nav .nav-link").forEach(function (link) {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#")) return;

    const linkPage = href.split("/").pop().toLowerCase();

    link.classList.toggle("active", linkPage === currentPage);
  });
}


/* ---------- 16. START ALL HOMEPAGE FEATURES ---------- */

function initializeZongoHomepage() {
  initializeZongoDate();
  initializeMobileMenu();

  renderZongoLatest();
  renderZongoMore();

  initializeLoadMore();
  initializeZongoSearch();
  initializeTrendingTicker();
  initializeZongoProducts();
  initializeImageFallback();
  initializeBackToTop();
  initializeNewsletterForms();
  initializeActiveNavigation();

  console.log("ZONGO homepage is ready.");
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initializeZongoHomepage,
    { once: true }
  );
} else {
  initializeZongoHomepage();
}
