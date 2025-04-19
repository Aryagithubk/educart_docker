const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Ensures email is saved in lowercase
  },
  password: {
    type: String,
    required: true,
    trim: true, // Automatically removes spaces before and after the password
  },
  role: {
    type: String,
    enum:['user', 'admin'],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving to database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password is modified
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // Hash the password
  next(); // Proceed with the save operation
});

// Compare password for login validation
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // Compare entered password with stored password
};

module.exports = mongoose.model("User", userSchema);
