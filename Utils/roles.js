import AccessControl from 'accesscontrol';

const ac = new AccessControl();

ac.grant("user")
  .createOwn("songs")
  .updateOwn("songs")
  .readOwn("files")
  .deleteOwn("files");

export default ac;
