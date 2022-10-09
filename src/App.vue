<template>
  <div class="container mx-auto flex flex-col bg-gray-100 p-6 h-screen">
    <TikerComponent @addTiker="addTiker" />
    <SearchInput @searchCoin="searchCoin" />
    <CoinsList />
    <GrafComponent />
    <hr class="w-full border-t border-gray-200 mt-4 mb-3" />

    <div class="flex justify-between">
      <p>Показано 2 результатов из 8</p>

      <div>
        <button
          type="button"
          class="px-4 py-2 mr-3 bg-white rounded-md border-2 border-solid"
          @click="paginationChange('prev')"
        >
          Назад
        </button>
        <button
          type="button"
          class="px-4 py-2 bg-white rounded-md border-2 border-solid"
          @click="paginationChange('next')"
        >
          Вперед
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TikerComponent from "@/components/TikerComponent.vue";
import SearchInput from "@/components/SearchInput.vue";
import CoinsList from "@/components/CoinsList.vue";
import GrafComponent from "@/components/GrafComponent.vue";
import { sendOnSocket } from "@/utils/wsConnect";

export default {
  name: "App",
  components: { TikerComponent, SearchInput, CoinsList, GrafComponent },
  mounted() {
    setTimeout(() => {
      sendOnSocket({
        action: "SubAdd",
        subs: [`5~CCCAGG~DOGE~USD`],
      });
    }, 5000);
  },
  methods: {
    paginationChange(value) {
      console.log(value);
    },
    searchCoin(value) {
      console.log(value);
    },
    addTiker() {
      sendOnSocket({
        action: "SubAdd",
        subs: [`5~CCCAGG~DOGE~USD`],
      });
    },
  },
};
</script>
