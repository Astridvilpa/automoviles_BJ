/* =========================
   script.js
   - Cards dinámicas
   - Varias fotos por coche
   - Miniaturas
   - WhatsApp
   - Búsqueda
   - Contador solo de disponibles
   - Correo
   - Botón subir arriba
========================= */

/* CONFIGURACIÓN DEL NEGOCIO */
const BUSINESS = {
  whatsappNumber: "34645723857", 
  businessName: "Automóviles B.J.",
  defaultWhatsappMessage:
    "Hola, vengo desde tu web. ¿Podrías darme más información?",
  email: "davidbejarbravo31@ejemplo.com", 
};

/* COCHES */
const CARS = [
  {
    id: "clio",
    title: "Renault Clio RT 1.4 80 cv",
    brand: "Renault",
    year: 1994,
    km: 86000,
    price: 2500,
    fuel: "Gasolina",
    transmission: "Automático",
    location: "Mora (Toledo)",
    sold: false,
    description:
      "Vehículo en muy buen estado, con mantenimiento al día: cambio de bujías, aceite y filtro. Consumo bajo, ideal para ciudad y carretera.",
    photos: [
      "img/clio.jpeg",
      "img/clio2.jpeg",
      "img/clio3.jpeg",
      "img/clio4.jpeg",
      "img/clio5.jpeg",
      "img/clio6.jpeg",
    ],
  },
  {
    id: "Volkswagen",
    title: "Volkswagen Golf GTI DSG performance 2.0 230cv",
    brand: "Volkswagen",
    year: 2013,
    km: 163000,
    price: 18000,
    fuel: "Gasolina",
    transmission: "Manual",
    location: "Mora (Toledo)",
    sold: false,
    description: `Vehículo deportivo, potente y muy bien equipado, en excelente estado y con una conducción espectacular.

Incluye 1 año de garantía.
Distribución recién cambiada.
Aceite y filtros recién hechos.

Extras destacados:
- Techo solar
- Volante multifunción con levas
- Volante calefactable
- Asientos calefactables
- Control de crucero
- Apple CarPlay
- GPS 3D
- Cámara delantera y trasera
- Sensores de aparcamiento
- Conexión a internet
- Y muchos extras más.`,
    photos: [
      "img/her.jpeg",
      "img/her(1).jpeg",
      "img/her(3).jpeg",
      "img/her(4).jpeg",
      "img/her(7).jpeg",
      "img/herm8.jpeg",
      "img/her9.jpeg",

    ],
  },
  {
    id: "peugeot208",
    title: "Peugeot 208 1.2 110 cv",
    brand: "Peugeot",
    year: 2016,
    km: 103000,
    price: 7500,
    fuel: "Gasolina",
    transmission: "Manual",
    location: "Mora (Toledo)",
    sold: true,
    description:
      "Coche perfecto para circular tanto en ciudad como en carretera. Vehículo muy económico y de bajo consumo, con distribución, aceite y filtros recién hechos. ITV en vigor hasta 2027.",
    photos: [
      "img/peugeot1.jpeg",
      "img/peu2.jpeg",
      "img/peu3.jpeg",
      "img/peu4.jpeg",
      "img/peu5.jpeg",
      "img/peu6.jpeg",
      "img/peu7.jpeg",
      "img/peu8.jpeg",
      "img/peu9.jpeg",
      "img/peu10.jpeg",
    ],
  },
  {
    id: "c4cactus",
    title: "Citroën C4 Cactus 1.6 92 cv",
    brand: "Citroën",
    year: 2014,
    km: 133000,
    price: 8000,
    fuel: "Diésel",
    transmission: "Automático",
    location: "Mora (Toledo)",
    sold: true,
    description:
      "Automático, cómodo y económico. Interior limpio, sin golpes, excelente conducción.",
    photos: [
      "img/c41.jpeg",
      "img/c42.jpeg",
      "img/c43.jpeg",
      "img/c44.jpeg",
      "img/c45.jpeg",
      "img/c46.jpeg",
      "img/c47.jpeg",
    ],
  },
  {
    id: "bmw1",
    title: "BMW Serie 1 2.0 143 cv",
    brand: "BMW",
    year: 2008,
    km: 364000,
    price: 2500,
    fuel: "Diésel",
    transmission: "Manual",
    location: "Mora (Toledo)",
    sold: true,
    description:
      "Vehículo utilitario ideal para el día a día, con motor en perfecto estado y revisiones al día. Vehículo nacional, de único propietario y con un consumo muy económico.",
    photos: ["img/bmw.jpeg"],
  },
];

/* UTILIDADES */
const qs = (s, el = document) => el.querySelector(s);

function formatEuro(n) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatKm(n) {
  return new Intl.NumberFormat("es-ES").format(n) + " km";
}

function whatsappLink(message) {
  const base = `https://wa.me/${BUSINESS.whatsappNumber}`;
  const text = encodeURIComponent(message || BUSINESS.defaultWhatsappMessage);
  return `${base}?text=${text}`;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildMailto(to, subject, body) {
  const s = encodeURIComponent(subject || "");
  const b = encodeURIComponent(body || "");
  return `mailto:${to}?subject=${s}&body=${b}`;
}

/* TEMPLATE DE CARD */
function carTemplate(car) {
  const firstPhoto = car.photos && car.photos.length ? car.photos[0] : "";
  const badge = car.sold
    ? `<div class="vcard__badge">VENDIDO</div>`
    : "";

  const msg = `Hola, me interesa este coche: ${car.title} (${car.year}) - ${formatEuro(car.price)}. ¿Sigue disponible?`;

  return `
    <article class="vcard"
      data-car-id="${escapeHtml(car.id)}"
      data-brand="${escapeHtml(car.brand)}"
      data-fuel="${escapeHtml(car.fuel)}"
      data-price="${car.price}"
    >
      <div class="vcard__media">
        <div class="vcard__img" data-role="img" style="background-image:url('${firstPhoto}')"></div>
        ${badge}

        <div class="vcard__nav">
          <button type="button" data-action="prev" aria-label="Foto anterior">‹</button>
          <button type="button" data-action="next" aria-label="Foto siguiente">›</button>
        </div>
      </div>

      <div class="vcard__body">
        <div class="vcard__title">${escapeHtml(car.title)}</div>

        <div class="vcard__meta">
          <span>${car.year}</span>
          <span>${formatKm(car.km)}</span>
        </div>

        <div class="vcard__price">${formatEuro(car.price)}</div>

        <div class="vcard__chips">
          <span class="chip">${escapeHtml(car.fuel)}</span>
          <span class="chip">${escapeHtml(car.transmission)}</span>
          <span class="chip">${escapeHtml(car.location)}</span>
          <span class="chip">${escapeHtml(car.brand)}</span>
        </div>

        <div class="vcard__desc">${escapeHtml(car.description)}</div>

        <div class="vcard__actions">
          <a class="btn btn--primary" href="${whatsappLink(msg)}" target="_blank" rel="noopener">WhatsApp</a>
          <button class="btn btn--ghost" type="button" data-action="copy">Copiar info</button>
        </div>
      </div>

      <div class="vcard__thumbs" data-role="thumbs"></div>
    </article>
  `;
}

/* INTERACCIONES DE CADA CARD */
function mountCardInteractions(articleEl, car) {
  const imgEl = articleEl.querySelector('[data-role="img"]');
  const thumbsEl = articleEl.querySelector('[data-role="thumbs"]');
  const photos = car.photos && car.photos.length ? car.photos : [];
  let idx = 0;

  function setPhoto(i) {
    if (!photos.length) return;
    idx = (i + photos.length) % photos.length;
    imgEl.style.backgroundImage = `url("${photos[idx]}")`;

    [...thumbsEl.querySelectorAll(".vthumb")].forEach((thumb, j) => {
      thumb.classList.toggle("active", j === idx);
    });
  }

  thumbsEl.innerHTML = "";
  photos.forEach((src, i) => {
    const t = document.createElement("button");
    t.type = "button";
    t.className = "vthumb" + (i === 0 ? " active" : "");
    t.style.backgroundImage = `url("${src}")`;
    t.setAttribute("aria-label", `Ver foto ${i + 1}`);
    t.addEventListener("click", () => setPhoto(i));
    thumbsEl.appendChild(t);
  });

  articleEl.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;

    const action = btn.getAttribute("data-action");

    if (action === "prev") setPhoto(idx - 1);
    if (action === "next") setPhoto(idx + 1);

    if (action === "copy") {
      const text = `${car.title}
Precio: ${formatEuro(car.price)}
Año: ${car.year}
Km: ${formatKm(car.km)}
Combustible: ${car.fuel}
Cambio: ${car.transmission}
Ubicación: ${car.location}
Marca: ${car.brand}
${car.sold ? "Estado: VENDIDO" : "Estado: Disponible"}
Descripción: ${car.description}`;

      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = "¡Copiado!";
        setTimeout(() => {
          btn.textContent = "Copiar info";
        }, 1200);
      } catch {
        alert("No pude copiar. Hazlo manualmente.");
      }
    }
  });

  setPhoto(0);
}

/* RENDER DE COCHES */
function renderCars(filteredCars = CARS) {
  const grid = qs("#carsGrid");
  if (!grid) return;

  grid.innerHTML = filteredCars.map(carTemplate).join("");

  filteredCars.forEach((car) => {
    const el = qs(`[data-car-id="${CSS.escape(car.id)}"]`);
    if (el) mountCardInteractions(el, car);
  });

  const statCars = qs("#statCars");
  if (statCars) {
    const availableCars = filteredCars.filter((car) => !car.sold);
    statCars.textContent = String(availableCars.length);
  }
}

/* FILTROS Y BÚSQUEDA */
function applyFilters() {
  const brand = qs("#brandSelect")?.value.toLowerCase() || "";
  const fuel = qs("#fuelSelect")?.value.toLowerCase() || "";
  const price = qs("#priceSelect")?.value ? Number(qs("#priceSelect").value) : null;
  const query = qs("#q")?.value.toLowerCase().trim() || "";

  const filtered = CARS.filter((car) => {
    const matchesBrand = !brand || car.brand.toLowerCase() === brand;
    const matchesFuel = !fuel || car.fuel.toLowerCase() === fuel;
    const matchesPrice = !price || car.price <= price;

    const text = `${car.title} ${car.brand} ${car.year} ${car.fuel}`.toLowerCase();
    const matchesQuery = !query || text.includes(query);

    return matchesBrand && matchesFuel && matchesPrice && matchesQuery;
  });

  renderCars(filtered);
}

/* INIT */
function init() {
  const yearNow = qs("#yearNow");
  if (yearNow) yearNow.textContent = String(new Date().getFullYear());

  const whatsGeneral = qs("#whatsGeneral");
  if (whatsGeneral) whatsGeneral.setAttribute("href", whatsappLink());

  const emailForm = qs("#contactForm");
  if (emailForm) {
    emailForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = qs("#name")?.value.trim() || "";
      const msg = qs("#msg")?.value.trim() || "";

      if (!name || !msg) {
        alert("Por favor, completa todos los campos.");
        return;
      }

      const subject = "Consulta desde Automóviles B.J.";
      const body = `Hola, mi nombre es ${name}.\n\nMensaje:\n${msg}`;

      window.location.href = buildMailto(BUSINESS.email, subject, body);
    });
  }

  const filtersForm = qs("#filtersForm");
  if (filtersForm) {
    filtersForm.addEventListener("submit", (e) => {
      e.preventDefault();
      applyFilters();
    });
  }

  const searchInput = qs("#q");
  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }

  const themeBtn = qs("#themeBtn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("light");
    });
  }

  const backToTop = qs("#backToTop");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  renderCars();
}

init();