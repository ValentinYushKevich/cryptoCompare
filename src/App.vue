<template>
  <div class="container mx-auto flex flex-col bg-gray-100 p-6 h-screen">
    <TikerComponent @addTiker="addTiker" />
    <SearchInput @searchCoin="searchCoin" />
    <CoinsList :allCurrencies="filteredCurrencies" />
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
import { subscribeToCurrency } from "@/utils/wsConnect";

export default {
  name: "App",
  components: { TikerComponent, SearchInput, CoinsList, GrafComponent },
  data() {
    return {
      allCurrencies: [],
      search: "",
    };
  },
  mounted() {},
  computed: {
    filteredCurrencies() {
      return this.allCurrencies.filter(
        (currency) =>
          currency.name.includes(this.search) && currency.price !== "-"
      );
    },
  },
  methods: {
    updatePrice(name, price) {
      console.log("PRICE", price);
      this.allCurrencies
        .filter((c) => c.name === name)
        .forEach((c) => {
          c.price = price;
        });
    },
    paginationChange(value) {
      console.log(value);
    },
    searchCoin(value) {
      console.log(value);
    },
    addTiker(currency) {
      const newCoin = {
        name: currency,
        price: "-",
      };
      this.allCurrencies.push(newCoin);
      subscribeToCurrency(currency, (newPrice) => {
        return this.updatePrice(currency, newPrice);
      });
    },
  },
};
</script>
