const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const {registerValidation,loginValidation} = require('../validation');
const jwt = require('jsonwebtoken');
 



router.post('/register', async (req,res) =>{

    //Validate with joi before create a new user

    // const {error} = Joi.validate(req.body,schema); not work anymore
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    // res.send(error.details[0].message); example

    //checking if user is already in the database

    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('Email already exist');

    //Hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(req.body.password,salt);    

    //Create a new user
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user : user._id});
    }catch(err){
        res.status(400).send(err);
    }

});


//LOGIN
router.post('/login', async (req,res) =>{
    // validate data before login
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //checking if the email exist
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email is not found');
    
    //password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);

    if(!validPass) return res.status (400).send('Invalid password');

    //create token
    const token = jwt.sign({_id : user._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);



    res.send('Logged');
})



module.exports = router;