<template>
  <div
    class="mt-4 mb-2 grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
  >
    <div class="border-2 border-gray-300 rounded-lg px-3 py-2 bg-white">
      <div class="relative rounded-md">
        <input
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          type="text"
          name="wallet"
          id="wallet"
          class="flex w-full pl-10 text-gray-500 focus:outline-none"
          placeholder="Найти тикер"
        />
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="absolute top-0 left-0"
        >
          <path
            d="M17.5 17.5L12.5 12.5M14.1667 8.33333C14.1667 11.555 11.555 14.1667 8.33333 14.1667C5.11167 14.1667 2.5 11.555 2.5 8.33333C2.5 5.11167 5.11167 2.5 8.33333 2.5C11.555 2.5 14.1667 5.11167 14.1667 8.33333Z"
            stroke="#9CA3AF"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchInput",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
