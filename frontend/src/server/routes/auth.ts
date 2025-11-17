// frontend/src/server/routes/auth.ts
import { Request, Response } from "express";
import axios from "axios";

const USER_SERVICE_URL = "http://user_service_new:8014";

export async function handleSignup(req: Request, res: Response) {
  try {
    const response = await axios.post(`${USER_SERVICE_URL}/users/signup`, req.body);
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: "An error occurred" });
  }
}

export async function handleLogin(req: Request, res: Response) {
  try {
    const response = await axios.post(`${USER_SERVICE_URL}/users/login`, req.body);
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: "An error occurred" });
  }
}

export async function handleLogout(req: Request, res: Response) {
  try {
    const response = await axios.post(`${USER_SERVICE_URL}/users/logout`, {}, {
      headers: {
        Authorization: req.headers.authorization,
      },
    });
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: "An error occurred" });
  }
}
