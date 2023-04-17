exports.emailValidation =  (req,res,next) => {
    console.log("Validating email");
    let email = req.body.email;

    if(!email){
        res.status(400).send("Email is required !");
        return;
    }

    email = email + "";
    console.log(email);


    if(email.indexOf("@")<0 || email.indexOf(".")<0){
        res.status(400).send("Email is invalid !")
        return;
    }
    next();
}

exports.passwordValidation =  (req,res,next) => {
    console.log("Validating password");
    let password = req.body.password;

    if(!password){
        res.status(400).send("Password is required");
        return;
    }

    password=password+"";
    if(password.length < 8){
        res.status(400).send("Password needs at lease 8 characters");
        return;
    }
    next();
}
