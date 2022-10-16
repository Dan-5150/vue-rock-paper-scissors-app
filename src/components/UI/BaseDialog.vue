<script lang="ts" setup>
import { computed, ref } from 'vue'
import BaseButton from './BaseButton.vue'

interface Props {
  open: boolean;
  isBonus: boolean;
}

const props = defineProps<Props>()

const openDialog = ref(props.open)

const toggleDialog = () => {
  openDialog.value = !openDialog.value
}

const pickImg = computed(() => {
  if (props.isBonus) {
    return new URL('../../assets/image-rules-bonus.svg', import.meta.url).href
  } else {
    return new URL('../../assets/image-rules.svg', import.meta.url).href
  }
})
</script>

<template>
  <div>
    <base-button type="btn-transparent" @click="toggleDialog">
      Rules
    </base-button>
    <teleport to="body">
      <dialog :open="openDialog">
        <header class="dialog__header">
          <h1 class="dialog__title">Rules</h1>
          <button type="button" @click="toggleDialog">
            <img src="../../assets/icon-close.svg" alt="Close" width="30" />
          </button>
        </header>
        <section>
          <img :src="pickImg" alt="Rules" width="600" />
        </section>
      </dialog>
    </teleport>
  </div>
</template>

<style scoped>
dialog {
  @apply bg-white text-black p-10 rounded-xl top-32 z-10 sm:top-0 sm:h-full;
}

.dialog__header {
  @apply flex justify-between mb-8;
}

.dialog__title {
  @apply text-5xl font-bold uppercase text-[#3c4160];
}
</style>
