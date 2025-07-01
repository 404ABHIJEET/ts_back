import { Request, Response } from 'express';
import { User } from '../models/user.model';
import prisma from '../lib/prisma';
import { ApiResponse } from '../types/apiResponse';

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany()
    const response: ApiResponse = {
      success: true,
      message: "Users fetched successfully",
      data: users
    }
    res.status(200).json(response)
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      message: "Something went wrong",
      error: error
    }
    res.status(200).json(response)
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const { id } = req.params
    console.log("dsad", id);
    const user = await prisma.user.findFirst({
      where: {
        id: parseInt(id)
      }
    })
    if (user) {
      const response: ApiResponse = {
        success: true,
        message: "User found.",
        data: user
      }
      res.status(200).json(response)
    } else {
      const response: ApiResponse = {
        success: false,
        message: "No such user exist",
      }
      res.status(404).json(response)
    }
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      message: "Something went wrong",
      error: error
    }
    res.status(500).json(response)
  }
}

export async function getUserByUsername(req: Request, res: Response) {
  try {
    const { username } = req.params
    const user = await prisma.user.findFirst({
      where: {
        username: username
      }
    })
    if (user) {
      const response: ApiResponse = {
        success: true,
        message: "User found.",
        data: user
      }
      res.status(200).json(response)
    } else {
      const response: ApiResponse = {
        success: false,
        message: "No such user exist",
      }
      res.status(404).json(response)
    }
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      message: "Something went wrong",
      error: error
    }
    res.status(500).json(response)
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const { name, email, password, username }: User = req.body;
    const user = await prisma.user.create({
      data: {
        name: name,
        username: username,
        email: email,
        password: password,
        updatedAt: new Date()
      }
    })
    const response: ApiResponse = {
      success: true,
      message: "User created successfully",
      data: user
    }
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    const response: ApiResponse = {
      success: false,
      message: "Something went wrong",
      error: error
    }
    res.status(500).json(response);
  }
};

export async function deleteUserById(req: Request, res: Response) {
  try {
    const { id } = req.params
    console.log("id", id);
    if (id && (typeof id === 'string')) {
      await prisma.user.delete({
        where: {
          id: parseInt(id)
        }
      })
      const response: ApiResponse = {
        success: true,
        message: "User deleted successfully"
      }
      res.status(200).json(response)
    } else {
      const response: ApiResponse = {
        success: false,
        message: "Invalid or no id found"
      }
      res.status(401).json(response)
    }
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      message: "Something went wrong",
      error: error
    }
    res.status(500).json(response)
  }
}

export async function deleteUserByUsername(req: Request, res: Response) {
  try {
    const { username } = req.query
    if (username && (typeof username === 'string')) {
      await prisma.user.delete({
        where: {
          id: parseInt(username)
        }
      })
      const response: ApiResponse = {
        success: true,
        message: "User deleted successfully"
      }
      res.status(200).json(response)
    }
    const response: ApiResponse = {
      success: false,
      message: "Invalid or no username found"
    }
  } catch (error) {

  }
}