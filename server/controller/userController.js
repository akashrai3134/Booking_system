const User = require("../models/userModel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


async function Register(req, res) {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
          res.send({
            success: false,
            message: "user already Exists",
          });
          return 
        }
        // Hash The password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password , salt)
        req.body.password = hashedPassword
        console.log(salt)
        const newUser = await User(req.body);
        await newUser.save(); // saves the data in the database
        res.send({
          success: true,
          message: "User Registered Successfully , you can login low",
        });
      } catch (error) {
        console.log(error);
        res.send({
            success : false,
            message : "Some error occured"
        })
      }
}

async function Login(req, res) {

    try {
        const user = await User.findOne({email : req.body.email});
        console.log(user)
        if(!user){
            res.send({
                success : false,
                message : 'User is not Registered . Please register first',
            })
            return
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        console.log(validPassword);
        if(!validPassword){
            res.send({
                success : false,
                message : "Invalid Pasword",
            })
            return
        }

        // never exprime
        // const token = jwt.sign({userId : user._id} , `${process.env.SECRET_KEY}`);

        // exprime after one day
        const token = jwt.sign({userId : user._id} , `${process.env.SECRET_KEY}`, {expiresIn : "1d"});

        console.log('token', token);

        res.send({
            success : true,
            user : user,
            message : "user is logged in",
            token : token
        })
    } catch(error){
        console.log(error);
        return
    }

}

async function getCurrentUser(req, res) {
    try{
        const user = await User.findById(req.body.userId).select('-password');
        res.send({ 
            success : true, 
            message: "Welcome to the protected route!", 
            user:user });

    }catch(error){
        console.log(error);
        return;
    }
}

module.exports ={Register, Login, getCurrentUser}