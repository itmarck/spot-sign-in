import { CurrentUser } from './user'

export interface Settings {
  clientId: string
  onUserChanged(user: CurrentUser): void
}
