<template>
  <section
    class="min-w-full border-solid bg-white rounded-lg flex flex-col p-4"
  >
    <div
      class="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 relative"
    >
      <div class="border-2 border-gray-300 rounded-lg px-3 py-2">
        <label for="wallet" class="block text-sm font-medium text-gray-700"
          >Тикер</label
        >
        <div class="mt-1 relative rounded-md">
          <input
            v-model="ticker"
            @keydown.enter="addTiker"
            type="text"
            name="wallet"
            id="wallet"
            class="block w-full pr-10 text-gray-500 focus:outline-none"
            placeholder="Например DOGE"
          />
        </div>
      </div>
    </div>
    <button
      @click="addTiker"
      type="button"
      class="px-6 py-3 rounded-md text-white bg-purple-900 font-medium w-32 mt-3"
    >
      Добавить
    </button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      ticker: "",
    };
  },
  methods: {
    addTiker() {
      this.$emit("addTiker", this.ticker);

      this.ticker = "";
    },
  },
};
</script>

<style lang="scss" scoped></style>
