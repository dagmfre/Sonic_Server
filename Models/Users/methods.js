const saveRegisteredUser = async function (userData) {
    return await this.save(userData);
  };
  
  module.exports = {
    saveRegisteredUser
  };