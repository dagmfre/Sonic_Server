import express from "express";
import { getArtists } from "../Controllers/artistTracksController.js";
const router = express.Router();

router.get("/", getArtists);

export default router;
