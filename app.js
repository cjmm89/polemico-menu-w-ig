(() => {
  const config = window.POLEMICO_CONFIG || {};

  const menuContainer = document.getElementById("menu-container");
  const whatsappContainer = document.getElementById("whatsapp-buttons");
  const instagramBtn = document.getElementById("instagram-btn");

  // =====================================================
  // MENÚ
  // =====================================================

  const images = Array.isArray(config.menuImages)
    ? config.menuImages
    : [];

  images.forEach((src, index) => {
    const img = document.createElement("img");

    img.className = "menu-image";
    img.src = src;
    img.alt = `Menú Polemico ${index + 1}`;
    img.loading = index === 0 ? "eager" : "lazy";

    menuContainer.appendChild(img);
  });

  // =====================================================
  // HORA DE CARACAS
  // =====================================================

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Caracas",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });

  const parts = formatter.formatToParts(new Date());

  const getPart = type =>
    parts.find(part => part.type === type)?.value;

  const weekday = getPart("weekday");
  const hour = Number(getPart("hour"));
  const minute = Number(getPart("minute"));

  const dayMap = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6
  };

  const currentDay = dayMap[weekday];
  const currentMinutes = hour * 60 + minute;

  // =====================================================
  // FUNCIONES DE HORARIO
  // =====================================================

  function timeToMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  function formatTime(time) {
    const [hours, minutes] = time.split(":").map(Number);

    const period = hours >= 12 ? "PM" : "AM";
    const displayHour = hours % 12 || 12;

    return `${displayHour}:${String(minutes).padStart(2, "0")} ${period}`;
  }

  function getNextOpening(location) {
    const days = [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado"
    ];

    const todaySchedule = location.schedule[currentDay];

    // Si todavía abre hoy
    if (todaySchedule) {
      const opening = timeToMinutes(todaySchedule[0]);

      if (currentMinutes < opening) {
        return {
          text: "hoy",
          time: todaySchedule[0]
        };
      }
    }

    // Buscar siguiente día abierto
    for (let offset = 1; offset <= 7; offset++) {
      const nextDay = (currentDay + offset) % 7;
      const schedule = location.schedule[nextDay];

      if (schedule) {
        return {
          text: offset === 1
            ? "mañana"
            : `el ${days[nextDay]}`,
          time: schedule[0]
        };
      }
    }

    return null;
  }

  // =====================================================
  // BOTONES DE WHATSAPP
  // =====================================================

  const locations = Array.isArray(config.whatsappLocations)
    ? config.whatsappLocations
    : [];

  locations.forEach(location => {
    const btn = document.createElement("a");

    const todaySchedule = location.schedule[currentDay];

    let isOpen = false;

    if (todaySchedule) {
      const opening = timeToMinutes(todaySchedule[0]);
      const closing = timeToMinutes(todaySchedule[1]);

      isOpen =
        currentMinutes >= opening &&
        currentMinutes < closing;
    }

    if (isOpen) {
      const number = String(location.number || "")
        .replace(/\D/g, "");

      const message = encodeURIComponent(
        location.message ||
        "Hola Polemico, quiero hacer un pedido."
      );

      btn.className = "btn btn-primary";
      btn.href = `https://wa.me/${number}?text=${message}`;
      btn.target = "_blank";
      btn.rel = "noopener noreferrer";

      btn.textContent = `Pedir ${location.name}`;

    } else {
      const nextOpening = getNextOpening(location);

      btn.className = "btn btn-closed";
      btn.removeAttribute("href");

      if (nextOpening) {
        btn.innerHTML = `
          <span>
            ${location.name} · Cerrado<br>
            <small>
              Nos vemos ${nextOpening.text} a las
              ${formatTime(nextOpening.time)}
            </small>
          </span>
        `;
      } else {
        btn.textContent = `${location.name} · Cerrado`;
      }
    }

    whatsappContainer.appendChild(btn);
  });

  // =====================================================
  // INSTAGRAM
  // =====================================================

  if (instagramBtn) {
    instagramBtn.href = config.instagramUrl || "#";
  }

})();