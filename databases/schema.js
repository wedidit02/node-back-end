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
    profilePhoto: {
        imageType: {
            type: String,
        },
        imageBase: {
            type: String,
        }
    },
    isSeller: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const productSchema = new Schema({
    tittle: {
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
    house: {
        type: String
    },
    price: {
        type: String
    },
    productImages: [
        {
            imageType: {
                type: String,
                required: true
            },
            imageBase: {
                type: String,
                required: true
            }
        }
    ],
    seller: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
}, {
    timestamps: true
});

const User = mongoose.model("user", usersSchema);
const Product = mongoose.model("product", productSchema);

module.exports = {
    User,
    Product
}