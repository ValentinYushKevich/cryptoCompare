<template>
  <div class="container mx-auto flex flex-col bg-gray-100 p-6 h-screen">
    <TikerComponent @addTiker="addTiker" />
    <SearchInput v-model="search" />
    <div class="mt-5 mb-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <CoinCard
        v-for="coin of paginatedCurrencies"
        :key="coin.name"
        :coin="coin"
        :isActive="selectedCurrency === coin.name"
        @select="selectCurrency(coin.name)"
        @remove="deleteTiker(coin.name)"
      />
    </div>
    <GrafComponent />
    <hr class="w-full border-t border-gray-200 mt-4 mb-3" />

    <div class="flex justify-between">
      <p>
        Показано {{ paginatedCurrencies.length }} результатов из
        {{ allCurrencies.length }}
      </p>

      <div v-if="allCurrencies.length > itemsOnPage">
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
import GrafComponent from "@/components/GrafComponent.vue";
import CoinCard from "@/components/CoinCard.vue";
// eslint-disable-next-line prettier/prettier
import { subscribeToCurrency, unsubscribeFromCurrency } from "@/utils/wsConnect";

export default {
  name: "App",
  components: { TikerComponent, SearchInput, GrafComponent, CoinCard },
  data() {
    return {
      allCurrencies: [],
      search: "",
      selectedCurrency: null,
      currentPage: 1,
      itemsOnPage: 6,
    };
  },
  created() {
    const coinsData = localStorage.getItem("coins-list");
    if (coinsData) {
      this.allCurrencies = JSON.parse(coinsData);
      this.allCurrencies.forEach((currency) => {
        subscribeToCurrency(currency.name, (newPrice) => {
          return this.updatePrice(currency.name, newPrice);
        });
      });
    }
  },
  mounted() {},
  watch: {
    search() {
      this.page = 1;
    },
    allCurrencies() {
      localStorage.setItem("coins-list", JSON.stringify(this.allCurrencies));
    },
  },
  computed: {
    startPageIndex() {
      return this.itemsOnPage * (this.currentPage - 1);
    },
    endPageIndex() {
      return this.currentPage * this.itemsOnPage;
    },
    hasNextPage() {
      return this.filteredCurrencies.length > this.endPageIndex;
    },
    coinsPerPage() {
      return this.filteredCurrencies.slice(
        this.startPageIndex,
        this.endPageIndex
      );
    },
    filteredCurrencies() {
      return this.allCurrencies.filter(
        (currency) =>
          currency.name.includes(this.search) && currency.price !== "-"
      );
    },
    paginatedCurrencies() {
      return this.filteredCurrencies.slice(
        this.startPageIndex,
        this.endPageIndex
      );
    },
  },
  methods: {
    updatePrice(name, price) {
      console.log("name, price", name, price);
      this.allCurrencies
        .filter((c) => c.name === name)
        .forEach((c) => {
          c.price = price;
        });
    },
    paginationChange(direction) {
      if (direction === "prev" && this.currentPage > 1) {
        this.currentPage--;
      } else if (this.hasNextPage) {
        this.currentPage++;
      }
    },
    searchCoin(value) {
      console.log(value);
    },
    addTiker(currency) {
      this.allCurrencies = this.allCurrencies.filter((c) => c.price !== "-");

      const newCoin = {
        name: currency,
        price: "-",
      };

      this.allCurrencies.push(newCoin);
      subscribeToCurrency(currency, (newPrice) => {
        return this.updatePrice(currency, newPrice);
      });
    },
    selectCurrency(coin) {
      if (this.selectedCurrency == coin) {
        this.selectedCurrency = null;
        return;
      }

      this.selectedCurrency = coin;
    },
    deleteTiker(currency) {
      this.allCurrencies = this.allCurrencies.filter(
        (c) => c.name !== currency
      );

      if (this.selectedCurrency === currency) this.selectedCurrency = null;

      unsubscribeFromCurrency(currency);
    },
  },
};
</script>
