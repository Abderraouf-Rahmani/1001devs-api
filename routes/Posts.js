const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');


//WRITE

router.post('/write', async (req, res)=>{
    
      try{
           
        const post = new Post({
            title: req.body.title,
            desc: req.body.desc,
            username: req.body.username,
            categories: req.body.categories
        })

        const newPost = await post.save()

        res.status(200).json(post)
          
      } catch(err){
        res.status(500).json(err)
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
    const c = req.query.c
    const title = req.query.title
  try{
      let posts;
      if(username){
        posts = await Post.find({username})
      }else if(c){
        posts = await Post.find({categories:{
            $in:[c]
        }})
      }else{
        posts = await Post.find()
      }
      res.status(200).json(posts)
  }catch(err){
    res.status(500).json(err)
  }
})

//GET a POST
router.get('/read/:title', async (req, res)=>{
  
  const title = req.params.title
  let regExp = /[a-z0-9-()?]/;
  try{
    if (!regExp.test(title))  {res.status(500).json('the title can only contain alphnemericals and dashs')}
    let postTitle= title.split('-').join(' ')
    const thePost = await Post.find({title: postTitle})
    if(thePost.length > 0) {
      res.status(200).json(thePost)
    }else{res.status(404).json('no post with such title')}
    

}catch(err){
  res.status(500).json(err)
}
})
module.exports = router;