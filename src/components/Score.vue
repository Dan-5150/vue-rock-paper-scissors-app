<script lang="ts" setup>
import { useGameStore } from '../stores/game'

const store = useGameStore()

interface Props {
  isBonus: boolean;
}

defineProps<Props>()
</script>

<template>
  <div class="card">
    <h1 class="card__title">
      Rock<br />
      Paper<br />
      Scissors
      <template v-if="isBonus">
        <br />
        Lizard<br />
        Spock
      </template>
    </h1>
    <div class="card__score">
      <h3 class="score__text">Score</h3>
      <p class="score__number">{{ store.playerScore }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  @apply border-2 border-gray-500 rounded-xl flex justify-between p-4 mb-14 min-w-full;

  .card__title {
    @apply text-3xl uppercase text-left font-bold leading-6 self-center;
  }
  .card__score {
    @apply bg-white text-black p-4 w-36 rounded-lg self-center;

    .score__text {
      @apply uppercase font-bold text-blue-800;
    }
    .score__number {
      @apply font-extrabold text-6xl tracking-tighter text-[#56546a];
    }
  }
}
</style>
