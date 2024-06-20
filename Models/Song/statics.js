// custom static method for deleting songs metadata by audio fine name
const deleteSongMetaDataByFileName = async function (audioFileName) {
  return await this.deleteOne({ filename: audioFileName });
};

module.exports = {
  deleteSongMetaDataByFileName,
};
