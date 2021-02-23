const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const Users = require("../users/users-model");
const { isValid } = require("../users/users-service");
const {jwtSecret} = require("../../config/secret");

router.post("/register", (req, res) => {
  const newUser = req.body;

  if (isValid(newUser)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcryptjs.hashSync(newUser.password, rounds);
    newUser.password = hash;

    Users.add(newUser)
      .then((user) => {
        res.status(201).json({ data: user });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } else {
    res.status(400).json({
      message:
        "User name and password should only contain letters and numbers.",
    });
  }
});
 
router.post("/login", (req,res)=>{
    const {username, password}=req.body;
    if(isValid(req.body)){
        Users.findby({username:username})
        .then(([user])=>{
            if(user && bcryptjs.compareSync(password, user.password)){
                const token = makeToken(user)
                res.status(200).json({
                    message: "You hav sucsessfully logged in", token
                });
            }else{
                res.status(401).json({
                    message:"Wrong username and password"
                })
            .catch((err)=>{
                res.status(500).json({message:`Server:${err}`})
            });
            }
        })
    }else{
        res.status(400).json({
            message:"Username and Password should only contain numbers and letters."
        });
    }
});

function makeToken(user){
    const payload ={
        subject:user.id,
        username:user.username,
    }

    const options = {
        expiresIn:"600s"
    }
    return jwt.sign(payload,jwtSecret,options)
}

module.exports = router;