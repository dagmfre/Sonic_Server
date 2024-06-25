const uploadSong = async function (songMetaData) {
  return await this.save(songMetaData);
};

export default uploadSong;
