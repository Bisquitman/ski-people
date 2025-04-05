import Navigo from "navigo";
import { header } from "../components/header";
import { footer } from "../components/Footer";
import { layoutMain } from "../components/LayoutMain";
import { catalog } from "../components/Catalog";
import { goods } from "../components/Goods";
import { breadcrumbs } from "../components/Breadcrumbs";
import { product } from "../components/Product";
import { cart } from "../components/Cart";
import { order } from "../components/Order";
import { notFound } from "../components/NotFound";

const router = new Navigo("/", { linksSelector: 'a[href^="/"]' });

export const initRouter = () => {
  router
    .on("/", () => {
      document.body.append(header(), layoutMain([catalog(), goods()]), footer());
      console.log("HOME");
    })
    .on("/favorite", () => {
      document.body.append(header(), layoutMain([breadcrumbs(), goods("Избранное")]), footer());
      console.log("FAVORITE");
    })
    .on("/product", () => {
      document.body.append(header(), layoutMain([breadcrumbs(), product("Горные лыжи")]), footer());
      console.log("PRODUCT");
    })
    .on("/cart", () => {
      document.body.append(header(), layoutMain([cart()]), footer());
      console.log("CART");
    })
    .on("/order", () => {
      document.body.append(header(), layoutMain([order()]), footer());
      console.log("ORDER");
    })
    .notFound(() => {
      document.body.append(notFound());
      // document.querySelector(".main").innerHTML = `<h1 class="title" style="text-align:center;">ERROR 404</h1>`;
      console.log("ERROR 404");
    });
  router.resolve();
};
