<template>
  <slot />
  <div class="list" v-if="opened">
    <div class="candidates" v-for="candidate in candidates" :key="candidate">
      <div
        class="candidate"
        :class="{ focus: selectee === candidate }"
        @click="() => onClick(candidate)"
      >
        {{ candidate }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, toRefs, watch } from 'vue'

export type SelectEvent = { selectee: string }

export default defineComponent({
  name: 'AutoComplete',
  emits: ['select'],
  props: {
    candidates: {
      type: Array as PropType<Array<string>>,
      required: true,
    },
  },
  setup(props, context) {
    const state = reactive({
      selectee: '',
      opened: false,
    })

    const candidates = computed(() => props.candidates)

    const index = computed(() => candidates.value.indexOf(state.selectee))

    const cursorUp = () => {
      if (!state.opened) state.opened = true
      if (index.value <= 0) {
        const last = candidates.value.length
        state.selectee = candidates.value[last - 1]
        return
      }

      state.selectee = candidates.value[index.value - 1]
    }

    const cursorDown = () => {
      if (!state.opened) state.opened = true
      if (index.value < 0 || index.value === candidates.value.length - 1) {
        state.selectee = candidates.value[0]
        return
      }

      state.selectee = candidates.value[index.value + 1]
    }

    const select = () => {
      if (state.selectee === '') return
      context.emit('select', { selectee: state.selectee })
      state.selectee = ''
      state.opened = false
    }

    const open = () => {
      if (state.opened) return
      state.opened = true
    }

    const close = () => {
      if (!state.opened) return
      state.opened = false
    }

    const onClick = (selectee: string) => {
      context.emit('select', { selectee })
      state.selectee = ''
      state.opened = false
    }

    return {
      candidates,
      ...toRefs(state),
      cursorUp,
      cursorDown,
      onClick,
      select,
      open,
      close,
    }
  },
})
</script>

<style scoped>
.list {
  position: absolute;
  z-index: 40;
  width: 100%;
  border-radius: 0.75rem;
  box-shadow: 10px 5px 5px rgba(0, 0, 0, 0.2);
  background-color: rgb(250, 250, 250);
}

.candidates {
  display: flex;
  flex-direction: row;
  justify-content: start;
  position: relative;
  width: 100%;
}

.candidate {
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  width: 100%;
}

.focus {
  background-color: rgb(200, 200, 200);
}
</style>
