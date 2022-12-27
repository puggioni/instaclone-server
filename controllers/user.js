const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function createToken(user, secret, expiresIn) {
  const { id, email, username } = user;
  const payload = { id, email, username };
  return jwt.sign(payload, secret, { expiresIn });
}

async function register(input) {
  const newUser = input;
  newUser.email = newUser.email.toLowerCase();
  newUser.username = newUser.username.toLowerCase();
  //Check if user exists
  const userFound = await User.findOne({
    $or: [{ email: newUser.email }, { username: newUser.username }],
  });
  if (userFound) throw new Error("User already exists");
  //encrypt password
  const salt = bcrypt.genSaltSync(10);
  newUser.password = bcrypt.hashSync(newUser.password, salt);
  //save user
  try {
    const user = new User(newUser);
    user.save();
    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function login(input) {
  const { email, password } = input;
  const userFound = await User.findOne({
    email: email.toLowerCase(),
  });
  if (!userFound) throw new Error("User not found");
  const passwordSuccess = await bcrypt.compare(password, userFound.password);
  if (!passwordSuccess) throw new Error("Incorrect password");
  return {
    token: createToken(userFound, process.env.SECRET, "24h"),
  };
}
module.exports = {
  register,
  login,
};
