import { Pondok, REGIONAL_CODE } from '../types.js'


interface DataOpts {
    region?: REGIONAL_CODE
}

export async function hashPassword(password) {
    const encoder = new TextEncoder()
    const data = encoder.encode(password)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    return Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
}

export class API {
    static CACHE = {}

    static async fetch(path: Parameters<typeof fetch>[0], method: 'GET' | 'POST' = 'GET', body: Object = {}) {
        if (!path) return {}
        if (method === 'GET' && path.toString() in API.CACHE) {
            return API.CACHE[path.toString()]
        }
        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
            }
        }
        if (method !== 'GET') options.body = JSON.stringify(body)
        const res = await fetch(path, options)
        const json: {
            error?: string
            message?: string
            json?: Object | any[]
        } = await res.json()
        if (json.error) throw new Error(json.error)
        if (method === 'GET') API.CACHE[path.toString()] = json
        return json
    }

    static async login(email, password) {
        return API.fetch('/login', 'POST', {
            email,
            password: await hashPassword(password)
        })
    }

    static async register(email, password) {
        return API.fetch('/register', 'POST', {
            email,
            password: await hashPassword(password)
        })
    }

    static async logout() {
        return API.fetch('/logout')
    }
}

export let MPJ = (options: DataOpts = {}) => API.fetch('/data/pondok?' + new URLSearchParams(options as Record<string, string>).toString()).then(({ json }) => json as Pondok[])
