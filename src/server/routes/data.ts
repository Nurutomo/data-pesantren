import { Router } from 'express'
import { db } from '../index.js'
import { REGIONAL_CODE } from '../../types.js'
// import { REGIONAL_CODE } from '../../types.js'
const router = Router()

router.use((req, res, next) => {
    if (!req.user) return res.status(401).send({
        error: 'You are not logged in',
    })
    next()
})

router.get('/me', (req, res, next) => {
    if (req.user?.email) return res.redirect(`/?name=${encodeURIComponent(req.user?.email)}`)
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
    if (db.find(req.query.name, 'pondok', 'creator')) {
        // Update data
        await db.update(({ pondok }) => {
            const Pondok = pondok.find(
                (pondok) => pondok.creator === req.user?.email
            )
            if (!Pondok) return delete req.body.creator
            Object.assign(Pondok, req.body)
        })
        res.send({
            message: 'Successfully modify data',
        })
    } else {
        // New data
        await db.update(({ pondok }) =>
            pondok.push({ ...req.body, creator: req.user?.email })
        )
        res.send({
            message: 'Successfully add data',
        })
    }
})

export default router
