const express=require("express")
const requireLogin = require("../middleware/requireLogin")
const Post = require("../models/post")
const router=express.Router()
//creating post
router.post("/createPost",requireLogin,(req,res)=>{
  const {title,body,pic}=req.body
  if(!title || !body || !pic){
         return res.status(422).json({error:"Please Add All Fields"})
  }else{
    const post =new Post({title,body,photo:pic,postedBy:req.user})
    post.save()
         .then(result => res.json(result))
  }
      
})

//showing alll post to user
router.get("/allpost",requireLogin,(req,res)=>{
    Post.find()
         .populate("postedBy","_id name")
         .then(posts => res.json(posts))
})

//showing post of user itself
router.get("/mypost",requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy"," _id name")
    .then(mypost =>{
        res.json(mypost)
    })
})

router.put("/like",requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._}
    },{
        new:true
    })
    .then(result => res.json(result))
})

module.exports=router