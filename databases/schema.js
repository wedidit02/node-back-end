const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    profileimage: {
        type: String,
        allowNull: true
    }
}, {
    timestamps: true
});

const productSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    brand: {
        type: String
    },
    platform: {
        type: String,
    },
    condition: {
        type: String
    },
    price: {
        type: String
    },
    productImage: [{
        imageType: {
            type: String,
            required: true
        },
        imageBase: {
            type: String,
            required: true
        }
    }],
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
}, {
    timestamps: true
});

const User = mongoose.model("user", usersSchema);
const postProduct = mongoose.model("product", productSchema);

module.exports = {
    User,
    postProduct
}