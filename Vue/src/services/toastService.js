import { reactive } from 'vue'

const state = reactive({ toasts: [] })
const timers = new Map()
let nextId = 1

const dismiss = (id) => {
  const timer = timers.get(id)

  if (timer) {
    clearTimeout(timer)
    timers.delete(id)
  }

  const index = state.toasts.findIndex((toast) => toast.id === id)

  if (index !== -1) {
    state.toasts.splice(index, 1)
  }
}

const show = (type, message, duration = 4500) => {
  const id = nextId++

  state.toasts.push({ id, type, message })

  const timer = setTimeout(() => dismiss(id), duration)
  timers.set(id, timer)
}

export const toastService = {
  toasts: state.toasts,
  show,
  dismiss,
  success(message) {
    show('success', message)
  },
  error(message) {
    show('error', message)
  },
  info(message) {
    show('info', message)
  },
}
