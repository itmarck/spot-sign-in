const baseUrl = 'https://spot.itmarck.com'

interface HttpSettings {
  token?: string
  body?: object
}

interface HttpOptions {
  method: string
  headers: Record<string, string>
  body?: string
}

function parseOptions(method: string, options: HttpSettings): HttpOptions {
  const parsedOptions: HttpOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if (options.token) {
    parsedOptions.headers.Authorization = `Bearer ${options.token}`
  }

  if (options.body) {
    parsedOptions.body = JSON.stringify(options.body)
  }

  return parsedOptions
}

function caller(method: string) {
  return async function (path: string, options?: HttpSettings) {
    const url = `${baseUrl}${path}`
    const parsedOptions = parseOptions(method, options || {})
    const response = await fetch(url, parsedOptions)
    const data = await response.json()

    return data
  }
}

export async function get(path: string, options?: HttpSettings) {
  return caller('GET')(path, options)
}

export async function post(path: string, options?: HttpSettings) {
  return caller('POST')(path, options)
}
