import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../utils/constant";
import { Login } from "../models/login.model";

export function authMiddleware(req: Request, res: Response, next: () => void) {

    const token = req.headers['authorization'];

    if (token) {
        try {
            jwt.verify(token, JWT_SECRET)
            next();
        } catch (error) {
            res.statusCode = 401;
            res.end('Unauthorized: token is invalid or expired');
        }
    } else {
        res.statusCode = 401;
        res.end('Unauthorized: No token provided');
    }
}

export function loginMiddleware(req: Request, res: Response, next: () => void) {
    const {username, password} : Login = req.body
    if(!username) {
        res.statusCode = 404
        res.end('Username not found')
    }
    else if(!password) {
        res.statusCode = 404
        res.end('Password not found')
    } else {
        next()
    }
}
