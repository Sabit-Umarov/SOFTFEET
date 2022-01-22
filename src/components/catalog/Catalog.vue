<template>
  <div class="wrapper">
    <Header />
    <div class="catalog-wrapper">
      <div class="catalog-wrapper__main-content">
        <v-tabs grow>
          <v-tab v-for="(category, index) in categories" :key="index">{{
            category
          }}</v-tab>
          <v-tab-item v-for="(category, index) in sortedProducts" :key="index">
            <v-container fluid>
              <v-row>
                <v-col
                  v-for="(product, index) in category"
                  :key="index"
                  cols="12"
                  md="3"
                >
                  <CatalogProduct
                    :product="product"
                    @handleDetailClick="handleDetailClick"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
        </v-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { getProducts } from "../../api/index";
import CatalogProduct from "./CatalogProduct";
import Header from "../header/Header";

export default {
  name: "Catalog",
  components: {
    CatalogProduct,
    Header,
  },
  data: () => ({
    products: {},
    categories: ["Женское", "Мужское", "Детское", "В тренде"],
    sortedProducts: {
      woman: [],
      man: [],
      kids: [],
      top: [],
    },
  }),
  created() {
    this.getAllProducts();
  },
  methods: {
    async getAllProducts() {
      try {
        const response = await getProducts();
        if (response?.data?.items) {
          this.products = response.data.items;
          this.sortData();
        }
      } catch {
        alert("Что-то пошло не так");
      }
    },
    handleDetailClick(productName) {
      const items = this.products.filter((el) => el.name === productName);
      setTimeout(() =>
        this.$router.push({
          name: "CatalogDetail",
          params: { items: items },
        })
      );
    },
    sortData() {
      this.products.map((el) => {
        if (el.category === "man") {
          this.sortedProducts.man.push(el.name);
        }
      });
      this.sortedProducts.man = [...new Set(this.sortedProducts.man)];
      this.sortedProducts.man = this.sortedProducts.man.map((name) =>
        this.products.find((item) => item.name === name)
      );

      this.products.map((el) => {
        if (el.category === "woman") {
          this.sortedProducts.woman.push(el.name);
        }
      });
      this.sortedProducts.woman = [...new Set(this.sortedProducts.woman)];
      this.sortedProducts.woman = this.sortedProducts.woman.map((name) =>
        this.products.find((item) => item.name === name)
      );

      this.products.map((el) => {
        if (el.category === "kids") {
          this.sortedProducts.kids.push(el.name);
        }
      });
      this.sortedProducts.kids = [...new Set(this.sortedProducts.kids)];
      this.sortedProducts.kids = this.sortedProducts.kids.map((name) =>
        this.products.find((item) => item.name === name)
      );

      this.products.map((el) => {
        if (el.category === "top") {
          this.sortedProducts.top.push(el.name);
        }
      });
      this.sortedProducts.top = [...new Set(this.sortedProducts.top)];
      this.sortedProducts.top = this.sortedProducts.top.map((name) =>
        this.products.find((item) => item.name === name)
      );
    },
  },
};
</script>

<style scoped lang="scss"></style>
