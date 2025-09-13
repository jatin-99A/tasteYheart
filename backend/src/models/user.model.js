const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    addresses: {
      type: [
        {
          label: { type: String, required: true },
          addressLine: { type: String, required: true },
          city: { type: String, required: true },
          state: { type: String, required: true },
          pincode: { type: String, required: true },
        }
      ],
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
