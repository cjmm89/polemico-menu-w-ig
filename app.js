(() => {
  const config = window.POLEMICO_CONFIG || {};
  const container = document.getElementById("menu-container");
  const whatsappContainer = document.getElementById("whatsapp-buttons");

  const locations = Array.isArray(config.whatsappLocations)
    ? config.whatsappLocations
    : [];

  // Hora actual de Caracas
  const caracasNow = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "America/Caracas"
    })
  );

  const currentDay = caracasNow.getDay();
  const currentMinutes =
    caracasNow.getHours() * 60 + caracasNow.getMinutes();

  function timeToMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  function getNextOpening(location) {
    const dayNames = [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado"
    ];

    for (let i = 1; i <= 7; i++) {
      const nextDay = (currentDay + i) % 7;
      const hours = location.schedule[nextDay];

      if (hours) {
        return {
          day: i === 1 ? "mañana" : `el ${dayNames[nextDay]}`,
          time: hours[0]
        };
      }
    }

    return null;
  }

  locations.forEach(location => {
    const btn = document.createElement("a");

    const todaySchedule = location.schedule[currentDay];

    let isOpen = false;

    if (todaySchedule) {
      const openMinutes = timeToMinutes(todaySchedule[0]);
      const closeMinutes = timeToMinutes(todaySchedule[1]);

      isOpen =
        currentMinutes >= openMinutes &&
        currentMinutes < closeMinutes;
    }

    if (isOpen) {
      const number = String(location.number || "").replace(/\D/g, "");

      const message = encodeURIComponent(
        location.message ||
        "Hola Polemico, quiero hacer un pedido."
      );

      btn.className = "btn btn-primary";
      btn.target = "_blank";
      btn.rel = "noopener noreferrer";

      btn.href =
        `https://wa.me/${number}?text=${message}`;

      btn.textContent = `Pedir en ${location.name}`;
    } else {
      btn.className = "btn btn-closed";

      if (todaySchedule) {
        const openingMinutes =
          timeToMinutes(todaySchedule[0]);

        // Todavía no ha abierto hoy
        if (currentMinutes < openingMinutes) {
          btn.textContent =
            `${location.name} · Cerrado · Abrimos hoy a las ${todaySchedule[0]}`;
        } else {
          const next = getNextOpening(location);

          btn.textContent = next
            ? `${location.name} · Cerrado · Abrimos ${next.day} a las ${next.time}`
            : `${location.name} · Cerrado`;
        }
      } else {
        const next = getNextOpening(location);

        btn.textContent = next
          ? `${location.name} · Cerrado · Abrimos ${next.day} a las ${next.time}`
          : `${location.name} · Cerrado`;
      }
    }

    whatsappContainer.appendChild(btn);
  });
  const instagramBtn = document.getElementById("instagram-btn");

  const images = Array.isArray(config.menuImages) ? config.menuImages : [];

  if (images.length === 0) {
    container.innerHTML = '<div class="empty-state">El menú se está actualizando.</div>';
  } else {
    images.forEach((src, index) => {
      const img = document.createElement("img");
      img.className = "menu-image";
      img.src = src;
      img.alt = `Menú Polemico ${index + 1}`;
      img.loading = index === 0 ? "eager" : "lazy";
      container.appendChild(img);
    });
  }

  instagramBtn.href = config.instagramUrl || "#";
})();
