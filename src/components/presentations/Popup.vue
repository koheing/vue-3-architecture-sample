<template>
  <teleport v-if="opened" to="#modal">
    <overlay @backdrop="onClick">
      <slot></slot>
    </overlay>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, toRef } from 'vue'
import Overlay from '../atoms/Overlay.vue'
import { BackdropClickEvent } from '../atoms/Overlay.vue'

export default defineComponent({
  name: 'Popup',
  components: { Overlay },
  props: {
    opened: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String as PropType<'modal' | 'modeless'>,
      validator: (suspect: string) => {
        return suspect === 'modal' || suspect === 'modeless'
      },
      default: 'modal',
    },
  },
  emits: ['close'],
  setup(props, context) {
    const onClick = ({ onBackdrop }: BackdropClickEvent) => {
      if (props.mode === 'modal' || !onBackdrop) return

      context.emit('close')
    }

    return {
      ...toRef(props, 'opened'),
      onClick,
    }
  },
})
</script>
