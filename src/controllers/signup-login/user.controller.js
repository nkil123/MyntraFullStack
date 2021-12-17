require ('dotenv').config ();
const jwt = require ('jsonwebtoken');
const User = require ('../../models/user.model');

const newToken = user => {
  return jwt.sign ({user: user}, process.env.jwt_private_key);
};

const register = async (req, res) => {
  try {
    let user = await User.findOne ({email: req.body.email}).lean ().exec ();

    if (user) {
      return res
        .status (400)
        .json ({status: 'failed', message: 'email already exist'});
    }

    user = await User.create (req.body);

    return res.send (user);
  } catch (e) {
    return res.status (400).json ({status: 'failed', message: e.message});
  }
};

const login = async (req, res) => {
  try {
    let user = await User.findOne ({email: req.body.email});

    if (!user) {
      return res
        .status (400)
        .json ({status: 'failed', message: 'email or password is incorrect'});
    }

    const match = await user.checkPassword (req.body.password);

    if (!match) {
      return res
        .status (400)
        .json ({status: 'failed', message: 'email or password is incorrect'});
    }

    const token = newToken (user);

    return res.json ({user, token});
  } catch (e) {
    return res.status (400).json ({status: 'failed', message: e.message});
  }
};

module.exports = {register, login};
