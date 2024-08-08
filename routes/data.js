import { Router } from 'express';
import { db } from '../index.js';
const router = Router();
router.use((req, res, next) => {
    if (!req.user)
        return res.status(401).send({
            error: 'You are not logged in',
        });
    next();
});
router.get('/me', (req, res, next) => {
    if (req.user?.username)
        return res.redirect(`/?name=${encodeURIComponent(req.user?.username)}`);
    next();
});
router.get('/', (req, res) => {
    if (req.query.name)
        res.json(db.find(req.query.name, 'pondok', 'creator'));
    else
        res.json(db.data.pondok);
});
router.post('/', async (req, res) => {
    if (db.find(req.query.name, 'pondok', 'creator')) {
        // Update data
        await db.update(({ pondok }) => {
            const Pondok = pondok.find((pondok) => pondok.creator === req.user?.username);
            if (!Pondok)
                return delete req.body.creator;
            Object.assign(Pondok, req.body);
        });
        res.send({
            message: 'Successfully modify data',
        });
    }
    else {
        // New data
        await db.update(({ pondok }) => pondok.push({ ...req.body, creator: req.user?.username }));
        res.send({
            message: 'Successfully add data',
        });
    }
});
export default router;
