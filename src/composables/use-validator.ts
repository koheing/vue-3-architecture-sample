import { onUnmounted, reactive, toRefs, watch } from 'vue'

interface Validated {
  valid: boolean
  message: string
}

export type Validator = (text: string) => true | string

export const useValidator = (validators: Validator[], onValid?: (result: Validated) => void) => {
  const state = reactive({
    text: '',
    message: '',
  })

  const validate = (text: string) =>
    validators.map((check) => check(text)).filter((it) => it !== true) as string[]

  const unwatch = watch(
    () => state.text,
    (newer) => {
      const message = validate(newer)[0] ?? ''
      const valid = message === ''
      state.message = valid ? '' : message

      onValid?.({ valid, message })
    }
  )

  const onBlur = () => {
    const message = validate(state.text)[0] ?? ''
    const valid = message === ''
    state.message = message

    onValid?.({ valid, message })
  }

  onUnmounted(() => {
    unwatch()
  })

  return {
    ...toRefs(state),
    onBlur,
  }
}
