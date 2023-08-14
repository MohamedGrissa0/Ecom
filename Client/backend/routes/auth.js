const router = require("express").Router();
const User = require("../models/User");
const md5 = require("md5");





router.post("/register",async (req,res)=> {
  try {
    
    const { name, lastname, username, email, password } = req.body;  
  
   const userexist= await User.findOne({email:email});
   if(userexist){
    res.status(400).send({status:400});
  
  } else{
    const objectToInsert = await new  User({
      name,
      lastname,
      img:"",
    username,
  email,
  password:md5(password),
  }) 
;
  await objectToInsert.save();
  res.status(200).send({status:200});
}
  
  } catch (error) {
    console.log(error)
  }
  
  });

router.post("/login",async (req,res)=>{

  try{
  const {email } = req.body;  

  const user= await User.findOne({email:email})
    if(user){
  const isCorrect= user.password===( await md5(req.body.password))
  if(isCorrect){
    
    
  const{password,...others}=user._doc
  res.status(200).json(others)
  }
  
  else{
    res.status(402).json("wrong password");
    return;
  }
    }else{
      res.status(420);
      return;
    }
  
  
  
  
  
  }catch(err){
  
    console.log(err)
  }
  
  
  
  })

  router.get("/logout",async(req, res)=>{
    
    res.status(200).send("userLoggedOut")
    
    
    })
    
module.exports = router;