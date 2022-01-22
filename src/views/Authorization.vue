<template>
  <div class="auth-container -red">
    <div class="auth-container__title">SOFTFEET</div>
    <div class="auth-container__register">
      <router-link :to="{ name: 'Register' }">
        <button class="ui-button__transparent">Зарегистрироваться</button>
      </router-link>
    </div>
    <div class="auth-container__login">
      <router-link :to="{ name: 'Login' }">
        <button class="ui-button__transparent">Войти</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Authorization",
  data: () => ({}),
};
</script>

<style scoped lang="scss"></style>
