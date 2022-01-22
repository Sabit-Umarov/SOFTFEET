<template>
  <div class="auth-container -red">
    <div class="overlay-header">SOFTFEET</div>
    <div class="inputs-wrapper">
      <v-text-field
        label="Имя"
        height="50"
        :rules="rules.default"
        hide-details="auto"
        v-model="user.name"
      ></v-text-field>
      <v-text-field
        label="Фамилия"
        height="50"
        :rules="rules.default"
        hide-details="auto"
        v-model="user.lastName"
      ></v-text-field>
      <v-text-field
        height="50"
        label="Адрес дома"
        :rules="rules.default"
        hide-details="auto"
        v-model="user.address"
      ></v-text-field>
      <v-text-field
        label="Номер телефона"
        height="50"
        v-mask="'+7###-##-##-###'"
        hide-details="auto"
        v-model="user.phone"
      ></v-text-field>
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
        :rules="rules.default"
        hide-details="auto"
        v-model="user.password"
        type="password"
      ></v-text-field>
      <div class="inputs-wrapper__btn-container">
        <button class="ui-button__solid" @click="clickSendRequest()">
          Зарегистрироваться
        </button>
      </div>
    </div>
    <div class="auth-container__alternative">
      <span class="auth-container__alternative__text"> Уже есть аккаунт? </span>
      <router-link :to="{ name: 'Login' }">
        <button class="ui-button__transparent">Войти</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { signUp } from "../../api/index";

export default {
  name: "Register",
  data: () => ({
    user: {
      email: "",
      password: "",
      name: "",
      lastName: "",
      address: "",
      phone: "",
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
      default: [
        (value) => !!value || "Это поле обязательно для заполнения.",
        (value) => (value && value.length >= 3) || "Минимум 3 символа.",
      ],
    },
  }),
  methods: {
    async clickSendRequest() {
      try {
        if (this.user.email !== "" || this.user.password !== "") {
          await signUp(this.user);
          this.$router.push({ name: "Login" });
        }
      } catch (e) {
        alert("Что-то пошло не так");
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
