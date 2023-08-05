<template>
  <div class="main">
    <Sidebar />
    <NuxtPage />
  </div>
</template>
<script>
import Sidebar from "@/components/Sidebar.vue";
export default {
  components: {
    Sidebar,
  },
};
</script>
<style lang="scss">
@import "@/assets/styles/main.scss";

.main {
  display: flex;
}
</style>
