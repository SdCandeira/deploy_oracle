import express from "express";
import { getUnit } from "../controllers/user.js";

const router = express.Router()

router.get("/", getUnit)


export default router