<script lang="ts" setup>
import { computed } from 'vue'
import { Options } from '../../enums/options.enum'

interface Props {
  option: string;
  won?: boolean;
}

const props = defineProps<Props>()

const emit = defineEmits(['click'])

const optionImage = computed((): string => {
  switch (props.option) {
    case Options.rock:
      return new URL('../../assets/icon-rock.svg', import.meta.url).href
    case Options.paper:
      return new URL('../../assets/icon-paper.svg', import.meta.url).href
    case Options.scissors:
      return new URL('../../assets/icon-scissors.svg', import.meta.url).href
    case Options.lizard:
      return new URL('../../assets/icon-lizard.svg', import.meta.url).href
    case Options.spock:
      return new URL('../../assets/icon-spock.svg', import.meta.url).href
    default:
      return ''
  }
})

const wonClass = computed(() => {
  return props.won ? 'btn-shadow' : ''
})
</script>

<template>
  <div :class="wonClass">
    <button
      type="button"
      :class="`btn-${props.option.toLocaleLowerCase()} ${
        props.won ? 'btn-won' : ''
      }`"
      @click="emit('click')"
    >
      <div class="button__inner">
        <img :src="optionImage" :alt="props.option" />
      </div>
    </button>
  </div>
</template>

<style scoped>
button {
  @apply relative p-6 rounded-full min-w-max transition-all hover:duration-200 hover:scale-105 active:scale-95 focus:outline-none md:p-5 sm:p-4;
}

.btn-shadow {
  @apply rounded-full -z-10;
  box-shadow: 0 0 0 50px hsla(0, 0%, 100%, 0.05),
    0 0 0 100px hsla(0, 0%, 100%, 0.05), 0 0 0 150px hsla(0, 0%, 100%, 0.05);
}

.button__inner {
  @apply p-12 rounded-full md:p-8 sm:p-4;
  background: linear-gradient(
    0deg,
    hsl(0, 0%, 100%) 0%,
    hsl(240, 1%, 86%) 100%
  );
  box-shadow: 0 10px 0 0 hsl(228, 21%, 78%) inset;
}

img {
  @apply w-20 h-20 md:w-16 md:h-16;
}

.btn-rock {
  @apply bg-red-500;
  box-shadow: 0 -10px 0 0 hsl(0, 58%, 43%) inset;
}
.btn-paper {
  @apply bg-blue-500;
  box-shadow: 0 -10px 0 0 hsl(229, 65%, 46%) inset;
}
.btn-scissors {
  @apply bg-yellow-500;
  box-shadow: 0 -10px 0 0 hsl(28, 79%, 44%) inset;
}
.btn-lizard {
  @apply bg-violet-500;
  box-shadow: 0 -10px 0 0 hsl(261, 51%, 44%) inset;
}
.btn-spock {
  @apply bg-cyan-500;
  box-shadow: 0 -10px 0 0 hsl(194, 59%, 43%) inset;
}
</style>
