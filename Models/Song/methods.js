const uploadSong = async function (songMetaData) {
  return await this.save(songMetaData);
};

module.exports = {
  uploadSong
};