import { requestToken } from './api/oauth'
import { getRecord, setRecord } from './api/record'
import { getAuthenticatedUser } from './api/user'
import {
  addListener,
  invokeListeners,
  removeListeners,
  UserCallback,
  VoidCallback,
} from './core/listeners'
import { Settings } from './core/settings'
import { CurrentUser } from './core/user'
import { authorizeUrl } from './shared/constants'
import { getToken, removeToken, setToken } from './shared/storage'

let currentUser: CurrentUser
let isLoggedIn: boolean
let settings: Settings
let initialized = false

function onUserLoaded(callback: UserCallback) {
  addListener('loaded', callback)
}

function onUserLoggedIn(callback: VoidCallback) {
  addListener('login', callback)
}

function onUserSignedOut(callback: VoidCallback) {
  addListener('logout', callback)
}

function setUser(user: CurrentUser): void {
  currentUser = user
  isLoggedIn = user !== undefined
}

async function sendTokenRequest(code: string) {
  const { accessToken } = await requestToken({
    code: code,
    clientId: settings.clientId,
    codeVerifier: 'test',
  })

  setToken(accessToken)
  invokeListeners('login')

  const url = new URL(location.href)
  url.searchParams.delete('code')
  window.history.replaceState(null, '', url.href)

  fetchUser()
}

async function fetchUser() {
  const token = getToken()

  if (!token) return

  const user = await getAuthenticatedUser({ token })
  setUser(user)

  invokeListeners('loaded')
}

function initialize(options: Settings) {
  settings = options
  initialized = true

  window.addEventListener('load', function () {
    const url = new URL(window.location.href)
    const code = url.searchParams.get('code')

    if (code) {
      sendTokenRequest(code)
    } else {
      fetchUser()
    }
  })
}

function signInWithRedirect() {
  if (!initialized) throw new Error('Not initialized')
  const url = new URL(authorizeUrl)

  url.searchParams.set('client_id', settings.clientId)
  url.searchParams.set('redirect_uri', window.location.href)
  url.searchParams.set('code_challenge', 'test')

  window.location.href = url.href
}

function signInWithPopup() {
  // TODO: Implement popup flow
}

function signOut() {
  removeToken()
  setUser(undefined)

  invokeListeners('logout')
}

export {
  initialize,
  currentUser,
  isLoggedIn,
  signInWithRedirect,
  signInWithPopup,
  signOut,
  getRecord,
  setRecord,
  onUserLoaded,
  onUserLoggedIn,
  onUserSignedOut,
  removeListeners,
}
