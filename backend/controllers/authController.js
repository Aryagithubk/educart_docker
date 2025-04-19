const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register a new user
const register = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword, // Saving hashed password
      role: role || "user",
    });

    // Save user to DB
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

  // In login route
    res.cookie("token", token, {
      httpOnly: true,       // Prevents JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production",  // Secure flag for HTTPS
      maxAge: 24 * 60 * 60 * 1000,  // Cookie expiry in milliseconds (1 day)
    });

    res.status(201).json({ message: "register successful" });

  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// User login and generate token
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials (email)" });
    }

    // Log the entered password and the stored hashed password
    console.log("Password entered:", password); // Plaintext entered by user
    console.log("Stored password:", user.password); // Hashed password in the DB

    // Compare entered password with stored hashed password
   // const isMatch = await bcrypt.compare(password, user.password);

    // console.log("Password match result:", isMatch); // Should be true if passwords match

    //if (!isMatch) {
      //return res.status(400).json({ message: "Invalid credentials (password)" });
    //}

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    // In login route
    res.cookie("token", token, {
      httpOnly: true,       // Prevents JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production",  // Secure flag for HTTPS
      maxAge: 24 * 60 * 60 * 1000,  // Cookie expiry in milliseconds (1 day)
    });

    res.status(200).json({ message: "Login successful" });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { register, login };
