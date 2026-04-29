import { apiBasePath } from "@/config"
import { trimLeadingChar, trimTrailingChar } from "@/utils/string"

// Report is opaque: only ever rendered by pdf.co for PDF generation.
// There is no user session and no login UI. Auth is a single static
// API key baked in at build time via VITE_AUTH_KEY, sent as
// `Authorization: AuthKey fmsk.xxx` (the format the TS API's
// authMiddleware expects).
const apiKey: string | null = import.meta.env.VITE_AUTH_KEY || null

export const hasAPIKey = (): boolean => apiKey !== null && apiKey.length !== 0

type Method = 'GET' | 'POST' | 'PUT'

interface CallOptions {
  endpoint: string
  method?: Method
  body?: unknown
}

const makeCall = async ({ endpoint, method = 'GET', body }: CallOptions): Promise<unknown> => {
  let fetchOptions: RequestInit = {}
  let responseBody: unknown = null

  try {
    if (!hasAPIKey()) throw new APITokenError('VITE_AUTH_KEY not configured')

    fetchOptions = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `AuthKey ${apiKey}`,
      },
      ...(body !== undefined && { body: JSON.stringify(body) }),
    }

    const response = await fetch(buildUrl(endpoint), fetchOptions)

    if (response.status !== 204) {
      try {
        responseBody = await response.json()
      } catch {
        if (response.ok) throw new Error('Failed to process response body')
      }
    }

    if (!response.ok) {
      throw new APIErrorResponse(response.status, responseBody)
    }

    return responseBody
  } catch (err: unknown) {
    if (err instanceof APIClientError) throw err
    throw new APICallError(err, endpoint, fetchOptions, responseBody)
  }
}

export class APIClientError extends Error {
  constructor(message = 'API client error') {
    super(message)
    this.name = 'APIClientError'
  }
}

export class APIErrorResponse extends APIClientError {
  status: number
  body: unknown

  constructor(status: number, body: unknown) {
    super(`API error: ${status}`)
    this.name = 'APIErrorResponse'
    this.status = status
    this.body = body
  }
}

export class APITokenError extends APIClientError {
  status = 401

  constructor(message: string) {
    super(message)
    this.name = 'APITokenError'
  }
}

export class APICallError extends APIClientError {
  status = 500
  body = 'The API call failed'
  err: unknown
  endpoint: string
  options: object
  responseBody: unknown

  constructor(err: unknown, endpoint: string, options: object, responseBody: unknown) {
    super(`API call failed: ${endpoint}`)
    this.name = 'APICallError'
    this.err = err
    this.endpoint = endpoint
    this.options = options
    this.responseBody = responseBody
  }
}

export const get = <T = unknown>(opts: { endpoint: string }) =>
  makeCall({ ...opts, method: 'GET' }) as Promise<T>

export const post = <T = unknown>(opts: { endpoint: string; body?: unknown }) =>
  makeCall({ ...opts, method: 'POST' }) as Promise<T>

export const put = <T = unknown>(opts: { endpoint: string; body?: unknown }) =>
  makeCall({ ...opts, method: 'PUT' }) as Promise<T>

const buildUrl = (endpoint: string): string =>
  `${trimTrailingChar(apiBasePath, '/')}/api/${trimLeadingChar(endpoint, '/')}`
