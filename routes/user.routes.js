import express from "express";
import db from "../db";
import { usersTable } from "../models/user.model";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;


});

export default router;