<template>
  <div class="wrapper">
    <Header />
    <div class="profile-wrapper">
      <div class="profile-wrapper__backlink">
        <Backlink />
      </div>
      <div class="profile-wrapper__info">
        <img
          src="../assets/icons/profile.svg"
          alt=""
          class="profile-wrapper__info__icon"
        />
        <div class="profile-wrapper__info__main-container">
          <span>
            Имя:
            <span class="profile-wrapper__info__main-container__item">{{
              user.name
            }}</span>
          </span>
          <span>
            Фамилия:
            <span class="profile-wrapper__info__main-container__item">{{
              user.lastName
            }}</span> </span
          ><span>
            Телефон:
            <span class="profile-wrapper__info__main-container__item">{{
              user.phone
            }}</span> </span
          ><span>
            Адрес:
            <span class="profile-wrapper__info__main-container__item">{{
              user.address
            }}</span>
          </span>
        </div>
      </div>
      <div class="profile-wrapper__orders -red">
        <div class="profile-wrapper__orders__icon">
          <img src="../assets/icons/orders.svg" alt="" />
        </div>
        <table class="profile-wrapper__orders__list">
          <tr
            class="profile-wrapper__orders__list__item"
            v-for="(order, index) in orders"
            :key="index"
          >
            <th class="profile-wrapper__orders__list__item__name">
              {{ order.name }}
            </th>
            <th class="profile-wrapper__orders__list__item__name">
              Цвет: <span class="-white">{{ order.color }}</span>
            </th>
            <th class="profile-wrapper__orders__list__item__name">
              Размер: <span class="-white">{{ order.size }}</span>
            </th>
            <th class="profile-wrapper__orders__list__item__name">
              Цена: <span class="-white">{{ order.price }} ₽</span>
            </th>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./header/Header";
import Backlink from "./Backlink.vue";
import store from "../store";
import { getUser, getUserOrders, getProducts } from "../api/index";

export default {
  name: "Profile",
  data: () => ({
    user: {},
    orders: [],
  }),
  components: {
    Header,
    Backlink,
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      try {
        const response = await getUser(store.state.userId);
        const ordersResponse = await getUserOrders(store.state.userId);
        const products = await getProducts();
        ordersResponse.data.orders.map((el) => {
          products.data.items.map((e) => {
            if (e.id == el.itemId) {
              this.orders.push(e);
            }
          });
        });
        this.user = response.data.user;
        console.log(this.orders);
      } catch {
        alert("Что-то пошло не так");
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
