import { Pondok, REGIONAL_CODE } from '../types.js'
import shajs from 'sha.js'

interface DataOpts {
    region?: REGIONAL_CODE
    me?: Boolean
}

export async function hashPassword(password) {
    return shajs('sha256').update(password).digest('hex')
}

export class API {
    static CACHE = {}
    static isFetching = false

    static async fetch(path: Parameters<typeof fetch>[0], method: 'GET' | 'POST' = 'GET', body: Object = {}) {
        if (API.isFetching) throw new Error('Please wait other fetching to be done!')
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
        API.isFetching = true
        const res = await fetch(path, options)
        API.isFetching = false
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

export let MPJ = (options: DataOpts = {}) => API.fetch((options.me ? '/data/me?' : '/data/pondok?') + new URLSearchParams(Object.fromEntries(Object.entries(options).filter(([k, v]) => k !== 'me')) as Record<string, string>).toString()).then(({ json }) => json)
