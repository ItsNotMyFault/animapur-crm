import { reactive } from 'vue'

function getByPath(obj: Record<string, unknown>, path: string): unknown {
  const parts = path.split('.')
  let cur: unknown = obj
  for (const p of parts) {
    if (cur == null || typeof cur !== 'object') return undefined
    cur = (cur as Record<string, unknown>)[p]
  }
  return cur
}

function setByPath(obj: Record<string, unknown>, path: string, value: unknown): void {
  const parts = path.split('.')
  let cur = obj as Record<string, unknown>
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i]!
    if (cur[key] == null || typeof cur[key] !== 'object') {
      cur[key] = {}
    }
    cur = cur[key] as Record<string, unknown>
  }
  cur[parts[parts.length - 1]!] = value
}

export function useFormState(initial: Record<string, unknown> = {}) {
  const state = reactive<Record<string, unknown>>({ ...initial })

  const getValue = (path: string) => getByPath(state, path)
  const setValue = (path: string, value: unknown) => setByPath(state, path, value)

  return { state, getValue, setValue }
}
