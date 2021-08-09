<template>
  <auto-complete ref="autoComplete" :candidates="suggestions" @select="onSelect">
    <input v-model="text" :placeholder="placeholder" @keydown="onKeydown" @keypress="onKeypress" />
  </auto-complete>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onUnmounted,
  PropType,
  reactive,
  ref,
  toRef,
  toRefs,
  watch,
} from 'vue'
import AutoComplete, { SelectEvent } from '../atoms/AutoComplete.vue'

export default defineComponent({
  name: 'AutoCompleteInput',
  components: {
    AutoComplete,
  },
  props: {
    candidates: {
      type: Array as PropType<Array<string>>,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  emits: {
    select: (payload: SelectEvent) => {
      return payload.selectee !== null
    },
  },
  setup(props, context) {
    const autoComplete = ref<InstanceType<typeof AutoComplete>>()

    const state = reactive({
      text: '',
    })

    const candidates = computed(() => props.candidates.filter((it) => it.includes(state.text)))

    const onSelect = (event: SelectEvent) => {
      context.emit('select', event)
      state.text = event.selectee
    }

    const onKeydown = (event: KeyboardEvent) => {
      if (!autoComplete.value || ['ArrowDown', 'ArrowUp'].every((it) => it !== event.key)) return
      if (event.key === 'ArrowDown') autoComplete.value.cursorDown()
      else autoComplete.value.cursorUp()
    }

    const onKeypress = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' || !autoComplete.value) return

      autoComplete.value.select()
      autoComplete.value.close()
    }

    const unwatch = watch(
      () => state.text,
      (newer) => {
        if (newer.length > 0) autoComplete.value?.open()
      }
    )

    onUnmounted(unwatch)

    return {
      ...toRefs(state),
      suggestions: candidates,
      ...toRef(props, 'placeholder'),
      onSelect,
      onKeydown,
      onKeypress,
      autoComplete,
    }
  },
})
</script>
