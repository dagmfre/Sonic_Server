const findSongByEmail = async function (email) {
  await this.findOne(email);
};

module.exports = {
  findSongByEmail,
};
