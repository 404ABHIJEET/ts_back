import express from 'express';
import cors from 'cors';

import userRoutes from './routes/user.routes';
import { loginUser } from './controllers/auth.controller';
import { authMiddleware, loginMiddleware } from './middleware/middleware';

const port = 8000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: '*', // Or your frontend domain
    credentials: true
}));

// Unprotected route
app.get('/', (req, res) => {
    res.send('Hello from backend!')
});
app.use('/auth', loginMiddleware, loginUser)

// Middleware
app.use(authMiddleware)

// Protected routes
app.use('/users', userRoutes)

const startServer = () => {
    try {
        app.listen(port, '0.0.0.0', () => {
            console.log(`Server running at http://localhost:${port}`)
        }).on('error', (err) => {
            console.error('Failed to start server:', err.message)
            process.exit(1)
        });
    } catch (err) {
        console.error('Unexpected error while starting server:', err)
    }
};

startServer()

