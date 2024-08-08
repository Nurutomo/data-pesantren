const { Router } = require('express')
const argon2 = require('argon2')
const { db } = require('./db')

const router = new Router()

// Middleware to check if the user is logged in
router.use(async (req, res, next) => {
	// Get the token from the cookie
	const token = req.cookies.token
	// Check if the token exists
	if (!token) {
		return next()
	}
	// Find the user in the database
	const user = db.data.users.find((user) => user.token === token)
	// Check if the user exists
	if (!user) {
		return next()
	}
	// Set the user object on the request object
	req.user = user
	// Call the next middleware
	next()
})

router.post('/register', async (req, res) => {
	const { username, password } = req.body
	// Find the user in the database
	const user = db.data.users.find((user) => user.username === username)
	// Check if the user exists
	if (user) {
		return res.status(401).json({
			error: 'Username exists',
		})
	}
	// Hash the password using Argon2
	const hashedPassword = await argon2.hash(password)
	// Store the username and hashed password in the database
	await db.update(({ users }) =>
		users.push({ username, password: hashedPassword })
	)
	res.send({
		message: 'User registered successfully!',
	})
})

router.post('/login', async (req, res) => {
	const { username, password } = req.body
	// Find the user in the database
	const user = db.data.users.find((user) => user.username === username)
	// Check if the user exists
	if (!user) {
		return res.status(401).json({
			error: 'Invalid username or password',
		})
	}
	// Verify the password against the stored hash
	const isValidPassword = await argon2.verify(user.password, password)
	// If the password is valid, log the user in
	if (!isValidPassword) {
		return res.status(401).send({
			error: 'Invalid username or password',
		})
	}
	// Generate a random token
	const token =
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15)
	// Store the token in the database
	await db.update(({ users }) => {
		const user = users.find((user) => user.username === username)
		user.token = token
	})
	// Set the cookie
	res.cookie('token', token, { httpOnly: true })
	res.send({
		message: 'Login successful!',
	})
})

router.get('/logout', async (req, res) => {
	if (req.user)
		await db.update(({ users }) => {
			const user = users.find((user) => user.username === req.user.username)
			delete user.token
		})
	res.redirect('back')
})

module.exports = router