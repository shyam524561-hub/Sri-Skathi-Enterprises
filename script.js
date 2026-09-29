/** 
 * CONFIGURATION 
 * Update these details to change them across the entire website.
 */
const CONFIG = {
  name: "Sri Skathi Enterprises",
  address: "28, Velachery Main Rd, Sivagami Nagar, Gowriwakkam, Medavakkam, Tambaram, Tamil Nadu 600073",
  phone: "044 4330 9457",
  phoneLink: "tel:+914443309457",
  whatsapp: "", // Leave empty to hide WhatsApp buttons. E.g. "919876543210"
  
  // Opening hours (24-hour format). Change any day as needed.
  hours: {
    Sunday:    { open: "11:00", close: "13:00" },
    Monday:    { open: "07:30", close: "19:30" },
    Tuesday:   { open: "07:30", close: "19:30" },
    Wednesday: { open: "07:30", close: "19:30" },
    Thursday:  { open: "07:30", close: "19:30" },
    Friday:    { open: "07:30", close: "19:30" },
    Saturday:  { open: "07:30", close: "19:30" }
  }
};

/**
 * STONE DATA
 * Add, remove, or edit stones here.
 */
const stones = [
  {
    name: "Black Pearl Granite",
    image: "images/black pearl.jpg",
    desc: "A stunning dark grey and black stone with pearlescent flecks. Perfect for modern kitchen countertops and durable flooring.",
    color: "#2c2c2c"
  },
  {
    name: "Black Galaxy Granite",
    image: "images/black-galaxy.jpg",
    desc: "Deep black background speckled with radiant golden and white flecks. Highly popular for premium kitchen platforms.",
    color: "#1a1a1a"
  },
  {
    name: "Jet Black Granite",
    image: "images/jetblack.jpg",
    desc: "Pure, intense solid black granite offering a sleek, polished look. Excellent for monuments, staircases, and borders.",
    color: "#111111"
  },
  {
    name: "Lakshmi Red Granite",
    image: "images/lakshmi red.jpg",
    desc: "A rich, vibrant ruby red stone that brings warmth and elegance. Ideal for bold flooring and feature walls.",
    color: "#b03a2e"
  },
  {
    name: "Pista Green Granite",
    image: "images/pistagreen.jpg",
    desc: "A refreshing, soothing light green granite. Adds a unique natural charm to staircases and bathroom vanities.",
    color: "#7d9e76"
  },
  {
    name: "Ruby Red Granite",
    image: "images/rubyred.jpg",
    desc: "Deep, passionate red hues with beautiful natural variations. A classic choice for exterior cladding and interior highlights.",
    color: "#8c1c1c"
  },
  {
    name: "Steel Grey Granite",
    image: "images/steel gray.jpg",
    desc: "A sophisticated medium grey stone with subtle crystalline highlights. Highly versatile for both indoor and outdoor spaces.",
    color: "#5d6d7e"
  },
  {
    name: "S White (North India) Granite",
    image: "images/S-White-North-India-Granite.jpg",
    desc: "A bright, elegant white and light grey granite. Brightens up spaces, perfect for wide flooring and elegant countertops.",
    color: "#d5d8dc"
  },
  {
    name: "Tan Brown Granite",
    image: "images/Tan-Brown-Granite-Tile-800x800.jpg",
    desc: "A deep brown background with distinct tan and grey patterns. A robust, earthy choice for heavy-traffic areas.",
    color: "#6e4c41"
  },
  {
    name: "Tomato Red Granite",
    image: "images/tomatored.webp",
    desc: "A striking, warm orange-red granite. Brings vibrant energy and a unique touch to customized interior designs.",
    color: "#d35400"
  }
];

const otherStones = [
  {
    name: "Kadappa Stone",
    image: "images/kadappa.png", // Leave empty to show placeholder. To update, add filename e.g. "images/kadappa.jpg"
    desc: "A durable, dark grey-black natural limestone. Known for its excellent slip resistance, perfect for outdoor paving, garden pathways, and traditional flooring.",
    color1: "#2c3e50",
    color2: "#1a252f"
  },
  {
    name: "Kota Stone",
    image: "images/natural-kota-stone-466.jpg", // e.g. "images/kota.jpg"
    desc: "A fine-grained limestone in elegant light grey-green shades. Highly durable and cool underfoot, ideal for wide corridors, verandas, and commercial floors.",
    color1: "#7f8c8d",
    color2: "#95a5a6"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  initBusinessDetails();
  initStonesCarousel();
  initOtherStones();
  initScrollReveal();
  initDraggableCarousel();
  initViewer();
  updateOpenStatus();
  
  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear();
});

// --- 1. Fill Business Details ---
function initBusinessDetails() {
  // Update phone numbers dynamically in HTML
  document.querySelectorAll('a[href^="tel:"]').forEach(a => {
    a.href = CONFIG.phoneLink;
    if (a.textContent.includes('Call:')) {
      a.textContent = `Call: ${CONFIG.phone}`;
    } else if (a.textContent.includes('Call 044')) {
      a.textContent = `Call ${CONFIG.phone}`;
    }
  });
}

// --- 2. Live Open/Closed Status (IST) ---
function updateOpenStatus() {
  const getISTTime = () => {
    const d = new Date();
    // Convert to IST
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    const nd = new Date(utc + (3600000 * 5.5));
    return nd;
  };

  const istDate = getISTTime();
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const currentDayName = days[istDate.getDay()];
  
  const todayHours = CONFIG.hours[currentDayName];
  const currentHour = istDate.getHours();
  const currentMin = istDate.getMinutes();
  const currentTimeVal = currentHour * 60 + currentMin;

  const parseTime = (timeStr) => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };

  const openTimeVal = parseTime(todayHours.open);
  const closeTimeVal = parseTime(todayHours.close);

  let isOpen = false;
  let statusText = "";

  if (currentTimeVal >= openTimeVal && currentTimeVal < closeTimeVal) {
    isOpen = true;
    statusText = `Open now &middot; closes ${formatTime(todayHours.close)}`;
  } else {
    isOpen = false;
    statusText = `Closed now &middot; opens ${formatTime(todayHours.open)}`;
  }

  const updateBadge = (id) => {
    const badge = document.getElementById(id);
    if (!badge) return;
    badge.className = `status-badge ${isOpen ? 'open' : 'closed'}`;
    badge.querySelector('.status-text').innerHTML = statusText;
  };

  updateBadge("hero-status-badge");
  updateBadge("visit-status-badge");

  // Render Timings List
  const timingsList = document.getElementById("timings-list");
  timingsList.innerHTML = "";
  days.forEach(day => {
    const isToday = day === currentDayName;
    const times = CONFIG.hours[day];
    const li = document.createElement("li");
    li.className = `timing-row ${isToday ? 'today' : ''}`;
    li.innerHTML = `<span>${day}</span> <span>${formatTime(times.open)} - ${formatTime(times.close)}</span>`;
    timingsList.appendChild(li);
  });
}

function formatTime(time24) {
  let [h, m] = time24.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${m.toString().padStart(2, '0')} ${ampm}`;
}

// --- 3. Carousel Generation & Scroll Logic ---
function initStonesCarousel() {
  const track = document.getElementById("carousel-track");
  const thumbStrip = document.getElementById("thumbnail-strip");
  
  stones.forEach((stone, index) => {
    // Card
    const card = document.createElement("div");
    card.className = "stone-card";
    card.dataset.index = index;
    card.dataset.color = stone.color;
    
    card.innerHTML = `
      <div class="stone-image-wrap">
        <img src="${stone.image}" alt="${stone.name}" loading="lazy" />
      </div>
      <div class="stone-info">
        <h3 class="stone-title">${stone.name}</h3>
        <p class="stone-desc">${stone.desc}</p>
        <span class="stone-price">Price: Call for rate</span>
      </div>
    `;
    
    card.addEventListener('click', () => openViewer(index));
    track.appendChild(card);
    
    // Thumbnail
    const thumb = document.createElement("img");
    thumb.src = stone.image;
    thumb.alt = `Thumb ${stone.name}`;
    thumb.className = "thumbnail";
    thumb.dataset.index = index;
    if (index === 0) thumb.classList.add("active");
    
    thumb.addEventListener('click', () => {
      scrollToCard(index);
    });
    thumbStrip.appendChild(thumb);
  });

  // Scroll observer to update accent color and active thumbnail
  const container = document.getElementById("carousel-container");
  container.addEventListener("scroll", () => {
    updateCarouselState();
  }, { passive: true });
  
  // Set initial color
  if (stones.length > 0) {
    updateThemeColor(stones[0].color);
  }
}

function scrollToCard(index) {
  const track = document.getElementById("carousel-track");
  const cards = track.children;
  if (cards[index]) {
    cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }
}

function updateCarouselState() {
  const track = document.getElementById("carousel-track");
  const container = document.getElementById("carousel-container");
  const cards = track.children;
  const thumbnails = document.getElementById("thumbnail-strip").children;
  
  let closestIndex = 0;
  let minDistance = Infinity;
  const containerCenter = container.scrollLeft + (container.clientWidth / 2);

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const cardCenter = card.offsetLeft + (card.offsetWidth / 2) - track.offsetLeft;
    const distance = Math.abs(containerCenter - cardCenter);
    
    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = i;
    }
  }

  // Update active thumbnail
  for (let i = 0; i < thumbnails.length; i++) {
    thumbnails[i].classList.toggle("active", i === closestIndex);
  }

  // Update background theme color
  const color = stones[closestIndex].color;
  updateThemeColor(color);
}

function updateThemeColor(hexColor) {
  document.documentElement.style.setProperty('--accent-color', hexColor);
  
  // Convert hex to rgb for blobs
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  document.documentElement.style.setProperty('--blob-color-1', `rgba(${r}, ${g}, ${b}, 0.15)`);
  // create a complementary or slightly offset color for blob 2
  document.documentElement.style.setProperty('--blob-color-2', `rgba(${Math.min(r+40, 255)}, ${Math.max(g-20, 0)}, ${Math.max(b-20, 0)}, 0.2)`);
}

// --- 4. Draggable Carousel Logic (Mouse) ---
function initDraggableCarousel() {
  const slider = document.getElementById("carousel-container");
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.style.scrollSnapType = 'none'; // Disable snap while dragging
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  
  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.style.scrollSnapType = 'x mandatory';
  });
  
  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.style.scrollSnapType = 'x mandatory';
    // Small timeout to allow snap to re-engage
    setTimeout(updateCarouselState, 100);
  });
  
  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast
    slider.scrollLeft = scrollLeft - walk;
  });

  // Keyboard navigation
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      slider.scrollBy({ left: -300, behavior: 'smooth' });
    } else if (e.key === 'ArrowRight') {
      slider.scrollBy({ left: 300, behavior: 'smooth' });
    }
  });
}

// --- 5. Other Stones (Kadappa/Kota) ---
function initOtherStones() {
  const grid = document.getElementById("other-stones-grid");
  
  otherStones.forEach(stone => {
    const card = document.createElement("div");
    card.className = "stone-card";
    
    let imageHTML = '';
    if (stone.image && stone.image.trim() !== "") {
      imageHTML = `<img src="${stone.image}" alt="${stone.name}" loading="lazy" />`;
    } else {
      imageHTML = `
        <div style="width:100%; height:100%; position:absolute; top:0; left:0; 
                    background: linear-gradient(135deg, ${stone.color1}, ${stone.color2});
                    display:flex; align-items:center; justify-content:center;
                    color: rgba(255,255,255,0.7); font-weight: 500; font-size: 1.2rem;">
          Photo coming soon
        </div>
      `;
    }

    card.innerHTML = `
      <div class="stone-image-wrap">
        ${imageHTML}
      </div>
      <div class="stone-info">
        <h3 class="stone-title">${stone.name}</h3>
        <p class="stone-desc">${stone.desc}</p>
        <span class="stone-price">Price: Call for rate</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

// --- 6. Fullscreen Viewer ---
let currentViewerIndex = 0;

function initViewer() {
  const modal = document.getElementById("viewer-modal");
  const closeBtn = document.getElementById("viewer-close");
  const prevBtn = document.getElementById("viewer-prev");
  const nextBtn = document.getElementById("viewer-next");
  
  closeBtn.addEventListener('click', closeViewer);
  prevBtn.addEventListener('click', () => navigateViewer(-1));
  nextBtn.addEventListener('click', () => navigateViewer(1));
  
  // Close on backdrop click
  document.getElementById("viewer-backdrop").addEventListener('click', closeViewer);
  
  // Keyboard nav
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeViewer();
    if (e.key === 'ArrowLeft') navigateViewer(-1);
    if (e.key === 'ArrowRight') navigateViewer(1);
  });

  // Swipe logic for viewer
  let touchstartX = 0;
  let touchendX = 0;
  const imageContainer = document.getElementById("viewer-image-container");
  
  imageContainer.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
  }, {passive: true});

  imageContainer.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    handleViewerSwipe();
  }, {passive: true});

  function handleViewerSwipe() {
    if (touchendX < touchstartX - 50) navigateViewer(1); // Swipe left
    if (touchendX > touchstartX + 50) navigateViewer(-1); // Swipe right
  }
}

function openViewer(index) {
  currentViewerIndex = index;
  renderViewer();
  const modal = document.getElementById("viewer-modal");
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // Prevent background scroll
}

function closeViewer() {
  const modal = document.getElementById("viewer-modal");
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function navigateViewer(dir) {
  currentViewerIndex += dir;
  if (currentViewerIndex < 0) currentViewerIndex = stones.length - 1;
  if (currentViewerIndex >= stones.length) currentViewerIndex = 0;
  renderViewer();
}

function renderViewer() {
  const stone = stones[currentViewerIndex];
  
  const container = document.getElementById("viewer-image-container");
  container.innerHTML = `<img src="${stone.image}" alt="${stone.name}" />`;
  
  document.getElementById("viewer-title").textContent = stone.name;
  
  const actionsContainer = document.getElementById("viewer-actions");
  
  let buttonsHTML = `
    <a href="${CONFIG.phoneLink}" class="btn btn-primary">
      Call to enquire
    </a>
  `;
  
  if (CONFIG.whatsapp && CONFIG.whatsapp.trim() !== "") {
    const message = encodeURIComponent(`Hi, I would like to enquire about ${stone.name}.`);
    buttonsHTML += `
      <a href="https://wa.me/${CONFIG.whatsapp}?text=${message}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
        WhatsApp Enquire
      </a>
    `;
  }
  
  actionsContainer.innerHTML = buttonsHTML;
}

// --- 7. Scroll Reveal Animations ---
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;
    
    reveals.forEach(reveal => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('active');
      }
    });
  };
  
  window.addEventListener('scroll', revealOnScroll, { passive: true });
  revealOnScroll(); // Trigger on load
}
