const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//Register

router.post('/register', async (req, res)=>{
    const textPassword = await req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(textPassword, salt)
  
    try{
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass
      })
      const user = await newUser.save()
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
})

//Login

router.post('/login', async (req, res)=>{
try{
  const user = await User.findOne({username : req.body.username})
  !user && res.status(400).json("Wrong Cridencials");

  const isValidated = await bcrypt.compare(req.body.password, user.password)
  !isValidated && res.status(400).json("Wrong Cridencials");
  
  const {password, ...authedUser} = user._doc;
  
  res.status(200).json(authedUser)
  
} catch(err){
  res.status(500).json(err)
}
  
})

module.exports = router;