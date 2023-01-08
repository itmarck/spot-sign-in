import { get, post } from '../shared/http'
import { getToken } from '../shared/storage'

export async function getRecord(name: string) {
  const token = getToken()
  const response = await get(`/api/v1/user/records/${name}`, { token })
  return response && response.value
}

export async function setRecord(name: string, value: object) {
  const token = getToken()
  await post(`/api/v1/user/records/${name}`, {
    token,
    body: { value },
  })
}
