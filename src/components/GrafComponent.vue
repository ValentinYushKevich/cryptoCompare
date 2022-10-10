<template>
  <section ref="graph" class="relative">
    <div class="flex items-end bg-white h-72 p-5 rounded-lg">
      <div
        v-for="(bar, i) in calculateBarsHeight"
        :key="i"
        :style="{ height: `${bar}%` }"
        class="bg-yellow-300 w-4 md:w-8 mr-0.5"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: "GrafComponent",
  props: {
    graph: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  computed: {
    calculateBarsHeight() {
      const maxPrice = Math.max(...this.graph);
      const minPrice = Math.min(...this.graph);

      if (maxPrice === minPrice) return this.graph.map(() => 50);

      return this.graph.map(
        (price) => 5 + ((price - minPrice) * 95) / (maxPrice - minPrice)
      );
    },
  },
};
</script>
