const { Schema, model } = require("mongoose");

const CompraSchema = Schema(
  {
    moneda: {
      type: String,
      required: [true, "Tipo de moneda es obligatorio"],
    },
    monto: {
      type: Number,
      required: [true, "El monto es obligatorio"],
    },
  },
  { timestamps: true }
);

const Compra = model("Compra", CompraSchema);

module.exports = { CompraSchema, Compra };
