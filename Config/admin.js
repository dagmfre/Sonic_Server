import AdminJs, { ListAction } from "adminjs";
import AdminJsExpress from "@adminjs/express";
import * as AdminJsMongoose from "@adminjs/mongoose";
import User from "../Models/Users/userModel.js";
import Song from "../Models/Song/Song.js";
import dotenv from "dotenv";
import { Components, componentLoader } from "../Components/components.js";

dotenv.config();

AdminJs.registerAdapter(AdminJsMongoose);

const admin = new AdminJs({
  resources: [
    {
      resource: User,
      options: {
        parent: {
          name: "Users Handling",
        },
        listProperties: ["_id", "email", "username", "avatar"],
        showProperties: ["_id", "email", "username", "avatar"],
        editProperties: ["email", "username", "password"],
        properties: {
          avatar: {
            type: "string",
            components: {
              list: Components.UserAvatar,
            },
          },
        },
      },
    },
    {
      resource: Song,
      options: {
        parent: {
          name: "Users Handling",
        },
      },
    },
  ],
  componentLoader,
  rootPath: "/admin",
});

const ADMIN_CREDENTIALS = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

const authenticate = async (email, password) => {
  if (
    email === ADMIN_CREDENTIALS.email &&
    password === ADMIN_CREDENTIALS.password
  ) {
    return Promise.resolve(ADMIN_CREDENTIALS);
  }
  return null;
};

const adminRouter = AdminJsExpress.buildAuthenticatedRouter(admin, {
  authenticate,
  cookieName: "adminjs",
  cookiePassword: process.env.ADMINJS_SECRET_KEY,
});

admin.watch();

export { admin, adminRouter };
