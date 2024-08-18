import { Router } from 'express'
import { db } from '../index.js'
import { REGIONAL_CODE } from '../../types.js'
import parsePhoneNumber from 'libphonenumber-js'

const router = Router()

router.use((req, res, next) => {
    if (!req.user) return res.status(401).send({
        error: 'You are not logged in',
    })
    next()
})

router.get('/me', (req, res, next) => {
    if (req.user?.email) return res.redirect(`${req.originalUrl.split('/').slice(0, 2).join('/')}/pondok?name=${encodeURIComponent(req.user?.email)}`)
    next()
})

router.get('/pondok', (req, res) => {
    if (req.query.name) res.json({
        json: db.find(req.query.name, 'pondok', 'creator')
    })
    else res.json({
        json: req.query.region ? db.data.pondok.filter(pondok => pondok.regionalCode.toString() == req.query.region?.toString() || pondok.regionalCode.toString() == REGIONAL_CODE[req.query.region?.toString() || '']) : db.data.pondok
    })
})

router.post('/', async (req, res) => {
    let pondok
    req.body.admins = req.body.admins?.map(v => {
        return {
            ...v,
            phoneNumber: parsePhoneNumber(v.phoneNumber || '', 'ID')?.formatInternational() || v.phoneNumber
        }
    })
    if (pondok = db.find(req.user?.email, 'pondok', 'creator')) {
        // Update data
        let old = {}
        await db.update(({ pondok }) => {
            const Pondok = pondok.find(
                (pondok) => pondok.creator === req.user?.email
            )
            if (!Pondok) return
            old = JSON.parse(JSON.stringify(Pondok))
            delete req.body.creator
            for (const key in req.body) {
                Pondok[key] = req.body[key]
            }
        })
        if (JSON.stringify(old) == JSON.stringify(pondok)) {
            return res.send({
                message: 'Nothing changed',
                json: pondok
            })
        }
        res.send({
            message: 'Successfully modify data',
            json: pondok
        })
    } else {
        // New data
        await db.update(({ pondok }) =>
            pondok.push({ ...req.body, email: req.user?.email, creator: req.user?.email })
        )
        res.send({
            message: 'Successfully add data',
            json: db.find(req.user?.email, 'pondok', 'creator')
        })
    }
})

export default router
