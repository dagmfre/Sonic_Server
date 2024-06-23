const AccessControl = require("accesscontrol");

const ac = new AccessControl();

ac.grant("user")
  .createOwn("songs")
  .updateOwn("songs")
  .readOwn("files")
  .deleteOwn("files");

module.exports = ac;
