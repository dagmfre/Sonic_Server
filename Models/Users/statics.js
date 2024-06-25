const findSongByEmail = async function (email) {
  return await this.findOne(email);
};

export default { findSongByEmail };
