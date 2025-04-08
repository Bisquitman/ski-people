import Navigo from "navigo";
import { header } from "../components/header";
import { footer } from "../components/Footer";
import { main } from "../components/Main";
import { catalog } from "../components/Catalog";
import { goods } from "../components/Goods";
import { breadcrumbs } from "../components/Breadcrumbs";
import { product } from "../components/Product";
import { cart } from "../components/Cart";
import { order } from "../components/Order";
import { notFound } from "../components/NotFound";
import { getData } from "./api";

const router = new Navigo("/", { linksSelector: 'a[href^="/"]' });

export const initRouter = () => {
  router
    .on("/", async () => {
      document.body.textContent = "";
      const goodsList = await getData();
      header();
      catalog(goodsList, main());
      goods("", goodsList, main());
      footer();
      console.log("HOME");
    })
    .on("/favorite", async () => {
      // document.body.append(header(), main([breadcrumbs(), goods("Избранное")]), footer());
      const goodsList = await getData();
      header();
      breadcrumbs();
      catalog(goodsList, main());
      goods("Избранное", goodsList, main());
      footer();
      console.log("FAVORITE");
    })
    .on("/product", () => {
      // document.body.append(header(), main([breadcrumbs(), product("Горные лыжи")]), footer());
      console.log("PRODUCT");
    })
    .on("/cart", () => {
      // document.body.append(header(), main([cart()]), footer());
      console.log("CART");
    })
    .on("/order", () => {
      // document.body.append(header(), main([order()]), footer());
      console.log("ORDER");
    })
    .notFound(() => {
      document.body.append(notFound());
      // document.querySelector(".main").innerHTML = `<h1 class="title" style="text-align:center;">ERROR 404</h1>`;
      console.log("ERROR 404");
    });
  router.resolve();
};
