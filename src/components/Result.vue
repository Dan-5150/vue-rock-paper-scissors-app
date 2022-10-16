<script lang="ts" setup>
import { computed, onBeforeMount, ref } from 'vue'
import { useGameStore } from '../stores/game'
import { Outcomes } from '../enums/outcomes.enum'

const store = useGameStore()
const emit = defineEmits(['playAgain'])

// Get last winner from last game result
const lastWinner = store.gameResults[store.gameResults.length - 1]

/**
 * Display correct outcome from game result
 */
const gameResult = computed(() => {
  console.log(lastWinner)
  return lastWinner === Outcomes.player
    ? 'You Win'
    : lastWinner === Outcomes.house
      ? 'You Lose'
      : 'Draw'
})

const showResult = ref(false)

/**
 * Show a delay before showing results on screen
 */
onBeforeMount(() => {
  setTimeout(() => {
    showResult.value = true
  }, 2000)
})
</script>

<template>
  <div class="result">
    <div class="result__player">
      <h2>You picked</h2>
      <base-circle-button
        :option="store.playerChoice"
        :won="showResult && gameResult === 'You Win'"
      />
    </div>
    <div v-if="showResult" class="result__game">
      <h1 class="result__text">{{ gameResult }}</h1>
      <base-button
        type="btn-secondary"
        class="btn"
        @click="emit('playAgain', lastWinner)"
      >
        Play Again
      </base-button>
    </div>
    <div class="result__house">
      <h2>The house picked</h2>
      <base-circle-button
        v-if="showResult"
        class="btn-house"
        :option="store.houseChoice"
        :won="showResult && gameResult === 'You Lose'"
      />
      <div v-else class="empty-result" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.result {
  @apply flex flex-wrap justify-evenly md:justify-around;

  .result__player {
    @apply order-1;
  }

  .result__game {
    @apply self-center order-2 md:order-3 md:w-full md:mt-12;

    .result__text {
      @apply text-5xl uppercase font-bold mb-4;
    }
  }

  .result__house {
    @apply order-3 md:order-2;

    .btn-house {
      @apply w-fit m-auto;
    }

    .empty-result {
      @apply bg-black opacity-20 rounded-full p-5 w-52 h-52 m-auto animate-pulse md:w-32 md:h-32;
    }
  }
}

h2 {
  @apply text-xl uppercase font-bold tracking-wider mb-5;
}
</style>
