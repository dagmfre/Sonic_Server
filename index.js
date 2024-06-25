import express from "express";
import cors from "cors";
const app = express();
import globalErrorHandler from "./Utils/globalErrorHandler.js";
import isAuthenticated from "./Utils/authMiddleware.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { admin, adminRouter } from "./config/admin.js";

dotenv.config();

// Middleware setupz
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(admin.options.rootPath, adminRouter);

// Importing route handlers
import artistRoutes from "./Routes/artistRoutes.js";
import topArtists from "./Routes/topArtists.js";
import songRoutes from "./Routes/songRoutes.js";
import fileRoutes from "./Routes/fileRoutes.js";
import tracksRoute from "./Routes/tracksRoute.js";
import loginRoute from "./Routes/loginRoutes.js";
import signupRoute from "./Routes/signupRoutes.js";

// Publicly accessible routes
app.use("/login", loginRoute);
app.use("/register", signupRoute);

// Authentication middleware and protected routes
app.use(isAuthenticated);
app.use("/api/artists", artistRoutes);
app.use("/api/topArtists", topArtists);
app.use("/api/tracks", tracksRoute);
app.use("/api/songs", songRoutes);
app.use("/file", fileRoutes);

// Global error handler middleware
app.use(globalErrorHandler);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
