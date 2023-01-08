import { post } from '../shared/http'

export async function requestToken(body: {
  code: string
  clientId: string
  codeVerifier: string
}) {
  const response = await post('/oauth/token', {
    body: {
      code: body.code,
      client_id: body.clientId,
      code_verifier: body.codeVerifier,
    },
  })

  return {
    tokenType: response.token_type,
    accessToken: response.access_token,
  }
}
