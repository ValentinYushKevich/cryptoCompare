<template>
  <div class="mt-5 mb-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
    <CoinCard v-for="coin of allCurrencies" :key="coin.name" :coin="coin" />
  </div>
</template>

<script>
import CoinCard from "./CoinCard.vue";
export default {
  components: { CoinCard },
  props: {
    allCurrencies: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
