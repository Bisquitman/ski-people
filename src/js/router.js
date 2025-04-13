import Navigo from "navigo";
import { header } from "../components/header";
import { footer } from "../components/Footer";
import { main } from "../components/Main";
import { catalog } from "../components/Catalog";
import { productsList } from "../components/Goods";
import { breadcrumbs } from "../components/Breadcrumbs";
import { product } from "../components/Product";
import { cart } from "../components/Cart";
import { order } from "../components/Order";
import { notFound } from "../components/NotFound";
import { getData } from "./api";
import { addFavorite } from "./addFavorite";
import { localStorageLoad } from "./localStorage";
import { LS_KEY_FAVORITE } from "./const";
import { search } from "./search";

export const router = new Navigo("/", { linksSelector: 'a[href^="/"]' });

export const initRouter = () => {
  router
    .on("/", async () => {
        const goods = await getData();
        header();
        catalog("", goods, main());
        productsList("", "", goods, main());
        search();
        footer();
        await addFavorite(goods);
        router.updatePageLinks();

        console.log("HOME");
      },
      {
        leave(done) {
          catalog('remove');
          productsList("remove");
          done();
        },
      }
    )
    .on("/search", async (search) => {
        console.log(search);
        const goods = await getData(search.params.query);
        header();
        catalog("", goods, main());
        productsList("", "", goods, main());
        footer();
        await addFavorite(goods);
        router.updatePageLinks();

        console.log("SEARCH");
      },
      {
        leave(done) {
          catalog('remove');
          productsList("remove");
          done();
        },
      }
    )
    .on("/favorite", async () => {
        const goods = await getData();
        header();
        breadcrumbs("", main());
        productsList("", "Избранное", localStorageLoad(LS_KEY_FAVORITE), main());
        search();
        footer();
        await addFavorite(goods);
        router.updatePageLinks();

        console.log("FAVORITE");
      },
      {
        leave(done) {
          breadcrumbs("remove");
          productsList('remove');
          done();
        },
      }
    )
    .on("/product", () => {
        header();
        breadcrumbs("", main());
        // slider();
        product("", "Горные лыжи");
        search();
        footer();
        router.updatePageLinks();

        console.log("PRODUCT");
      },
      {
        leave(done) {
          breadcrumbs('remove');
          product('remove');
          done();
        },
      }
    )
    .on("/cart", () => {
      // document.body.append(header(), main([cart()]), footer());
      router.updatePageLinks();

      console.log("CART");
    })
    .on("/order", () => {
      // document.body.append(header(), main([order()]), footer());
      router.updatePageLinks();

      console.log("ORDER");
    })
    .notFound(() => {
      document.body.append(notFound());
      // document.querySelector(".main").innerHTML = `<h1 class="title" style="text-align:center;">ERROR 404</h1>`;
      router.updatePageLinks();

      console.log("ERROR 404");
    });
  router.resolve();
};
