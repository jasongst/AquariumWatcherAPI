const authJwt = require("../middleware/authJwt");
const verifyOwnerAquarium = require("../middleware/verifyOwnerAquarium");
const aquariums = require("../controllers/aquarium.controller");
const measurements = require("../controllers/measurement.controller");

module.exports = app => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
  
    // Create a new aquarium
    app.post("/api/aquariums", [authJwt.verifyToken], aquariums.create);
  
    // Retrieve all aquariums
    app.get("/api/aquariums", [authJwt.verifyToken], aquariums.findAll);

    // Retrieve a single aquarium with id
    app.get("/api/aquariums/:id", [authJwt.verifyToken, verifyOwnerAquarium], aquariums.findOne);
  
    // Update an aquarium with id
    app.put("/api/aquariums/:id", [authJwt.verifyToken, verifyOwnerAquarium], aquariums.update);
  
    // Delete an aquarium with id
    app.delete("/api/aquariums/:id", [authJwt.verifyToken, verifyOwnerAquarium], aquariums.delete);
  
    // Delete all aquariums
    app.delete("/api/aquariums", [authJwt.verifyToken], aquariums.deleteAll);

    // Retrieve measurements from a single aquarium with id
    app.get("/api/aquariums/:id/measurements", [authJwt.verifyToken, verifyOwnerAquarium], measurements.findOne);

    // Retrieve measurements from a single aquarium with id
    app.post("/api/aquariums/:id/measurements", [authJwt.verifyToken, verifyOwnerAquarium], measurements.create);

    // Delete all measurements of an aquarium with id
    app.delete("/api/aquariums/:id/measurements", [authJwt.verifyToken, verifyOwnerAquarium], measurements.deleteAll);
  };