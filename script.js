// Tüpraş Yaşam v2 — side nav spy, smooth scroll, reveal
(function () {
  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // Side nav scroll-spy
  const navLinks = Array.from(document.querySelectorAll(".sideNav__item"));
  const sections = navLinks
    .map((l) => document.querySelector(l.getAttribute("href")))
    .filter(Boolean);
  const onScroll = () => {
    const y = window.scrollY + window.innerHeight * 0.35;
    let activeIdx = 0;
    sections.forEach((s, i) => {
      if (s.offsetTop <= y) activeIdx = i;
    });
    navLinks.forEach((l, i) => l.classList.toggle("is-active", i === activeIdx));
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -80px 0px" }
  );
  document
    .querySelectorAll(".story, .mosaic__card, .growthRow, .about, .bigCta, .chapterHead")
    .forEach((el) => {
      el.classList.add("reveal");
      observer.observe(el);
    });
})();
