const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//update

router.put('/:id', async (req, res)=>{
  if(req.body.userId === req.params.id){
    if(req.body.password){
      const salt = await bcrypt.genSalt(10)
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try{

      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
      },{new:true})
      res.status(200).json(updatedUser)
        
    } catch(err){
      res.status(500).json(err)
    }
      
    } else {
    res.status(401).json('you can only update your account')
    }
  })

//Delete

router.delete('/:id', async (req, res)=>{
  if(req.body.userId === req.params.id){
    try{
      const user = await User.findById(req.params.id);
        try{
          await User.findByIdAndDelete(req.params.id)
          res.status(200).json("User deleted")
            
        } catch(err){
          res.status(500).json(err)
        }
     }catch(err){
      res.status(404).json('sdf')
    } 
  } else {
    res.status(401).json('you can delete only your account')
  }
})

//GET USER

router.get('/:id', async (req, res)=>{
  try{
      const user = await User.findById(req.params.id);
      const {password, ...userInfos} = user._doc
      res.status(200).json(userInfos)
  }catch(err){
    res.status(500).json(err.message)
  }
})

module.exports = router;