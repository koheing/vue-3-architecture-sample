<script lang="ts">
import { computed, defineComponent, h } from 'vue'
import { Path } from '../routers'
import DefaultLayoutVue from './default/DefaultLayout.vue'

const changeLayoutBy = (path: Path) => {
  switch (path) {
    case '/':
      return DefaultLayoutVue
    default:
      return DefaultLayoutVue
  }
}

export default defineComponent({
  name: 'Layout',
  props: {
    path: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    const component = computed(() => changeLayoutBy(props.path as Path))
    return () => h(component.value, null, context.slots)
  },
})
</script>
