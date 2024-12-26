const findUserByEmail = async function (email) {
  return await this.findOne({ email });
};

export default { findUserByEmail };
