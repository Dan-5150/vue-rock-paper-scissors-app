<script lang="ts" setup>
interface Props {
  type: string;
}

defineProps<Props>()
</script>

<template>
  <button :class="type" type="button">
    <slot />
  </button>
</template>

<style scoped>
button {
  @apply tracking-wide uppercase w-44 font-semibold rounded-lg text-sm px-5 py-2.5 mr-0 mb-2 focus:ring-2 focus:outline-none md:w-40;
}
.btn-primary {
  @apply text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800;
}
.btn-secondary {
  @apply text-gray-900 bg-gray-300 hover:text-red-600 hover:bg-gray-200 focus:ring-gray-300 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800;
}
.btn-transparent {
  @apply text-white bg-transparent border border-white hover:text-red-600 hover:bg-gray-200 focus:ring-gray-300 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800;
}
</style>
