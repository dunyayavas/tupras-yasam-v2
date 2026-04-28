/* ============ Reveal on scroll ============ */
(function () {
  const feedbackStylesId = "feedback-news-css";
  if (!document.getElementById(feedbackStylesId)) {
    const link = document.createElement("link");
    link.id = feedbackStylesId;
    link.rel = "stylesheet";
    link.href = "./feedback-news.css";
    document.head.appendChild(link);
  }

  if (!document.querySelector(".feedbackNews__inner")) {
    const main = document.querySelector("main");
    if (main) {
      const section = document.createElement("section");
      section.className = "section feedbackNews";
      section.setAttribute("aria-label", "Tüpraş Yaşam görüş anketi");
      section.innerHTML = `
        <div class="container feedbackNews__inner">
          <div class="feedbackNews__copy">
            <h2 class="feedbackNews__title">Tüpraş Yaşam’a dair görüşlerini merak ediyoruz.</h2>
          </div>
          <a class="btn btn--primary" href="#">Ankete Katıl</a>
        </div>
      `;
      main.appendChild(section);
    }
  }

  const targets = document.querySelectorAll(
    ".tile, .strip__item, .section__head, .section__body, .volStrip, .logoWall, .cta__inner, .feedbackNews__inner"
  );
  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );
  targets.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
})();

/* ============ Animated counters ============ */
(function () {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const formatNumber = (n) => {
    if (n >= 1000) return n.toLocaleString("tr-TR");
    return String(n);
  };

  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || "";
    const duration = 1400;
    const start = performance.now();
    const startVal = 0;

    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutQuart
      const eased = 1 - Math.pow(1 - t, 4);
      const value = Math.round(startVal + (target - startVal) * eased);
      el.textContent = formatNumber(value) + suffix;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if (!("IntersectionObserver" in window)) {
    counters.forEach(animate);
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach((el) => observer.observe(el));
})();
