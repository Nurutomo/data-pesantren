import { Router } from 'express';
import argon2 from 'argon2';
import { db } from '../index.js';
const router = Router();
// Middleware to check if the user is logged in
router.use(async (req, res, next) => {
    // Get the token from the cookie
    const token = req.cookies.token;
    // Check if the token exists
    if (!token) {
        return next();
    }
    // Find the user in the database
    const user = db.data.users.find((user) => user.token === token);
    // Check if the user exists
    if (!user) {
        return next();
    }
    // Set the user object on the request object
    req.user = user;
    // Call the next middleware
    next();
});
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    // Find the user in the database
    const user = db.data.users.find((user) => user.username === username);
    // Check if the user exists
    if (user) {
        return res.status(401).json({
            error: 'Username exists',
        });
    }
    // Hash the password using Argon2
    const hashedPassword = await argon2.hash(password);
    // Store the username and hashed password in the database
    await db.update(({ users }) => users.push({ username, password: hashedPassword }));
    res.send({
        message: 'User registered successfully!',
    });
});
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // Find the user in the database
    const user = db.data.users.find((user) => user.username === username);
    // Check if the user exists
    if (!user) {
        return res.status(401).json({
            error: 'Invalid username or password',
        });
    }
    // Verify the password against the stored hash
    const isValidPassword = await argon2.verify(user.password, password);
    // If the password is valid, log the user in
    if (!isValidPassword) {
        return res.status(401).send({
            error: 'Invalid username or password',
        });
    }
    // Generate a random token
    const token = Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
    // Store the token in the database
    await db.update(({ users }) => {
        const user = users.find((user) => user.username === username);
        if (user)
            user.token = token;
    });
    // Set the cookie
    res.cookie('token', token, { httpOnly: true });
    res.send({
        message: 'Login successful!',
    });
});
router.get('/logout', async (req, res) => {
    await db.update(({ users }) => {
        const user = users.find((user) => user.username === req.user?.username);
        if (user)
            delete user.token;
    });
    res.redirect('back');
});
export default router;
