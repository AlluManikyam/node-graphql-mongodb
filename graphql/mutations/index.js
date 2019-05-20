const { signUp, login, editProfile, forgetPassword } = require('./users')
const {addCategory,editCategory,
    deleteCategory} = require('./category')

module.exports = {
    signUp,
    login,
    editProfile,
    forgetPassword,
    addCategory,
    editCategory,
    deleteCategory
}