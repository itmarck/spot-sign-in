import { User } from '../core/user'
import { get } from '../shared/http'

export async function getAuthenticatedUser({ token }: { token: string }) {
  const response = await get('/api/v1/user', { token })
  return response as User
}
