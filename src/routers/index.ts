import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { attatchLayoutTo } from '../layouts'
import Home from './Home.vue'

const pathes = {
  HOME: '/',
} as const

export type Path = typeof pathes[keyof typeof pathes]

const routes: RouteRecordRaw[] = [{ path: pathes.HOME, component: attatchLayoutTo(Home) }]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
