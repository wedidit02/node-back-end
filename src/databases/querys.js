const bcrypt = require('bcrypt');
const User = require('./schema');

function findUser(userInfo) {
    const email = userInfo.email
    const user = User.findOne({ email});
    return user;
}

function findUserByIde(_id) {
    const user = User.findById({ _id });
    return user;
}

function validateUser(email, username) {
    const verifyUser = User.find({ $or: [{ email }, { username }] })
    return verifyUser;
}

async function createNewUser(reqBody) {

    const encryptedPassword = await bcrypt.hash(reqBody.password, 10);

    const newUser = new User({
        name: reqBody.name,
        username: reqBody.username,
        email: reqBody.email,
        password: encryptedPassword
    })
    try {
        const saveNewUser = await newUser.save();
        return saveNewUser;

    } catch (err) {
        console.log(err)
    }
}

module.exports = { findUser, findUserByIde, validateUser, createNewUser }