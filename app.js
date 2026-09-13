(() => {
  const config = window.POLEMICO_CONFIG || {};
  const container = document.getElementById("menu-container");
  const whatsappContainer = document.getElementById("whatsapp-buttons");
  const locations = Array.isArray(config.whatsappLocations)
    ? config.whatsappLocations
    : [];

  locations.forEach(location => {
    const number = String(location.number || "").replace(/\D/g, "");
    const message = encodeURIComponent(
      location.message || "Hola Polemico, quiero hacer un pedido."
    );

    const btn = document.createElement("a");

    btn.className = "btn btn-primary";
    btn.target = "_blank";
    btn.rel = "noopener noreferrer";

    btn.href = `https://wa.me/${number}?text=${message}`;
    btn.textContent = `Pedir ${location.name}`;

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

  const number = String(config.whatsappNumber || "").replace(/\D/g, "");
  const message = encodeURIComponent(config.whatsappMessage || "Hola, quiero hacer un pedido.");
  whatsappBtn.href = `https://wa.me/${number}?text=${message}`;

  instagramBtn.href = config.instagramUrl || "#";
})();
