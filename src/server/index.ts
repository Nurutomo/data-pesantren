import { JSONFilePreset } from 'lowdb/node'
import cookieParser from 'cookie-parser'
import path from 'path'
import express from 'express'
import { auth, data } from './routes/index.js'
import Data from './types.js'
import { Low } from 'lowdb'

const app = express()
const port = 3000
const __dirname = import.meta.dirname

// Read or create db.json
const defaultData: Data = { users: [], pondok: [] }
export let db: Low<Data> & { find: typeof find }
JSONFilePreset<Data>('db.json', defaultData).then(res => {
    db = Object.assign(res, { find })
})
function find(this: typeof db, search: any, name: keyof Data, ...children: string[]) {
    return this.data[name].find(value => {
        let data = value
        for (let child of children) {
            if (child in data) {
                // @ts-ignore
                data = data[child]
            }
        }
        return data === search
    })
}


app.use(express.static(path.join(__dirname, '../../public')))

app.use(express.json())
app.use(cookieParser())

app.use(auth)
app.use('/data', data)
// app.use(dashboard)

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client', 'index.html'))
//     if (req.user) {
//         // res.sendFile(path.join(__dirname, 'views', 'dashboard', 'build', 'index.html'))
//         // res.redirect('/dashboard')
//     } else {
//         // res.sendFile(path.join(__dirname, '../client', 'index.html'))
//         // res.sendFile(path.join(__dirname, 'views', 'auth.html'))
//         // res.end('Nothing was shown here yet. Please go to /data to see the data.')
//     }
// })

app.get('/', (_req, res) => res.redirect('/login'))
app.use(express.static(path.join(__dirname, '../client')))
app.get(['/login', '/register'], (req, res) => {
    if (req.user !== undefined) return res.redirect('/dashboard')
    res.sendFile(path.join(__dirname, '../client', 'index.html'))
})
app.get(['/404', '/500'], (_req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'index.html'))
})
app.get('*', (req, res) => {
    if (req.user !== undefined) return res.sendFile(path.join(__dirname, '../client', 'index.html'))
    res.redirect('/login')
})


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
