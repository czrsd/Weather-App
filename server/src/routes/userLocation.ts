import express, { Request, Response } from "express";
import axios from "axios";

const router = express.Router();

router.get("/cities", async (req: Request, res: Response) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  
});

export default router;
