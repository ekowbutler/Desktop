(() => {
  // Mobile menu
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      });
    });
  }

  // Homepage photo carousel
  const carousel = document.querySelector(".hero-carousel");

  if (carousel) {
    const slides = [...carousel.querySelectorAll(".carousel-slide")];
    const indicators = [...carousel.querySelectorAll(".carousel-indicator")];
    const pauseButton = carousel.querySelector(".carousel-pause");
    let activeIndex = 0;
    let timer;

    const showSlide = (index) => {
      activeIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        const active = slideIndex === activeIndex;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", String(!active));
        indicators[slideIndex].classList.toggle("is-active", active);
        if (active) {
          indicators[slideIndex].setAttribute("aria-current", "true");
        } else {
          indicators[slideIndex].removeAttribute("aria-current");
        }
      });
    };

    const stopSlideshow = () => {
      window.clearInterval(timer);
      timer = undefined;
      pauseButton.textContent = "Play slideshow";
      pauseButton.setAttribute("aria-pressed", "true");
    };

    const startSlideshow = () => {
      window.clearInterval(timer);
      timer = window.setInterval(() => showSlide(activeIndex + 1), 10000);
      pauseButton.textContent = "Pause slideshow";
      pauseButton.setAttribute("aria-pressed", "false");
    };

    carousel.querySelector(".carousel-previous").addEventListener("click", () => {
      showSlide(activeIndex - 1);
      if (timer) startSlideshow();
    });
    carousel.querySelector(".carousel-next").addEventListener("click", () => {
      showSlide(activeIndex + 1);
      if (timer) startSlideshow();
    });
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        showSlide(index);
        if (timer) startSlideshow();
      });
    });
    pauseButton.addEventListener("click", () => {
      if (timer) {
        stopSlideshow();
      } else {
        startSlideshow();
      }
    });

    startSlideshow();
  }

  // Timeline filter (only on the timeline page)
  const filterButtons = [...document.querySelectorAll(".filter-button")];
  const timelineEntries = [...document.querySelectorAll(".timeline-entry")];

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle("is-selected", selected);
        item.setAttribute("aria-pressed", String(selected));
      });

      timelineEntries.forEach((entry) => {
        entry.hidden = filter !== "all" && entry.dataset.category !== filter;
      });
    });
  });

  // Render posts from posts.js into each section's grid
  const posts = window.SITE_POSTS || {};

  document.querySelectorAll("[data-posts]").forEach((grid) => {
    const items = posts[grid.dataset.posts] || [];

    if (!items.length) {
      const empty = document.createElement("p");
      empty.className = "empty";
      empty.textContent = "Pictures and posts for this section will appear here.";
      grid.appendChild(empty);
      return;
    }

    items.forEach((item) => {
      const card = document.createElement("article");
      card.className = "post-card";

      if (item.image) {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.alt || "";
        img.loading = "lazy";
        figure.appendChild(img);
        card.appendChild(figure);
      }

      if (item.date) {
        const time = document.createElement("time");
        time.textContent = item.date;
        card.appendChild(time);
      }

      const heading = document.createElement("h3");
      heading.textContent = item.title;
      card.appendChild(heading);

      if (item.text) {
        const body = document.createElement("p");
        body.textContent = item.text;
        card.appendChild(body);
      }

      grid.appendChild(card);
    });
  });
})();
