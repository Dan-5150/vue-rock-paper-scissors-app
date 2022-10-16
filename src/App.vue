<script lang="ts" setup>
import { ref } from 'vue'
import { useGameStore } from './stores/game'
import Game from './components/Game.vue'
import BonusGame from './components/BonusGame.vue'
import Result from './components/Result.vue'
import Score from './components/Score.vue'
import { Outcomes } from './enums/outcomes.enum'

const store = useGameStore()

// Show game or results screen
const showGame = ref(true)

/**
 * Increase score of winner
 * @param result Last game result
 */
const calcScore = (result: string) => {
  showGame.value = !showGame.value
  result === Outcomes.player
    ? store.playerScore++
    : result === Outcomes.house
      ? store.houseScore++
      : null
}

// Get current screen status from local storage and display on load
const gameTypeLS: boolean = JSON.parse(localStorage.getItem('bonusGame')!)
const showBonusGameType = ref(gameTypeLS || false)

/**
 * Toggle game type and save to local storage
 */
const toggleBonusGame = () => {
  showBonusGameType.value = !showBonusGameType.value
  localStorage.setItem('bonusGame', JSON.stringify(showBonusGameType.value))
}

// Rules dialog visibility
const openRulesDialog = ref(false)
</script>

<template>
  <main>
    <Score :is-bonus="showBonusGameType" />
    <TransitionGroup name="result" mode="out-in">
      <div v-if="showGame">
        <Transition name="game" mode="out-in">
          <component
            :is="showBonusGameType ? BonusGame : Game"
            @game-over="showGame = !showGame"
          />
        </Transition>
      </div>
      <div v-else>
        <Result @play-again="calcScore" />
      </div>
    </TransitionGroup>
    <footer>
      <base-dialog
        :open="openRulesDialog"
        :is-bonus="showBonusGameType"
        class="rules-btn"
      />
      <base-button
        v-if="showGame"
        class="bonus-btn"
        type="btn-transparent"
        @click="toggleBonusGame"
      >
        {{ showBonusGameType ? "Normal" : "Bonus" }} Game
      </base-button>
    </footer>
  </main>
</template>

<style lang="scss" scoped>
/* Animation between game and result screens */
.result-enter-from {
  @apply opacity-0 -translate-x-10;
}
.result-leave-to {
  @apply opacity-0 translate-x-10;
}
.result-enter-active,
.result-leave-active {
  @apply transition-all duration-300 ease-in-out;
}
.result-enter-to,
.result-leave-from {
  @apply opacity-100 translate-x-0;
}
.result-leave-active {
  @apply absolute w-[93%];
}

/* Animation between normal and bonus games */
.game-enter-from,
.game-leave-to {
  @apply opacity-0;
}
.game-enter-active,
.game-leave-active {
  @apply transition-opacity duration-200 ease-in-out;
}
.game-enter-to,
.game-leave-from {
  @apply opacity-100;
}
.game-leave-active {
  @apply absolute w-[93%];
}

footer {
  @apply flex justify-center gap-2;

  .rules-btn {
    @apply absolute bottom-8 right-8 sm:static;
  }

  .bonus-btn {
    @apply absolute bottom-8 left-8 sm:static;
  }
}
</style>
