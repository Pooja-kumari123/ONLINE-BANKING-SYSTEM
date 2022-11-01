const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);
  app.get("/api/user/getAllAccount", controller.getAllAccount);
  app.get("/api/user/getAllTransaction", controller.getAllTransaction);
  app.get("/api/user/:userId", [authJwt.verifyToken], controller.userBoard);
  app.get("/api/username/:username", controller.usernameBoard);
  app.post("/api/user/createAccount/:userId", [authJwt.verifyToken], controller.createAccount);
  app.get("/api/user/getAccount/:accountNumber", [authJwt.verifyToken], controller.getAccount);
  app.post("/api/user/transferAmount/:userId", [authJwt.verifyToken], controller.transferAmount);
  app.get("/api/user/getTransaction/:accountNumber", [authJwt.verifyToken], controller.getTransaction);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
