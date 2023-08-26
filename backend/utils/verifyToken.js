const jwt =require("jsonwebtoken");
const{ createError } =require("../utils/error.js");

 const verifyToken = (req, res, next) => {
 //const token = req.cookies.access_token;
 // const token=req.headers.authorization
  
  try{
    const gettoken=req.headers.authorization
    const token=gettoken.slice(1,-1)
      if (!token) {
      return next(createError(401, "You are not authenticated!"));
    }
  
    jwt.verify(token, process.env.JWT, (err, user) => {
   
      if (err) return next(createError(403, "Token not valid"));
      req.user = user
      next();
    });
  }catch{
    res.status(400).send("Server Error");
  }
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    console.log(req.body);
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).send("You are not authorized!")
      return next(createError(403, "You are not authorized!"));
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    console.log(req.user);
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).send("You are not authorized!");
      return next(createError(403, "You are not authorized!"));
    }
  });
};

module.exports={
  verifyAdmin,
  verifyToken,
  verifyUser
}