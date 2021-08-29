const bcrypt = require('bcrypt');
const { User, Product } = require('./schema');
const fs = require('fs');

async function findUser(userInfo) {
    const email = userInfo.email;
    const user = await User.findOne({ email });
    return user;
}

async function findUserByIde(_id) {
    const user = await User.findById({ _id });
    return user;
}

async function validateUser(email, username) {
    const verifyUser = await User.findOne({ $or: [{ email }, { username }] }, (err, doc) => {
        if (err) {
            return err;
        }
        return doc;
    });
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
        return err;
    }
}

async function updateProfile(req, next) {

    const id = req.user._id;
    const findUserIfexist = await findUserByIde(id);

    if (findUserIfexist !== null) {
        let Update

        const { name, username, email } = req.body;
        const file = req.file;

        if (!file) {
            return next("chose a photo");
        }
        const img = fs.readFileSync(file.path);
        const imgBase64 = img.toString("base64");

        const Photo = await User.findByIdAndUpdate({ _id: id }, {
            profilePhoto: {
                imageType: file.mimetype,
                imageBase: imgBase64
            }
        }, (err, doc) => {
            if (err) {
                return err;
            }
            if (doc) {
                return doc;
            }
        });

        const ifNeedToUpdate = name !== req.user.name || username !== req.user.username ||
            email !== req.user.email;
        if (ifNeedToUpdate) {

            try {
                findUserIfexist.name = name;
                findUserIfexist.username = username;
                findUserIfexist.email = email;
                Update = await findUserIfexist.save()

            } catch (err) {
                console.log(err);
            }
        }
        return next(Update);
    }
}

async function postProduct(req, next) {
    const id = req.user._id;
    const findUserIfexist = await findUserByIde(id);
    if (!findUserIfexist) {
        return console.log("user not find");
    }
    const {
        title,
        description,
        category,
        brand,
        platform,
        condition,
        house,
        price
    } = req.body;
    const files = req.files;
    if (!files) {
        return console.log("Please choose files");
    }
    const imageInArray = files.map((file) => {
        let img = fs.readFileSync(file.path)
        return imageInBase64 = img.toString("base64");
    });

    const finalImages = imageInArray.map((src, index) => {
        let images = {
            imageType: files[index].mimetype,
            imageBase: src
        }
        return images;
    });
    const newProduct = new Product({
        title: title,
        description: description,
        category: category,
        brand: brand,
        platform: platform,
        condition: condition,
        house: house,
        price: price,
        productImages: finalImages,
        seller: id
    });
    const result = await newProduct.save((err, doc)=>{
        if(err){
            return console.log(err);
        }
        return next(doc);
    });
}

async function findAllProducts(next){
    await Product.find((err, doc)=>{
        if(err){
            return next(err);
        }
        return next(doc);
    });
}

module.exports = {
    updateProfile,
    findUser,
    findUserByIde,
    validateUser,
    createNewUser,
    postProduct,
    findAllProducts
}