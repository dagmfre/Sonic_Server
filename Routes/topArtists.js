import express from "express";
import { getTopArtists } from "../Controllers/artistTracksController.js";

const router = express.Router();

router.get("/", getTopArtists);

export default router;
