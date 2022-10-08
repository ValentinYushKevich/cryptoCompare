<template>
  <div class="container mx-auto flex flex-col bg-gray-100 p-6 h-screen">
    <TikerComponent />
    <SearchInput />
    <CoinsList />
  </div>
</template>

<script>
import TikerComponent from "./TikerComponent.vue";
import SearchInput from "./SearchInput.vue";
import CoinsList from "./CoinsList.vue";
export default { components: { TikerComponent, SearchInput, CoinsList } };
</script>

<style lang="scss" scoped></style>
