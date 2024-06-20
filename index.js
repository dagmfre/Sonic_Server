const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const globalErrorHandler = require("./Utils/globalErrorHandler");
const isAuthenticated = require("./Utils/authMiddleware");
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const artistRoutes = require("./Routes/artistRoutes");
const topArtists = require("./Routes/topArtists");
const songRoutes = require("./Routes/songRoutes");
const fileRoutes = require("./Routes/fileRoutes");
const tracksRoute = require("./Routes/tracksRoute");
const loginRoute = require("./Routes/loginRoutes");
const signupRoute = require("./Routes/signupRoutes");

app.use("/login", loginRoute);
app.use("/register", signupRoute);
app.use(isAuthenticated);
app.use("/api/artists", artistRoutes);
app.use("/api/topArtists", topArtists);
app.use("/api/tracks", tracksRoute);
app.use("/api/songs", songRoutes);
app.use("/file", fileRoutes);

// Global error handler middleware
app.use(globalErrorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
