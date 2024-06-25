import express from "express";
import { getTracks } from "../Controllers/artistTracksController.js";

const router = express.Router();

router.get("/", getTracks);

export default router;
