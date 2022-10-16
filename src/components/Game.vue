<script lang="ts" setup>
import { useGameStore } from '../stores/game'

const store = useGameStore()

const emit = defineEmits(['gameOver'])

/**
 * Get player choice and emit back to parent
 * @param choice Player selected choice
 */
const selectChoice = (choice: string) => {
  store.setPlayerChoice(choice, false)
  emit('gameOver')
}
</script>

<template>
  <section class="game">
    <div
      v-for="option in store.normalOptionsOrder"
      :key="option.id"
      class="game__option"
    >
      <base-circle-button
        :option="option.name"
        @click="selectChoice(option.name)"
      />
    </div>
    <img
      src="../assets/bg-triangle.svg"
      alt="Triangle"
      class="game__triangle-bg"
    />
  </section>
</template>

<style scoped>
.game {
  @apply flex flex-wrap justify-center gap-8 md:gap-16 sm:gap-12;
}

.game__option {
  @apply flex content-center justify-center flex-wrap rounded-full p-2 h-60 w-48 z-10 flex-[0_0_34%] md:h-56 md:w-40 sm:w-32;
}

.game__triangle-bg {
  @apply absolute w-96 h-96 mt-24 z-0 md:w-80 md:h-80;
}
</style>
