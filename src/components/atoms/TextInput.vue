<template>
  <div class="form">
    <input v-model="text" :placeholder="placeholder" @blur="onBlur" />
    <div class="error">{{ message }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRef } from 'vue'
import { useValidator, Validated, Validator } from '../../composables/use-validator'

export default defineComponent({
  name: 'TextInput',
  props: {
    validators: {
      type: Array as PropType<Validator[]>,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Text',
    },
  },
  emits: {
    validate: (payload: Validated) => {
      return typeof payload.valid === 'boolean' && payload.message !== null
    },
  },
  setup(props, context) {
    const { onBlur, text, message } = useValidator(props.validators, (result) =>
      context.emit('validate', result)
    )

    return {
      ...toRef(props, 'placeholder'),
      text,
      message,
      onBlur,
    }
  },
})
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: row;
}

.error {
  color: var(--accent-text-color);
}
</style>
