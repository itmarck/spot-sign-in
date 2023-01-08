import { tokenKey } from './constants'

export function getToken(): string | undefined {
  return localStorage.getItem(tokenKey) || undefined
}

export function setToken(value: string): void {
  localStorage.setItem(tokenKey, value)
}

export function removeToken(): void {
  localStorage.removeItem(tokenKey)
}
