const bcrypt = require('bcrypt');
const User = require('./schema');
const path = require('path');

function findUser(userInfo) {
    const email = userInfo.email;
    const user = User.findOne({ email });
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
        password: encryptedPassword,
        profileimage: null
    })
    try {
        const saveNewUser = await newUser.save();
        return saveNewUser;

    } catch (err) {
        console.log(err)
        return err;
    }
}

async function updateProfile(req, next) {

    const _id = req.user._id;
    const findUserIfexist = await findUserByIde(_id);

    if (findUserIfexist !== null) {
        let Update

        const { name, username, email } = req.body;

        if (req.files !== null) {
            const profileImage = req.files.profileimage;
            const imageName = _id + profileImage.name;
            const uploadProfileImagePath = path.normalize(__dirname + '../../usersProfileImage/' + imageName);

            profileImage.mv(uploadProfileImagePath, (async (err) => {
                if (err) {
                    console.log(err)
                    return err;
                };

                try {
                    findUserIfexist.profileimage = imageName;
                    Update = await findUserIfexist.save()

                } catch (err) {
                    console.log(err)
                    return;
                }
            }));
        }

        const ifNeedToUpdate = name !== req.user.name || username !== req.user.username ||
            email !== req.user.email;
        if (ifNeedToUpdate) {
            
            try {
                findUserIfexist.name = name;
                findUserIfexist.username = username;
                findUserIfexist.email = email;
                Update = await findUserIfexist.save()

            } catch (err) {
                console.log(err)
            }
        }
        return next(Update);
    }
}

module.exports = { updateProfile, findUser, findUserByIde, validateUser, createNewUser }