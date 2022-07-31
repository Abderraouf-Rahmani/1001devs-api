const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');



//WRITE

router.post('/write', async (req, res)=>{
    
      try{
        // check if there is a post with the same title

           
        const post = new Post({
            title: req.body.title,
            titleId: req.body.title,
            desc: req.body.desc,
            username: req.body.username,
            userid: req.body.userid,
            categories: req.body.categories
        })

        const newPost = await post.save()

        res.status(200).json(post)
          
      } catch(err){
        res.status(500).json({message : err.message})
      }
        
      
    })
  

//update

router.put('/:id', async (req, res)=>{ 
            try{

                const post = await Post.findById(req.params.id)
                if(post.username === req.body.username){
                try{
                    const {username, ...infosToUpdate} = await req.body;
                    const updatedPost = await Post.findByIdAndUpdate(req.params.id,{
                       $set:infosToUpdate
                   }, {new: true});
                    res.status(200).json(updatedPost)
                } catch(err){
                    res.status(500).json(err)
                }
            }else{
                res.status(500).json('you can only update your posts')
            }
        }catch(err){
            res.status(500).json(err.message)

        }
})
  
//Delete

router.delete('/:id', async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(post.username === req.body.username){
            try{
               const postToBeDeleted = post.delete();
                res.status(200).json('your post is deleted...')
            } catch(err){
                res.status(500).json(err)
            }
        }else{
            res.status(500).json('you can only delete your posts')
        }
     }catch(err){
      res.status(404).json(`we can't find a post with this ID ${req.params.id}`)
    } 
})

//GET POSTS

router.get('/', async (req, res)=>{
    const username = req.query.user
    const postNum = req.query.limit
    const c = req.query.c
  try{
      let posts;
      if(username){
        posts = await Post.find({username})
      }else if(c){
        posts = await Post.find({categories:{
            $in:[c]
        }})
      }else if(postNum){
        posts = await Post.find().limit(postNum)
      }else{
        posts = await Post.find()
      }
      res.status(200).json(posts)
  }catch(err){
    res.status(500).json(err)
  }
})

//GET SEARCHED POSTS

router.get('/search/:s', async (req, res) =>{
  const searchStr = req.params.s
  try{
    const posts = await Post.find(
        { $text : {$search: searchStr} },
         { score : { $meta: "textScore" } }
      ).sort({score:{$meta:"textScore"}})
      
res.status(200).json(posts)
      
  
  }catch(err){
    res.status(500).json(err)
  }
})

//GET a POST
router.get('/read/:id', async (req, res)=>{
  
  const postId = req.params.id
  try{
    const thePost = await Post.findById(postId)
    
      res.status(200).json(thePost)
    

}catch(err){
  res.status(500).json({message: err.message})
}
})
module.exports = router;