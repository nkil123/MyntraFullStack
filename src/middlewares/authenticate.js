require ('dotenv').config ();
const jwt = require ('jsonwebtoken');

const verifyToken = token => {
  return new Promise ((resolve, reject) => {
    jwt.verify (token, process.env.jwt_private_key, function (err, token) {
      if (err) return reject (err);
      return resolve (token);
    });
  });
};

module.exports = async (req, res, next) => {
  // if we received the bearer token in the header
  // console.log (req);
  // console.log ('inside auth');
  const bearerToken = req.headers.authorization;
  // console.log ('bearerToken:', bearerToken);

  // if not received or token is not a bearer token then we will throw an error
  if (!bearerToken || !bearerToken.startsWith ('Bearer '))
    return res.status (400).json ({
      status: 'failed',
      message: ' Please provide a valid token',
    });

  // else we will try to get the user from the token
  const token = bearerToken.split (' ')[1];
  // console.log ('token:', token);

  let user;
  try {
    user = await verifyToken (token);
  } catch (e) {
    return res.status (400).json ({
      status: 'failed',
      message: 'Please provide a valid token',
    });
  }
  // if no user found then we will throw an error
  if (!user)
    return res.status (400).json ({
      status: 'failed',
      message: ' Please provide a valid token',
    });
  // console.log (user);
  // else we will attach the user to the req
  req.user = user;

  // return next
  return next ();
};
