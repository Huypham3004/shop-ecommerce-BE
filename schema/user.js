const mongoose = require('../mongoose.service').mongoose;
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: String,
    password: String,
    name: String,
    phone: Number,
    city: String,
    district: String,
    wards: String,
    address: String,
    order: {
        productName: String,
        quantity: Number,
        note: String
    }
});
userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
userSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Users', userSchema)