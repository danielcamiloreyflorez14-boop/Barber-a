/**
 * ui.js
 * Funciones para renderizar UI dinámicamente usando BARBER_CONFIG.
 * No edites si no sabes lo que haces. Edita config.js para personalizar.
 */

(function (global) {
  if (!global.BARBER_CONFIG) {
    console.error("BARBER_CONFIG no encontrado. Asegúrate de que js/config.js se cargue antes.");
    return;
  }

  /**
   * Escapa texto para insertar en DOM (previene XSS si algún cliente pone HTML).
   */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /**
   * Construye URL de WhatsApp (Click-to-Chat)
   * phone: string sin + (ej: 573208399429)
   * message: texto sin codificar
   */
  function buildWhatsAppUrl(phone, message) {
    const encoded = encodeURIComponent(message || "");
    return `https://wa.me/${phone}?text=${encoded}`;
  }

  /**
   * Renderiza servicios en el grid
   */
  function renderServices(services, containerSelector) {
    const container = document.getElementById(containerSelector);
    if (!container) return;

    container.innerHTML = "";
    services.forEach((s) => {
      const el = document.createElement("div");
      el.className = "service";
      el.setAttribute("role", "listitem");
      el.innerHTML = `<div class="title">${escapeHtml(s.title)}</div>
                      <div class="price">${escapeHtml(s.price || "")}</div>`;
      container.appendChild(el);
    });
  }

  /**
   * Renderiza plantillas de mensajes en dialog
   */
  function renderMessageTemplates(templates, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";

    templates.forEach((t) => {
      const node = document.createElement("div");
      node.className = "template";
      node.style = "display:flex;justify-content:space-between;gap:8px;padding:8px;border-radius:8px;background:rgba(255,255,255,0.02);align-items:center;";
      const txt = document.createElement("div");
      txt.textContent = t;
      txt.style.color = "var(--muted)";
      txt.style.fontSize = "0.95rem";

      const btn = document.createElement("a");
      btn.className = "btn btn-outline";
      btn.textContent = "Usar";
      btn.href = buildWhatsAppUrl(global.BARBER_CONFIG.phoneNumber, t);
      btn.target = "_blank";
      btn.rel = "noopener";

      node.appendChild(txt);
      node.appendChild(btn);
      container.appendChild(node);
    });
  }

  /**
   * Inicializa el DOM con los valores del config
   */
  function initUI() {
    const cfg = global.BARBER_CONFIG;

    // Textos fijos
    document.getElementById("businessName").textContent = cfg.businessName || "";
    document.getElementById("addressText").textContent = cfg.address || "";
    document.getElementById("hoursText").innerHTML = (cfg.hoursText || "").replace(/\n/g, "<br/>");
    document.getElementById("phoneText").textContent = cfg.phoneNumber ? cfg.phoneNumber.replace(/^57/, "0" + cfg.phoneNumber.slice(2)) : "";

    // Links
    const mapsLink = document.getElementById("mapsLink");
    if (mapsLink && cfg.googleMapsUrl) mapsLink.href = cfg.googleMapsUrl;

    const callLink = document.getElementById("callLink");
    if (callLink && cfg.phoneNumber) callLink.href = `tel:+${cfg.phoneNumber}`;

    // WhatsApp CTA buttons
    const waUrl = buildWhatsAppUrl(cfg.phoneNumber, cfg.whatsappDefaultMessage);
    ["cta-whatsapp", "hero-cta", "finalCta", "cta-whatsapp"].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.href = waUrl;
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener");
      }
    });

    // Year
    const y = document.getElementById("year");
    if (y) y.textContent = cfg.year || new Date().getFullYear();

    // Render services and message templates
    renderServices(cfg.services, "servicesGrid");
    renderMessageTemplates(cfg.messagesTemplates, "templatesList");
  }

  // Export small API
  global.KB_UI = {
    init: initUI,
    buildWhatsAppUrl,
    renderServices,
    renderMessageTemplates
  };

})(window);
