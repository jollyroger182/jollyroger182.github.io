window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("img").forEach((img) => {
    let caption = img.getAttribute("alt");
    if (
      !img.classList.contains("caption") &&
      !img.parentElement.classList.contains("caption") &&
      (!caption || !caption.toLowerCase().startsWith("caption:"))
    ) {
      return;
    }
    if (caption.toLowerCase().startsWith("caption:")) {
      caption = caption.slice(8).trim();
      img.setAttribute("alt", caption);
    }
    const figure = document.createElement("figure");
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = caption;
    img.insertAdjacentElement("afterend", figure);
    figure.appendChild(img);
    figure.appendChild(figcaption);
  });
});