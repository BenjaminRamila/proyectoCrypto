// inside of user.routes.js
const UserController = require('../controllers/user.controller');
const CompraController = require('../controllers/compra.controller');
const authenticate = require('../config/authenticate');

module.exports = function(app) {
  app.post("/api/register", UserController.Register);
  app.post("/api/login", UserController.Login);
  app.post("/api/logout", UserController.Logout);
  // this route now has to be authenticated
  app.get("/api/users", authenticate, UserController.getAll);
  app.get('/api/user/:id', authenticate, UserController.getUser);

  app.post("/api/compra/add", CompraController.createCompra);
  app.get("/api/compras-by-user/:id", CompraController.getComprasByUser);
  app.delete("/api/compra/:id", CompraController.deleteCompra);
}
