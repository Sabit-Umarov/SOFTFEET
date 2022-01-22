<template>
  <div class="catalog">
    <div class="header-container -red">
      <div class="header-container__logo">SOFTFEET</div>
      <router-link :to="{ name: 'Profile' }">
        <button class="header-container__profile">
          <img src="../../assets/icons/profile.svg" alt="" />
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped lang="scss"></style>
