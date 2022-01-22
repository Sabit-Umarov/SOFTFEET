<template>
  <button class="ui-button__solid -small" @click="clickBack">Назад</button>
</template>

<script>
export default {
  name: "Backlink",
  data: () => ({}),
  methods: {
    clickBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
  },
};
</script>

<style scoped lang="scss"></style>
