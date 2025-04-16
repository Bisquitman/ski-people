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
import { paginationHtml } from "../components/PaginationHtml";
import { getData } from "./api";
import { addFavorite } from "./addFavorite";
import { localStorageLoad } from "./localStorage";
import { LS_KEY_FAVORITE } from "./const";
import { search } from "./search";
import { paginationCount } from "./paginationCount";
import { paginationData } from "./paginationData";
import { slider } from "./sliders";

export const router = new Navigo("/", { linksSelector: 'a[href^="/"]' });

export const initRouter = () => {
  router
    .on(
      "/",
      async () => {
        const goods = await getData();
        paginationData(goods, 12);
        header();
        catalog("", goods[0], main());
        productsList("", "", goods[0], main());
        search();
        paginationHtml("", goods, main());
        paginationCount(goods);
        footer();
        await addFavorite(goods[0]);
        router.updatePageLinks();

        console.log("HOME");
      },
      {
        leave(done) {
          catalog("remove");
          productsList("remove");
          paginationHtml("remove");
          done();
        },
      },
    )
    .on(
      "/search",
      async (search) => {
        console.log(search);
        const goods = await getData(search.params.query);
        header();
        catalog("", goods, main());
        productsList("", "", goods, main());
        footer();
        await addFavorite(goods[0]);
        router.updatePageLinks();

        console.log("SEARCH");
      },
      {
        leave(done) {
          catalog("remove");
          productsList("remove");
          done();
        },
      },
    )
    .on(
      "/favorite",
      async () => {
        const goods = await getData();
        header();
        breadcrumbs("", main(), [
          { text: "Главная", href: "/" },
          { text: "Избранное", href: "/favorite" },
        ]);
        productsList("", "Избранное", localStorageLoad(LS_KEY_FAVORITE), main());
        search();
        paginationHtml("", paginationData(goods, 12), main());
        paginationCount(localStorageLoad(LS_KEY_FAVORITE));
        footer();
        await addFavorite(goods[0]);
        router.updatePageLinks();

        console.log("FAVORITE");
      },
      {
        leave(done) {
          breadcrumbs("remove");
          productsList("remove");
          paginationHtml("remove");
          done();
        },
      },
    )
    .on(
      `/product`,
      async (id) => {
        const goods = await getData();
        const obj = goods.flat(Infinity).find((item) => item.id === Number(id.params.id));
        // console.log("obj: ", obj);
        header();
        breadcrumbs("", main(), [
          { text: "Главная", href: "/" },
          { text: obj.collection, href: "" },
          { text: obj.type, href: "" },
          { text: obj.name, href: "" },
        ]);
        await product("", obj, main());
        slider();
        search();
        footer();
        await addFavorite(goods[0]);
        router.updatePageLinks();

        console.log("PRODUCT");
      },
      {
        leave(done) {
          breadcrumbs("remove");
          product("remove");
          done();
        },
      },
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
    .notFound(
      () => {
        notFound();
        router.updatePageLinks();

        console.log("ERROR 404");
      },
      {
        leave(done) {
          notFound("remove");
          done();
        },
      },
    );
  router.resolve();
};
