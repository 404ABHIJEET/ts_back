import { Request, Response } from 'express';
import { Login } from "../models/login.model";
import { ApiResponse } from "../types/apiResponse";
import jwt from "jsonwebtoken"
import prisma from '../lib/prisma';
import { EXPIRES_IN, JWT_SECRET } from '../utils/constant';
import { User } from '../models/user.model';

export async function loginUser(req: Request, res: Response) {
    try {
        const { username, password }: Login = req.body
        const user: User | null = await prisma.user.findFirst({
            where: {
                username: username,
                password: password
            }
        })
        if (user) {
            console.log(user)
            const payload = {
                name: user.name,
                username: user.username,
            }
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN })
            const response: ApiResponse = {
                success: true,
                message: "Login successfully",
                data: token
            }
            res.status(200).json(response)
        } else {
            const response: ApiResponse = {
                success: false,
                message: "Invalid credential",
            }
            res.status(404).json(response)
        }
    } catch (error) {
        console.log(error);
        const response: ApiResponse = {
            success: false,
            message: "Login failed",
            error: error
        }
        res.status(500).json(response)
    }
}