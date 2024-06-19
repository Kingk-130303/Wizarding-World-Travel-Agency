var jwt = require('jsonwebtoken')
const jwt_secret = "king@123"


const fetchuser = (req, res, next) => {
    const token = req.body.token;
    // console.log(token)
    if (!token) {
      return res.status(401).send({ error: "Authentication Token missing" });
    }
    try {
      const data = jwt.verify(token, jwt_secret);
      console.log(data)
      req.email = data.email;
      req.name = data.name;
      if (data.usertype !== 'User'){
        return res
        .status(401)
        .send({ error: "Please authenticate using a user token" });
      }
      // console.log(req.email)
      // console.log(data)

      next();
    } catch (error) {
        console.log(error)
      return res
        .status(401)
        .send({ error: "Please authenticate using a valid token" });
    }
  };

  module.exports = fetchuser;
