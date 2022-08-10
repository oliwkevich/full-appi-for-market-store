const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    // const token = authHeader.split(" ")[1];
    // const token = authHeader.replace(/Bearer\s?/, '');

    jwt.verify(authHeader, process.env.JWT_HASH, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).json(`Токен [${authHeader}] не є валідним!`);
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("Ви не авторизовані!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Ви не маєте на це довзіл!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      console.log(req.user);
      res.status(403).json("Ви не маєте на це довзіл! Ви не є адміном!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
