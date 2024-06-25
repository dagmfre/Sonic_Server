import express from 'express';
import signupController from '../Controllers/signupController.js';

const router = express.Router();

router.post("/", signupController);

export default router;
