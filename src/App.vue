<template>
  <div class="container mx-auto flex flex-col bg-gray-100 p-6">
    <TikerComponent @addTiker="addTiker" />
    <SearchInput v-model="search" />
    <div
      class="mt-5 mb-2 grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
    >
      <CoinCard
        v-for="coin of paginatedCurrencies"
        :key="coin.name"
        :coin="coin"
        :isActive="selectedCoin === coin.name"
        @select="selectCurrency(coin.name)"
        @remove="deleteTiker(coin.name)"
      />
    </div>
    <GrafComponent
      v-if="selectedCoin"
      ref="graphBlock"
      :graph="priceGraph"
      class="mt-4"
    />
    <hr class="w-full border-t border-gray-200 mt-4 mb-3 hidden md:block" />

    <div class="flex justify-between items-center">
      <p class="hidden md:block">
        Показано {{ paginatedCurrencies.length }} результатов из
        {{ allCoins.length }}
      </p>

      <div
        v-if="allCoins.length > itemsOnPage"
        class="fixed bottom-0 left-0 w-full px-4 py-3 flex justify-between bg-white sm:static sm:w-auto sm:p-0 sm:bg-transparent"
      >
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
      allCoins: [],
      search: "",
      selectedCoin: null,
      currentPage: 1,
      itemsOnPage: 6,
      priceGraph: [],
      maxPriceGraphElements: 1,
    };
  },
  created() {
    const coinsData = localStorage.getItem("coins-list");
    if (coinsData) {
      this.allCoins = JSON.parse(coinsData);
      this.allCoins.forEach((coin) => {
        subscribeToCurrency(coin.name, (newPrice) => {
          return this.updatePrice(coin.name, newPrice);
        });
      });
    }
  },
  mounted() {
    window.addEventListener("resize", this.calculateMaxGraphElements);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.calculateMaxGraphElements);
  },
  watch: {
    search() {
      this.page = 1;
    },
    allCoins() {
      localStorage.setItem("coins-list", JSON.stringify(this.allCoins));
    },
    selectedCoin() {
      this.priceGraph = [];
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
      return this.allCoins.filter(
        (coin) => coin.name.includes(this.search) && coin.price !== "-"
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
    calculateMaxGraphElements() {
      if (!this.$refs.graphBlock) return;

      this.maxPriceGraphElements =
        this.$refs.graphBlock.$refs.graph.clientWidth / 34;
    },
    updatePrice(name, price) {
      this.allCoins = this.allCoins.filter((c) => c.price !== "-");
      this.allCoins
        .filter((c) => c.name === name)
        .forEach((c) => {
          if (c.name === this.selectedCoin) {
            this.priceGraph.push(price);

            while (this.priceGraph.length > this.maxPriceGraphElements) {
              this.priceGraph.shift();
            }
          }
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
    addTiker(coin) {
      const newCoin = {
        name: coin,
        price: "-",
      };

      this.allCoins.push(newCoin);
      subscribeToCurrency(coin, (newPrice) => {
        return this.updatePrice(coin, newPrice);
      });
    },
    selectCurrency(coin) {
      if (this.selectedCoin == coin) {
        this.selectedCoin = null;
        return;
      }

      this.selectedCoin = coin;
      this.$nextTick(() => {
        this.calculateMaxGraphElements();
      });
    },
    deleteTiker(coin) {
      this.allCoins = this.allCoins.filter(
        (c) => c.name !== coin || c.price === "-"
      );

      if (this.selectedCoin === coin) this.selectedCoin = null;

      unsubscribeFromCurrency(coin);
    },
  },
};
</script>
