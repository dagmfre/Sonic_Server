export const uploadSong = async function (songMetaData) {
  return await this.save(songMetaData);
};
