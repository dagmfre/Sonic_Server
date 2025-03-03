import express from "express";
import cors from "cors";
import globalErrorHandler from "./Utils/globalErrorHandler.js";
import isAuthenticated from "./Utils/authMiddleware.js";
import dotenv from "dotenv";

// Importing route handlers
import artistRoutes from "./Routes/artistRoutes.js";
import topArtists from "./Routes/topArtists.js";
import songRoutes from "./Routes/songRoutes.js";
import fileRoutes from "./Routes/fileRoutes.js";
import tracksRoute from "./Routes/tracksRoute.js";
import loginRoute from "./Routes/loginRoutes.js";
import signupRoute from "./Routes/signupRoutes.js";
import userRoutes from "./Routes/userRoutes.js";

dotenv.config();

const app = express();

// Welcome
app.get("/", (req, res) => {
  res.send("Welcome to the Sonic Server!");
});

// Middleware setupz
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: "https://sonic-client.onrender.com",
};
app.use(cors(corsOptions));
app.use(express.json());

// Publicly accessible routes
app.use("/login", loginRoute);
app.use("/register", signupRoute);

// Authentication middleware and protected routes
app.use("/api/artists", artistRoutes);
app.use("/api/topArtists", topArtists);
app.use("/api/tracks", tracksRoute);
app.use("/file", fileRoutes);
app.use(isAuthenticated);
app.use("/api/songs", songRoutes);
app.use("/api/user", userRoutes);

// Global error handler middleware
app.use(globalErrorHandler);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
