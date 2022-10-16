<script lang="ts" setup>
import { useGameStore } from '../stores/game'

const store = useGameStore()

const emit = defineEmits(['gameOver'])

/**
 * Get player choice and emit back to parent
 * @param choice Player selected choice
 */
const selectChoice = (choice: string) => {
  store.setPlayerChoice(choice, true)
  emit('gameOver')
}
</script>

<template>
  <section class="game">
    <div
      v-for="(option, index) in store.bonusOptionsOrder"
      :key="option.id"
      :class="`game__option-${index + 1}`"
    >
      <base-circle-button
        :option="option.name"
        @click="selectChoice(option.name)"
      />
    </div>
    <img
      src="../assets/bg-pentagon.svg"
      alt="Pentagon"
      class="game__pentagon-bg"
    />
  </section>
</template>

<style lang="scss" scoped>
.game {
  @apply grid grid-cols-5 grid-rows-3 gap-x-0 gap-y-8 w-3/4 m-auto mb-8 sm:w-full;

  & > div {
    @apply flex justify-center z-10;
  }

  .game__option-1 {
    grid-area: 1 / 3 / 2 / 4;
  }
  .game__option-2 {
    grid-area: 2 / 1 / 3 / 3;
  }
  .game__option-3 {
    grid-area: 2 / 4 / 3 / 6;
  }
  .game__option-4 {
    grid-area: 3 / 2 / 4 / 3;
  }
  .game__option-5 {
    grid-area: 3 / 4 / 4 / 5;
  }

  /* .items {
    @apply flex content-center justify-center flex-wrap rounded-full p-2 h-60 w-48 z-10 flex-[0_0_34%] md:h-48 md:w-40;
  } */
}

.game__pentagon-bg {
  @apply absolute w-[40%] h-[32rem] mt-32 z-0 left-[31%] md:mt-24 md:h-[26rem] sm:h-[24rem] sm:mt-8;
}
</style>
