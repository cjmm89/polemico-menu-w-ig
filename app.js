(() => {
  const config = window.POLEMICO_CONFIG || {};
  const container = document.getElementById("menu-container");
  const whatsappBtn = document.getElementById("whatsapp-btn");
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
