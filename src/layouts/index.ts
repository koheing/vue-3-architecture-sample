/* eslint-disable vue/one-component-per-file */
import Layout from './Layout.vue'
import { useRoute } from 'vue-router'
import { defineAsyncComponent, defineComponent, h } from 'vue'

const createLayout = () =>
  defineComponent({
    name: Layout.name,
    setup(_, context) {
      const { path } = useRoute()
      return () => h(Layout, { path }, context.slots)
    },
  })

const attach = (component: ReturnType<typeof defineComponent>) => {
  return defineComponent({
    name: component.name,
    setup() {
      return () => h(createLayout(), null, () => h(component))
    },
  })
}

export const attatchLayoutTo = (
  suspect: ReturnType<typeof defineComponent> | ReturnType<typeof defineAsyncComponent>
): ReturnType<typeof defineComponent> => {
  if (typeof suspect !== 'function') {
    return attach(suspect)
  }
  const c = defineAsyncComponent(suspect)
  return attach(c)
}
