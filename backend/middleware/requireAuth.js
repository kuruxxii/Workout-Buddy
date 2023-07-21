const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const requireAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;
  if (!authorization) {
    /*
    end the requireAuth function here so use return
    */
    return res.status(401).json({ error: "Authorization token required" })
  }
  const token = authorization.split(" ")[1]

  try {
    const { _id } = jwt.verify(token, process.env.SECRET)
    // attach user property to request object
    req.user = await User.findOne({ _id }).select("_id")
    next()
  } catch (error) {
    console.log(error)
    /* In this case, the 401 response is sent but return is not used.
    This is because we want execution to continue after sending the response - 
    the requireAuth middleware function still needs to call next() 
    to pass execution to the next handler.
    */
    res.status(401).json({ error: "Request is not authorized" })
  }
}

module.exports = requireAuth