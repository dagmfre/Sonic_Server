const deleteSongMetaDataByFileName = async function (audioFileName) {
  return await this.deleteOne({ audioFileName });
};

export default deleteSongMetaDataByFileName;
