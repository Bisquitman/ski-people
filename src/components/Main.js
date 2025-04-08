let rendered = false;

export const main = () => {
  if (rendered) return document.querySelector("main");

  const el = document.createElement("main");
  el.classList.add("main");

  document.body.append(el);

  rendered = true;

  return el;
};
