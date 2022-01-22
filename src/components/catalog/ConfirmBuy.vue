<template>
  <div class="product-confirm wrapper">
    <Header />
    <div class="product-confirm__wrapper">
      <div class="product-confirm__backlink">
        <Backlink />
      </div>
      <div class="product-confirm__content -red">
        <div class="product-confirm__block">
          <div class="product-confirm__block__title">Данные покупателя</div>
          <v-text-field
            label="Email"
            height="50"
            :rules="rules.email"
            hide-details="auto"
            v-model="info.email"
          ></v-text-field>
        </div>
        <div class="product-confirm__block">
          <div class="product-confirm__block__title">Способ получения</div>
          <div class="product-confirm__block__chips">
            <div
              class="chip"
              :class="{ '-active': way === currentWay.obtaining }"
              v-for="(way, index) in ways.obtaining"
              :key="index"
              @click="changeObtaining(way)"
            >
              {{ way }}
            </div>
          </div>
          <v-text-field
            label="Адрес"
            height="50"
            :rules="rules.address"
            hide-details="auto"
            v-model="info.address"
          ></v-text-field>
        </div>
        <div class="product-confirm__block">
          <div class="product-confirm__block__title">Способ оплаты</div>
          <div class="product-confirm__block__chips">
            <div
              class="chip"
              :class="{ '-active': way === currentWay.paying }"
              v-for="(way, index) in ways.paying"
              :key="index"
              @click="changePaying(way)"
            >
              {{ way }}
            </div>
          </div>
          <div class="product-confirm__block__subtitle">
            В магазине можно оплатить наличными, бонусами ProZaPass, картой или
            в кредит
          </div>
        </div>
        <div class="product-confirm__confirm-btn">
          <button
            class="ui-button__transparent -medium"
            @click="clickSendRequest()"
          >
            Подтвердить заказ
          </button>
        </div>
        <div class="product-confirm__subtitle">
          Подтверждая заказ, Вы соглашаетесь с условиями политики
          конфиденциальности и правилами продажи.
        </div>
      </div>
    </div>
    <ErrorAlert
      v-if="isShowError"
      :text="'Необходимо заполнить все необходимые поля!'"
    />
  </div>
</template>

<script>
import Header from "../header/Header";
import Backlink from "../Backlink";
import ErrorAlert from "./ErrorAlert";
import store from "../../store";
import { createOrder } from "../../api/index";

export default {
  name: "Confirm",
  components: {
    Header,
    ErrorAlert,
    Backlink,
  },
  data: () => ({
    info: {
      email: null,
      address: null,
      obtaining: null,
      paying: null,
      itemId: 0,
    },
    currentWay: {
      obtaining: null,
      paying: null,
    },
    ways: {
      obtaining: ["Доставка", "Самовывоз"],
      paying: ["При получении", "Онлайн"],
    },
    rules: {
      email: [
        (value) => !!value || "Это поле обязательно для заполнения.",
        (value) => (value || "").length <= 20 || "Максимально 20 символов.",
        (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Неверный адрес электронной почты.";
        },
      ],
      address: [
        (value) => !!value || "Это поле обязательно для заполнения.",
        (value) => (value && value.length >= 3) || "Минимум 3 символа.",
      ],
    },
  }),
  computed: {
    isShowError: function () {
      return store.state.isShowError;
    },
  },
  methods: {
    changePaying(way) {
      this.currentWay.paying = way;
    },
    changeObtaining(way) {
      this.currentWay.obtaining = way;
    },
    async clickSendRequest() {
      try {
        if (this.info.email && this.info.address) {
          this.info.obtaining = this.currentWay.obtaining;
          this.info.paying = this.currentWay.paying;
          this.info.itemId = this.product[0].id;
          this.info.userId = store.state.userId;
          await createOrder(this.info);
          setTimeout(() =>
            this.$router.push({
              name: "Catalog",
            })
          );
        }
      } catch {
        store.commit("updateShowError", true);
      }
    },
  },
  props: {
    product: {
      default: {},
    },
  },
};
</script>

<style scoped lang="scss"></style>
