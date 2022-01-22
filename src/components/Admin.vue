<template>
  <div class="wrapper">
    <Header />
    <div class="admin-wrapper">
      <div class="admin-wrapper__orders -red">
        <div class="admin-wrapper__orders__icon">
          <img src="../assets/icons/orders.svg" alt="" />
        </div>
        <ul class="admin-wrapper__orders__list">
          <li class="admin-wrapper__orders__list__title">
            <span class="admin-wrapper__orders__list__title__item_1"
              >Наименование товара</span
            >
            <span class="admin-wrapper__orders__list__title__item_2">Цвет</span>
            <span class="admin-wrapper__orders__list__title__item_3"
              >Размер</span
            >
            <span class="admin-wrapper__orders__list__title__item_4">Цена</span>
            <span class="admin-wrapper__orders__list__title__item_5"
              >В наличии</span
            >
            <span class="admin-wrapper__orders__list__title__item_6"
              >В резерве</span
            >
            <span class="admin-wrapper__orders__list__title__item_7"
              >У поставщика</span
            >
            <span class="admin-wrapper__orders__list__title__item_8"
              >Артикул</span
            >
            <span class="admin-wrapper__orders__list__title__item_9"
              >Количество</span
            >
            <span class="admin-wrapper__orders__list__title__item_10"
              >Статус</span
            >
          </li>
          <AdminListItem
            v-for="(product, index) in products"
            :key="index"
            :item="product"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./header/Header";
import AdminListItem from "./AdminListItem";
import { getProducts } from "../api/index";

export default {
  name: "Admin",
  components: {
    Header,
    AdminListItem,
  },
  data: () => ({
    products: [],
  }),
  created() {
    this.getAllProducts();
  },
  methods: {
    async getAllProducts() {
      try {
        const response = await getProducts();
        this.products = response.data.items;
      } catch {
        alert("Что-то пошлоо не так");
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
