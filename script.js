const talks = [
  "The Future of Work in Africa",
  "Artificial Intelligence for Growing Businesses",
  "Reinvention and Career Transition",
  "Building Systems That Support Growth",
  "Sales, Leadership and Human Behaviour",
  "Creating Technology for African Markets"
];

const footerLinks = [
  ["Intro", "#intro"],
  ["Featured", "#featured"],
  ["Timeline", "#journey"],
  ["News", "#news"],
  ["Media", "#media"],
  ["Speaking", "#speaking"],
  ["Lions Path", "#lions-path"],
  ["Contact", "#contact"]
];

const mediaImages = Array.from({ length: 38 }, (_, index) => `./assets/media/pal-${String(index + 1).padStart(2, "0")}.jpg`);
const hallImages = [
  "./assets/media/tedx-cover.jpeg",
  "./assets/media/ai-lecture-cover.JPG",
  ...mediaImages
];

const heroVideo = document.querySelector(".hero-video");
const heroSound = document.querySelector(".hero-sound");
const heroLoader = document.querySelector(".hero-loader");
const hero = document.querySelector(".hero");

if (heroVideo && heroSound) {
  let heroSoundRequested = false;
  let heroIsVisible = true;

  const setHeroSoundState = (soundOn) => {
    heroVideo.muted = !soundOn;
    heroVideo.volume = soundOn ? 1 : 0;
    heroSound.setAttribute("aria-pressed", String(soundOn));
    heroSound.setAttribute("aria-label", soundOn ? "Turn intro video sound off" : "Turn intro video sound on");
    heroSound.querySelector("strong").textContent = soundOn ? "On" : "Off";
  };

  const syncHeroSound = () => {
    setHeroSoundState(heroSoundRequested && heroIsVisible);
    if (heroIsVisible) {
      heroVideo.play().catch(() => {});
    }
  };

  const hideHeroLoader = () => {
    heroLoader?.classList.add("loaded");
  };

  ["canplay", "canplaythrough", "playing", "loadeddata"].forEach((eventName) => {
    heroVideo.addEventListener(eventName, hideHeroLoader, { once: true });
  });

  heroVideo.addEventListener("waiting", () => {
    heroLoader?.classList.remove("loaded");
  });

  if (heroVideo.readyState >= 3) hideHeroLoader();

  heroSound.addEventListener("click", async () => {
    heroSoundRequested = !heroSoundRequested;
    syncHeroSound();

    try {
      await heroVideo.play();
    } catch (error) {
      heroSoundRequested = false;
      syncHeroSound();
    }
  });

  if (hero) {
    const heroAudioObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        heroIsVisible = entry.isIntersecting && entry.intersectionRatio > 0.32;
        syncHeroSound();
      });
    }, { threshold: [0, 0.32, 0.7] });

    heroAudioObserver.observe(hero);
  }
}

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);

document.getElementById("talks").innerHTML = talks.map((title, index) => `
  <div class="talk reveal">
    <span>${String(index + 1).padStart(2, "0")}</span>
    <strong>${escapeHtml(title)}</strong>
  </div>
`).join("");

const tileWallGrid = document.getElementById("tile-wall-grid");

if (tileWallGrid) {
  tileWallGrid.innerHTML = hallImages.slice(0, 18).map((src, index) => `
    <figure class="wall-tile">
      <img src="${src}" alt="" loading="lazy">
    </figure>
  `).join("");
}

const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const video = entry.target;
    if (entry.isIntersecting) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  });
}, { threshold: 0.35 });

document.querySelectorAll(".video-card video, .journey-media video").forEach((video) => videoObserver.observe(video));

const viewer = document.getElementById("story-viewer");
const closeStory = document.querySelector(".story-close");

const loadYouTube = (embed) => {
  if (!embed || embed.querySelector("iframe")) return;
  const id = embed.dataset.youtube;
  embed.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0" title="Pal Wabuson video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
};

const stopYouTube = () => {
  document.querySelectorAll(".video-embed iframe").forEach((frame) => frame.remove());
};

const openStory = (name) => {
  document.querySelectorAll(".story-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.panel === name);
  });
  viewer.classList.add("open");
  viewer.setAttribute("aria-hidden", "false");
  document.body.classList.add("story-open");
  loadYouTube(document.querySelector(`.story-panel[data-panel="${name}"] .video-embed`));
};

const closeStoryPanel = () => {
  viewer.classList.remove("open");
  viewer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("story-open");
  stopYouTube();
};

document.querySelectorAll("[data-story]").forEach((trigger) => {
  trigger.addEventListener("click", () => openStory(trigger.dataset.story));
});

closeStory.addEventListener("click", closeStoryPanel);
viewer.addEventListener("click", (event) => {
  if (event.target === viewer) closeStoryPanel();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && viewer.classList.contains("open")) closeStoryPanel();
});

document.getElementById("footer-links").innerHTML = footerLinks.map(([label, href]) => `
  <a class="navlink" href="${href}">${escapeHtml(label)}</a>
`).join("");

document.getElementById("year").textContent = new Date().getFullYear();

const menuToggle = document.querySelector(".menu-toggle");
menuToggle.addEventListener("click", () => {
  const open = document.body.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  });
});

const reveals = document.querySelectorAll(".reveal:not(.in)");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("in");
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

reveals.forEach((node) => revealObserver.observe(node));

const parallaxNodes = Array.from(document.querySelectorAll("[data-parallax]"));
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let ticking = false;

const updateParallax = () => {
  const viewportHeight = window.innerHeight;
  parallaxNodes.forEach((node) => {
    const rect = node.getBoundingClientRect();
    const speed = Number(node.dataset.parallax) || 0.1;
    const offset = (rect.top + rect.height / 2 - viewportHeight / 2) * -speed;
    node.style.transform = `translateY(${offset.toFixed(1)}px)`;
  });
  ticking = false;
};

if (!prefersReducedMotion.matches) {
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateParallax);
  }, { passive: true });
}

updateParallax();

const roleSwap = document.getElementById("role-swap");

if (roleSwap && !prefersReducedMotion.matches) {
  const roles = [
    "Entrepreneur",
    "Founder of Unovia Technologies",
    "TEDx Speaker",
    "Convener, Lions Path Initiative"
  ];
  let roleIndex = 0;

  setInterval(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    roleSwap.classList.add("swapping");
    setTimeout(() => {
      roleSwap.textContent = roles[roleIndex];
      roleSwap.classList.remove("swapping");
    }, 300);
  }, 2600);
}
