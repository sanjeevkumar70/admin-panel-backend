const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash, role });
  return res.json(
    {
      success: true,
      message: `${user.role} registered successfully!`
    });
};

//payload
// {
//    "name": "",
//    "email": "",
//    "email": "",
//    "role": ""
// }
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      success: true,
      data: user,
      token: generateToken(user._id, user.role),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};

// payload
// {
//    "email": "",
//    "password": ""
// }