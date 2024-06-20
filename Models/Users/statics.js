const findSongByEmail = async function (email) {
  return await this.findOne(email);
};

module.exports = { findSongByEmail };
