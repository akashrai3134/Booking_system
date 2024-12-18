const User = require("../models/userModel");
const bcrypt = require('bcrypt')

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
        res.send({
            success : true,
            user : user,
            message : "user is logged in"
        })
    } catch(error){
        console.log(error);
        return
    }

}



module.exports ={Register, Login}