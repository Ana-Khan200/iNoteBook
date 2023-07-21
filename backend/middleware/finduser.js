const jwt = require("jsonwebtoken");
const secret = "LetsHaveSomeFunTonight...!!!";

const finduser = (req, res, next) => {
  const token = req.header("auth-token");
  //console.log(req.header("auth-token"));
  if (!token) {
    return res.status(401).send({ error: "access denied" });
  }

  try {
    const data = jwt.verify(token, secret);
    req.user = data.user;
    next();
  } catch (err) {
    res.status(401).send({ error: "please enter a valid user" });
  }
};
module.exports = finduser;
