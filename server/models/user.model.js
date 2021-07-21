const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');
const { CompraSchema } = require('./compra.model');

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email",
      },
      unique:true
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be 8 characters or longer"],
    },
    compras: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Compra' }]
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator,{ message: 'Error, {PATH} ya existe' });

UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

  UserSchema.pre("validate", function (next) {
    if (this.isNew && this.password !== this["confirmPassword"]) {
      this.invalidate("confirmPassword", "Password must match confirm password");
    }
    next();
  });

UserSchema.pre("save", function (next) {
  if (this.isNew)
    bcrypt.hash(this.password, 10).then((hash) => {
      this.password = hash;
      next();
    });
  else next();
});



const User = mongoose.model('User', UserSchema);

module.exports = { UserSchema, User };
