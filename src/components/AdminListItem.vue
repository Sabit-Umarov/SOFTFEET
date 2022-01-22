<template>
  <li class="admin-wrapper__orders__list__item">
    <span class="admin-wrapper__orders__list__item__name_1">
      {{ item.name }}
    </span>
    <span class="admin-wrapper__orders__list__item__name_2">{{
      item.color
    }}</span>
    <span class="admin-wrapper__orders__list__item__name_3">{{
      item.size
    }}</span>
    <span class="admin-wrapper__orders__list__item__name_4">{{
      item.price
    }}</span>
    <span class="admin-wrapper__orders__list__item__name_5">{{
      item.storeCount
    }}</span>
    <span class="admin-wrapper__orders__list__item__name_6">{{
      item.reserveCount
    }}</span>
    <span class="admin-wrapper__orders__list__item__name_7">{{
      item.providerCount
    }}</span>
    <span class="admin-wrapper__orders__list__item__name_8">{{ item.id }}</span>
    <span class="admin-wrapper__orders__list__item__name_9">
      <v-btn icon @click="count--">
        <v-icon> mdi-minus </v-icon>
      </v-btn>
      {{ count }}
      <v-btn icon @click="count++">
        <v-icon> mdi-plus </v-icon>
      </v-btn>
    </span>
    <span class="admin-wrapper__orders__list__item__name_10">
      <button class="ui-button__transparent -admin-btn" @click="buy">
        Купить
      </button>
    </span>
    <span class="admin-wrapper__orders__list__item__name_11">
      <img src="../assets/icons/close.svg" alt="" />
    </span>
  </li>
</template>

<script>
export default {
  name: "AdminListItem",
  data: () => ({
    count: 1,
  }),
  props: {
    item: Object,
  },
  methods: {
    buy() {
      this.item.storeCount = +this.item.storeCount + +this.count;
      this.item.reserveCount -= +this.count;
    },
  },
};
</script>

<style scoped lang="scss"></style>
