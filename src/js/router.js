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
import { LS_KEY_CART, LS_KEY_FAVORITE, LS_KEY_ORDER } from "./const";
import { search } from "./search";
import { paginationCount } from "./paginationCount";
import { paginationData } from "./paginationData";
import { slider } from "./sliders";
import { addCart } from "./addCart";
import { cartCount } from "./cartCount";

export const router = new Navigo("/", {linksSelector: 'a[href^="/"]'});

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
        paginationHtml("", goods, main(), 0);
        paginationCount(goods);
        footer();
        await addFavorite(goods);
        await addCart(goods);
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
        // console.log(search);
        const goods = await getData(search.params.query);
        header();
        catalog("", goods.flat(Infinity), main());
        productsList("", "", goods.flat(Infinity), main());
        footer();
        await addFavorite(goods);
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
          {text: "Главная", href: "/"},
          {text: "Избранное", href: "/favorite"},
        ]);
        productsList("", "Избранное", localStorageLoad(LS_KEY_FAVORITE), main());
        search();
        paginationHtml("", paginationData(goods, 12), main(), 0);
        paginationCount(localStorageLoad(LS_KEY_FAVORITE));
        footer();
        await addFavorite(goods);
        await addCart(goods);
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
          {text: "Главная", href: "/"},
          {text: obj.collection, href: ""},
          {text: obj.type, href: ""},
          {text: obj.name, href: ""},
        ]);
        await product("", obj, main());
        slider();
        search();
        footer();
        await addFavorite(goods);
        await addCart(goods);
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
    .on(
      "/cart",
      async () => {
        const goods = await localStorageLoad(LS_KEY_CART);
        header();
        cart("Корзина", goods, main());
        footer();
        search();
        cartCount(goods);
        router.updatePageLinks();

        console.log("CART");
      },
      {
        leave(done) {
          cart("remove");
          done();
        },
      },
    )
    .on("/order", async () => {
        const data = await localStorageLoad(LS_KEY_ORDER);
        header();
        order("", data, main());
        footer();
        router.updatePageLinks();

        console.log("ORDER");
      },
      {
        leave(done) {
          order("remove");
          localStorage.removeItem(LS_KEY_ORDER);
          done();
        },
      },
    )
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
