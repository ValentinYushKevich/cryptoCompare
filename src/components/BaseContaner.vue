<template>
  <div class="container mx-auto flex flex-col bg-gray-100 p-6 h-screen">
    <TikerComponent />
    <SearchInput />
  </div>
</template>

<script>
import TikerComponent from "./TikerComponent.vue";
import SearchInput from "./SearchInput.vue";
export default { components: { TikerComponent, SearchInput } };
</script>

<style lang="scss" scoped></style>
