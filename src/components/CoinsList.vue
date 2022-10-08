<template>
  <div class="mt-5 mb-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
    <CoinCard />
    <CoinCard />
    <CoinCard />
    <CoinCard />
  </div>
</template>

<script>
import CoinCard from "./CoinCard.vue";
export default { components: { CoinCard } };
</script>

<style lang="scss" scoped></style>
