import type { InjectionKey, Ref } from 'vue'

export type DisplayMode = 'form' | 'report'

export const DISPLAY_MODE_KEY: InjectionKey<Ref<DisplayMode>> = Symbol('displayMode')
