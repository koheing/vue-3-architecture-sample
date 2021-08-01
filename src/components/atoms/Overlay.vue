<template>
  <div id="overlay" class="overlay" @click="onClick">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export type BackdropClickEvent = { onBackdrop: boolean }

export default defineComponent({
  name: 'Overlay',
  emits: ['backdrop'],
  setup(_, context) {
    const onClick = (e: Event) => {
      const element = e.target as HTMLElement
      const onBackdrop = element?.id === 'overlay' && element?.className === 'overlay'
      context.emit('backdrop', { onBackdrop })
    }
    return {
      onClick,
    }
  },
})
</script>

<style scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0.4;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
