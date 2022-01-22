<template>
  <div class="alert">
    <div class="alert__container">
      <div class="alert__close-btn">
        <v-btn icon color="red" @click="clickUpdateShowError">
          <v-icon large>mdi-close</v-icon>
        </v-btn>
      </div>
      <div class="alert__warning">
        <img src="../../assets/icons/warning.svg" alt="" />
      </div>
      <div class="alert__text">{{ text }}</div>
    </div>
  </div>
</template>

<script>
import store from "../../store";

export default {
  name: "Confirm",
  props: {
    text: String,
  },
  methods: {
    clickUpdateShowError() {
      store.commit("updateShowError", false);
    },
  },
};
</script>

<style scoped lang="scss"></style>
