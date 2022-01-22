<template>
  <div class="auth-container -red">
    <div class="overlay-header">SOFTFEET</div>
    <div class="inputs-wrapper">
      <v-text-field
        label="Адрес электронной почты"
        height="50"
        :rules="rules.email"
        hide-details="auto"
        v-model="user.email"
      ></v-text-field>
      <v-text-field
        height="50"
        label="Пароль"
        :rules="rules.password"
        hide-details="auto"
        type="password"
        v-model="user.password"
      ></v-text-field>
      <div class="inputs-wrapper__btn-container">
        <button class="ui-button__solid" @click="clickSendRequest()">
          Войти
        </button>
      </div>
    </div>
    <div class="auth-container__alternative">
      <span class="auth-container__alternative__text"> Еще нет аккаунта? </span>
      <router-link :to="{ name: 'Register' }">
        <button class="ui-button__transparent">Зарегистрироваться</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { signIn } from "../../api/index";
import store from "../../store";

export default {
  name: "Login",
  data: () => ({
    rules: {
      password: [
        (value) => !!value || "Это поле обязательно для заполнения.",
        (value) => (value && value.length >= 3) || "Минимум 3 символа.",
      ],
      email: [
        (value) => !!value || "Это поле обязательно для заполнения.",
        (value) => (value && value.length >= 3) || "Минимум 3 символа.",
      ],
    },
    user: {
      email: "",
      password: "",
    },
  }),
  methods: {
    async clickSendRequest() {
      try {
        if (this.user.email !== "" || this.user.password !== "") {
          const token = await signIn(this.user);
          if (token.data?.accessToken) {
            axios.defaults.headers.common.Authorization = `Bearer ${token.data.accessToken}`;
            if (token.data.user.name === "admin") {
              this.$router.push({ name: "Admin" });
            } else {
              this.$router.push({ name: "Catalog" });
            }
            store.commit("updateUserId", token.data.user.id);
          }
        }
      } catch (e) {
        store.commit("updateUserId", null);
        alert("Пароль или адрес не совпадают!");
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
