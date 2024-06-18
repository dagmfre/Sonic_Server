// custom static method for finding songs by audio fine name
export const getSongByAudioFileName = async function (audioFileName) {
  return await this.findOne(audioFileName);
};

// custom static method for deleting songs metadata by audio fine name
export const deleteSongMetaDataByFileName = async function (audioFileName) {
    await this.deleteOne({ audioFileName });
};