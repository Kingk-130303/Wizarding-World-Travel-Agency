var jwt = require('jsonwebtoken')
const jwt_secret = "king@123"


const fetchadmin = (req, res, next) => {
    const token = req.body.token;
    // console.log(token)
    if (!token) {
      return res.status(401).send({ error: "Authentication Token missing" });
    }
    try {
      const data = jwt.verify(token, jwt_secret);
      req.email = data.email;
      // console.log(data.usertype)
      if (data.usertype !== 'Admin'){
        return res
        .status(401)
        .send({ error: "Please authenticate using a admin token" });
      } 
      // console.log(req.email)
      
      next();
    } catch (error) {
        console.log(error)
      return res
        .status(401)
        .send({ error: "Please authenticate using a valid token" });
    }
  };

  module.exports = fetchadmin;
