<template>
  <div class="container mx-auto flex flex-col bg-gray-100 p-6 h-screen">
    <TikerComponent />
    <SearchInput />
    <CoinsList />
    <hr class="w-full border-t border-gray-200 mt-4 mb-3" />

    <div class="flex justify-between">
      <p>Показано 2 результатов из 8</p>

      <div>
        <button
          type="button"
          class="px-4 py-2 mr-3 bg-white rounded-md border-2 border-solid"
          @click="painationChange('prev')"
        >
          Назад
        </button>
        <button
          type="button"
          class="px-4 py-2 bg-white rounded-md border-2 border-solid"
          @click="painationChange('next')"
        >
          Вперед
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TikerComponent from "./TikerComponent.vue";
import SearchInput from "./SearchInput.vue";
import CoinsList from "./CoinsList.vue";
export default {
  components: { TikerComponent, SearchInput, CoinsList },
  methods: {
    painationChange(value) {
      console.log(value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
