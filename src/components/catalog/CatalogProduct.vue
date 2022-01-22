<template>
  <div
    class="catalog-wrapper__product"
    @click="$emit('handleDetailClick', product.name)"
  >
    <div
      class="catalog-wrapper__product__image"
      :style="{
        'background-image': 'url(' + product.images[0] + ')',
      }"
      alt=""
    ></div>
    <div class="catalog-wrapper__product__text">
      {{ product.name }}
    </div>
    <div class="catalog-wrapper__product__price">{{ product.price }} ₽</div>
  </div>
</template>

<script>
export default {
  name: "CatalogProduct",
  data: () => ({}),
  props: {
    product: Object,
  },
  methods: {},
};
</script>

<style scoped lang="scss"></style>
