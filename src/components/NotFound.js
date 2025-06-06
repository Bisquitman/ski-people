import { layout } from "./Layout";

let rendered = false;

export const notFound = (action) => {
  document.body.textContent = "";
  if (action === "remove" && document.querySelector(".notfound")) {
    document.querySelector(".notfound").remove();
    rendered = false;
    return;
  }

  if (rendered) return "";

setTimeout(() => {
    const notFoundEl = document.createElement("section");
    notFoundEl.classList.add("notfound");
  
    const child = `
      <h1 class="h1">404</h1>
      <div class="cloak-wrapper">
        <div class="cloak-container">
          <div class="cloak"></div>
        </div>
      </div>
      <div class="info">
        <h2>Страница не найдена</h2>
        <p>Была здесь, но пропала</p>
        <a class="link btn btn_filled" href="/" rel="noreferrer noopener">На главную</a>
      </div>
    `;
    notFoundEl.append(layout(child));
    document.body.append(notFoundEl);
  
    rendered = true;
  
    return notFoundEl;
  
}, 10);};
