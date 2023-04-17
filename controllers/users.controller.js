const UserModel = require('../models/users.model');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    let user = req.body;
    await bcrypt.hash(user.password, 2).then(function (hash) {
        user.password = hash;
    })
    await UserModel.createUser(user).then((result) => {
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(400).send("Cannot create user!")
        }
    })

}

exports.login = async (req, res) => {
    let user_login = req.body;
    let user_info = await UserModel.findByEmail(user_login.email);
    console.log(user_info);
    if (!user_info) {
        res.status(404).send("Email not found !")
        return;
    }
    await bcrypt.compare(user_login.password, user_info.password)
        .then(function (result) {
            if (!result) {
                res.status(404).send("Incorrect password !");
                return;
            }
        });

    let token = jwt.sign({ name: user_info.name, email: user_info.email }, 'Mindx2023');
    console.log(token);
    res.status(200).send({ 
        "token": token, 
        message: "Login successfully !",
        "email": user_info.email
     })
}

exports.getUser = async (req, res) => {
    let user = req.query.email;
    let user_info = await UserModel.findByEmail(user);
    if (user_info) {
        res.json({
            name: user_info.name,
            phone: user_info.phone,
            email: user_info.email,
            city: user_info.city,
            district: user_info.district,
            wards: user_info.wards,
            address: user_info.address,
        })
    } else {
        res.status(401);
        throw new Error('User not found');
    }
}

exports.updateUser = async (req, res) => {
    let user = req.body;
    let user_info = await UserModel.findByEmail(user.email);

    if (user_info) {
        user_info.name = req.body.name || user_info.name;
        user_info.phone = req.body.phone || user_info.phone;
        user_info.city = req.body.city || user_info.city;
        user_info.district = req.body.district || user_info.district;
        user_info.wards = req.body.wards || user_info.wards;
        user_info.address = req.body.address || user_info.address;
        user_info.order.productName = req.body.productName;
        user_info.order.quantity = req.body.quantity;
        user_info.order.note = req.body.note;

        const updateUser = await user_info.save();
        res.json({
            name: updateUser.name,
            phone: updateUser.phone,
            city: updateUser.city,
            district: updateUser.district,
            wards: updateUser.wards,
            address: updateUser.address,
            order:{
                productName: updateUser.order.productName,
                quantity: updateUser.order.quantity,
                note: updateUser.order.note
            }
        });
    } else {
        res.status(401);
        throw new Error('User not found');
    }
};

exports.current = async (req, res) => {
    console.log(req);

};


