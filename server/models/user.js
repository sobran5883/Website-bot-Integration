import mongoose from "mongoose";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const User = mongoose.model("User", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().optional(), // ✅ Now it's optional like the schema
    email: Joi.string().email().required(),
    password: passwordComplexity().required(),
  });
  return schema.validate(data);
};

export default User;
export { validate }; // ✅ Named export for validation
