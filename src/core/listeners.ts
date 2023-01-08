import { User } from './user'

export type UserCallback = (user: User) => void
export type VoidCallback = () => void

export type UserEvent = 'loaded' | 'login' | 'logout'

export interface Listeners {
  loaded: UserCallback[]
  login: VoidCallback[]
  logout: VoidCallback[]
}

const listeners: Listeners = {
  loaded: [],
  login: [],
  logout: [],
}

export function addListener(event: UserEvent, callback: any) {
  listeners[event].push(callback)
}

export function invokeListeners(event: UserEvent, user?: User) {
  switch (event) {
    case 'loaded':
      if (user === undefined) return
      listeners.loaded.forEach((callback) => callback(user))
      break
    default:
      listeners[event].forEach((callback) => callback())
  }
}

export function removeListeners(event: UserEvent) {
  if (!listeners[event]) throw new Error('Event not defined')
  listeners[event] = []
}
