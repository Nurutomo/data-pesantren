import { Router } from 'express'
import MailChecker from 'mailchecker'
import argon2 from 'argon2'
import { db } from '../index.js'
const router = Router()

// Middleware to check if the user is logged in
router.use(async (req, _res, next) => {
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
    const { email, password } = req.body
    if (typeof email !== 'string' || typeof password !== 'string') {
        return res.status(401).send({
            error: 'Invalid type'
        })
    }
    // Check validity
    if (!MailChecker.isValid(email)) {
        return res.status(401).send({
            error: 'Invalid email address'
        })
    }
    // Find the user in the database
    const user = db.data.users.find((user) => user.email === email)
    // Find email in pondok
    const pondok = db.data.pondok.find((pondok) => pondok.email === email)
    // Check if the user exists
    if (user) {
        return res.status(401).send({
            error: 'Email exists',
        })
    }
    if (pondok) {
        await db.update(({ pondok }) => {
            const Pondok = pondok.find((pondok) => pondok.email === email)
            if (!Pondok) return
            Pondok.creator = Pondok.email
        })
    }
    // Hash the password using Argon2
    const hashedPassword = await argon2.hash(password)
    // Store the username and hashed password in the database
    await db.update(({ users }) =>
        users.push({ email, password: hashedPassword })
    )
    res.status(201).send({
        message: `User registered ${(pondok ? `with link to ${pondok.name} ` : '')}successfully!`,
    })
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (typeof email !== 'string' || typeof password !== 'string') {
        return res.status(401).send({
            error: 'Invalid type'
        })
    }
    // Find the user in the database
    const user = db.data.users.find((user) => user.email === email)
    // Find email in pondok
    const pondok = db.data.pondok.find((pondok) => pondok.email === email || pondok.creator === email)

    const sendInvalid = (error = 'Invalid e-mail or password') => res.status(401).send({ error })

    // Check if the user exists
    if (!user) {
        if (pondok) {
            return sendInvalid('Invalid e-mail or password (Register your email now!)')
        }
        return sendInvalid()
    }
    // Verify the password against the stored hash
    const isValidPassword = await argon2.verify(user.password, password)
    // If the password is valid, log the user in
    if (!isValidPassword) {
        return sendInvalid()
    }
    // Generate a random token
    const token =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    // Store the token in the database
    await db.update(({ users }) => {
        const user = users.find((user) => user.email === email)
        if (user) user.token = token
    })
    // Set the cookie
    res.cookie('token', token, { httpOnly: true })
    res.send({
        message: 'Login successful!',
    })
})

router.get('/logout', async (req, res) => {
    await db.update(({ users }) => {
        const user = users.find((user) => user.email === req.user?.email)
        if (user) delete user.token
    })
    res.redirect('back')
})

export default router
