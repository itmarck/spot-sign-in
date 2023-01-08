export interface User {
  email: string
  name: string
  avatar: string
}

export type CurrentUser = User | undefined
