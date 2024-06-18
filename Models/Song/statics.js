// custom static method for finding songs by audio fine name
const getSongByAudioFileName = async function (audioFileName) {
  return await this.findOne({ filename: audioFileName });
};

// custom static method for deleting songs metadata by audio fine name
const deleteSongMetaDataByFileName = async function (audioFileName) {
  await this.deleteOne({ filename: audioFileName });
};

// custom static method for deleting all the binary song and image files
const deleteSongsAndImagesFilesById = async function (imageAndAudioFileId) {
  await this.delete(imageAndAudioFileId);
};

module.exports = {
  getSongByAudioFileName,
  deleteSongMetaDataByFileName,
  deleteSongsAndImagesFilesById
};
