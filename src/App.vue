<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>

<style>
@import 'destyle.css';

:root {
  --primary-text-color: black;
  --secondary-text-color: white;
  --accent-text-color: red;
}
</style>
