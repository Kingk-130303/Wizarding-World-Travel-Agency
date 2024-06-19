var jwt = require('jsonwebtoken')
const jwt_secret = "king@123"


const fetchlandinguser = (req, res, next) => {
    const token = req.body.token;
    // console.log(token)
    if (!token) {
      return res.status(401).send({ message: "Authentication Token missing" ,status: 401});
    }
    try {
      const data = jwt.verify(token, jwt_secret);
      req.email = data.email;
      
      // console.log(data.usertype)
      if (data.usertype === 'Admin'){
        return res
        .status(308)
        .send({ message: "An admin token found" ,status: 308});
      } 

      if (data.usertype === 'User'){
        return res
        .status(309)
        .send({ message: "A user token found" ,status: 309});
      } 
      // console.log(req.email)
      
      next();
    } catch (error) {
        console.log(error)
      return res
        .status(400)
        .send({ error: "Please authenticate using a valid token" });
    }
  };

  module.exports = fetchlandinguser;
