const { Router } = require('express')
const { join } = require('path')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const router = new Router()

const defaultData = { users: [], pondok: [] }
const adapter = new FileSync(join(__dirname, '../db.json'))
const db = low(adapter)

db.defaults(defaultData)
.write()

db.find = function (search, name, ...children) {
	return this.data[name].find(value => {
		let data = value
		for (let child of children) data = data[child]
		return data === search
	})
}

router.use((req, res, next) => {
	if (!req.user) return res.status(401).send({
		error: 'You are not logged in',
	})
	next()
})

router.get('/me', (req, res) => {
	res.redirect(`/?name=${encodeURIComponent(req.user.username)}`)
})

router.get('/', (req, res) => {
	if (req.query.name) res.json(db.find(req.query.name, 'pondok', 'creator'))
	else res.json(db.data.pondok)
})

router.post('/', async (req, res) => {
	if (db.find(req.query.name, 'pondok', 'creator')) {
		// Update data
		await db.update(({ pondok }) => {
			const Pondok = pondok.find(
				(pondok) => pondok.creator === req.user.username
			)
			if (!Pondok) delete req.body.creator
			Object.assign(Pondok, req.body)
		})
		res.send({
			message: 'Successfully modify data',
		})
	} else {
		// New data
		await db.update(({ pondok }) =>
			pondok.push({ ...req.body, creator: req.user.username })
		)
		res.send({
			message: 'Successfully add data',
		})
	}
})

module.exports = Object.assign(router, {
    db,
})