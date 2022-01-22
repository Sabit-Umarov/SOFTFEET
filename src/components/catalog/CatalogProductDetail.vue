<template>
  <div class="product-detail wrapper">
    <Header />
    <div class="product-detail__wrapper">
      <div class="product-detail__backlink">
        <Backlink />
      </div>
      <div class="product-detail__content -red">
        <div class="product-detail__container">
          <div class="product-detail__container__carousel">
            <v-carousel hide-delimiters>
              <v-carousel-item v-for="(item, i) in products[0].images" :key="i">
                <div
                  class="product-detail__container__carousel__image"
                  :style="{
                    'background-image': 'url(' + item + ')',
                  }"
                ></div>
              </v-carousel-item>
            </v-carousel>
            <span class="product-detail__container__carousel__price"
              >{{ products[0].price }} ₽</span
            >
          </div>
          <div class="product-detail__container__description">
            <div class="product-detail__container__description__title">
              {{ products[0].name }}
            </div>
            <div class="product-detail__container__description__chips">
              <span class="product-detail__container__description__item"
                >Цвет:
              </span>
              <div
                class="chip"
                :class="{ '-active': color === currentColor }"
                v-for="(color, index) in colors"
                :key="index"
                @click="changeColor(color)"
              >
                {{ color }}
              </div>
            </div>
            <div class="product-detail__container__description__chips">
              <span class="product-detail__container__description__item"
                >Размер:
              </span>
              <div
                class="chip"
                :class="{ '-active': size === currentSize }"
                v-for="(size, index) in sizes"
                :key="index"
                @click="changeSize(size)"
              >
                {{ size }}
              </div>
            </div>
            <span class="product-detail__container__description__item"
              >Длина: {{ products[0].length }} см
            </span>
            <span class="product-detail__container__description__item"
              >Длина рукава: {{ products[0].sleeve }} см
            </span>
            <span class="product-detail__container__description__item"
              >Страна производства: {{ products[0].country }}
            </span>
            <span
              class="product-detail__container__description__item"
              v-if="products[0].composition.type"
              >Состав:
              <span
                class="product-detail__container__description__item"
                v-for="(item, index) in products[0].composition"
                :key="index"
                >{{ item.type }} - {{ item.precentage }}%
              </span>
            </span>
          </div>
        </div>
        <div class="product-detail__buy-btn">
          <button
            class="ui-button__transparent -small"
            @click="clickSaveTheProduct()"
          >
            Купить
          </button>
        </div>
      </div>
    </div>
    <ErrorAlert v-if="isShowError" :text="'Необходимо выбрать размер!'" />
  </div>
</template>

<script>
import Header from "../header/Header";
import Backlink from "../Backlink";
import ErrorAlert from "./ErrorAlert";
import store from "../../store";

export default {
  name: "CatalogProductDetail",
  components: {
    Header,
    Backlink,
    ErrorAlert,
  },
  data: () => ({
    products: {},
    currentColor: null,
    currentSize: null,
    sizes: [],
    colors: [],
  }),
  created() {
    this.sortData();
    console.log(this.items);
  },
  computed: {
    isShowError: function () {
      return store.state.isShowError;
    },
  },
  methods: {
    sortData() {
      this.products = this.items;
      this.currentColor = this.products[0].color;
      this.products.map((el) => {
        this.colors.push(el.color);
      });
      this.colors = [...new Set(this.colors)];
      this.rerenderSizes();
    },
    changeColor(color) {
      this.currentColor = color;
      this.rerenderSizes();
    },
    rerenderSizes() {
      this.sizes = [];
      this.products
        .filter((el) => {
          return el.color == this.currentColor;
        })
        .map((el) => this.sizes.push(el.size));
    },
    changeSize(size) {
      this.currentSize = size;
    },
    clickSaveTheProduct() {
      if (this.currentSize && this.currentColor) {
        const product = this.products.filter((el) => {
          return el.size === this.currentSize && el.color === this.currentColor;
        });
        setTimeout(() =>
          this.$router.push({
            name: "ConfirmBuy",
            params: { product: product },
          })
        );
      } else {
        store.commit("updateShowError", true);
      }
    },
  },
  props: {
    items: {
      default: 0,
    },
  },
};
</script>

<style scoped lang="scss"></style>
