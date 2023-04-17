const User = require('../schema/user');

exports.findById = (id) => {
    return User.findById(id)
        .then((result) => {
            result = result.toJSON();
            return result;
        });
};

exports.findByEmail = (email) => {
    return User.find({email: email}).then((result=>{
        return result[0];
    }))
}

exports.createUser = (userData) => {
    const user = new User(userData); // Create user on database, User: Schema
    return user.save();
};

exports.list = () => {
    return new Promise((resolve, reject) => {
        User.find()
            // .sort({age: 1, name: 1})
            // .limit(20)
            .exec(function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
    });
};

exports.listByAdress = (address) => {
    return new Promise((resolve, reject) => {
        User.find({address : address})
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};

exports.updateUser = (id, userData) => {
    let userUpdate =  User.findOneAndUpdate({
        _id: id
    }, userData);
    return userUpdate;
};

exports.removeById = (userId) => {
    return new Promise((resolve, reject) => {
        User.deleteMany({_id: userId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

