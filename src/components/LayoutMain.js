export const layoutMain = (children) => {
  const el = document.createElement("main");
  el.classList.add("main");

  if (!children) children = [];

  children.forEach((child) => {
    el.append(child);
  });

  return el;
};
