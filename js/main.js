/**
 * main.js
 * Inicialización de la página y control de eventos.
 * No es necesario editar este archivo para personalizar el sitio.
 */

(function () {
  // Comprueba que config y ui estén cargados
  if (!window.BARBER_CONFIG || !window.KB_UI) {
    console.error("Faltan archivos: asegúrate de cargar js/config.js y js/ui.js antes de main.js");
    return;
  }

  // Inicializa UI
  KB_UI.init();

  // Dialogo de plantillas
  const templatesDialog = document.getElementById("templatesDialog");
  const showTemplatesBtn = document.getElementById("showTemplates");
  const closeTemplatesBtn = document.getElementById("closeTemplates");

  function openDialog() {
    templatesDialog.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeDialog() {
    templatesDialog.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (showTemplatesBtn) showTemplatesBtn.addEventListener("click", openDialog);
  if (closeTemplatesBtn) closeTemplatesBtn.addEventListener("click", closeDialog);

  // Cierra dialog cuando haces click fuera del contenido
  templatesDialog.addEventListener("click", (e) => {
    if (e.target === templatesDialog) closeDialog();
  });

  // Tecla ESC cierra dialog
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && templatesDialog.getAttribute("aria-hidden") === "false") {
      closeDialog();
    }
  });

  // Mejora pequeña: si el logo falta, coloca texto (evita roturas)
  const logoImg = document.getElementById("brandLogo");
  logoImg.addEventListener("error", () => {
    const parent = logoImg.parentElement;
    if (parent) {
      parent.removeChild(logoImg);
      const fallback = document.createElement("div");
      fallback.textContent = window.BARBER_CONFIG.businessName || "Barber";
      fallback.style.color = "var(--accent)";
      fallback.style.fontWeight = "700";
      fallback.style.fontSize = "1rem";
      parent.insertBefore(fallback, parent.firstChild);
    }
  });
})();