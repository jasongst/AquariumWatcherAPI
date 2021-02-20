const { measurement } = require("../models");
const db = require("../models");
const Aquarium = db.aquarium;
const User = db.user;
const Measurement = db.measurement;

// Create and Save a new Aquarium
exports.create = (req, res) => {
    // Create an Aquarium
    const aquarium = {
        alias: req.body.alias ? req.body.alias : "Mon aquarium",
        max_temperature: req.body.max_temperature ? req.body.max_temperature : 28,
        min_temperature: req.body.min_temperature ? req.body.min_temperature : 21,
        max_ph: req.body.max_ph ? req.body.max_ph : 8.6,
        min_ph: req.body.min_ph ? req.body.min_ph : 7.9,
        max_kh: req.body.max_kh ? req.body.max_kh : 12,
        min_kh: req.body.min_kh ? req.body.min_kh : 5
    };

  // Save Aquarium in the database
    Aquarium.create(aquarium)
    .then(aquarium => {
        User.findByPk(req.userId).then(user => {
            user.addAquarium(aquarium);
        });
        res.send(aquarium);
    })
    .catch(err => {
        res.status(500).send({message: err.message || "Some error occurred while creating the aquarium."});
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    User.findByPk(req.userId).then(user => {
        user.getAquariums().then(data => {
            const liste = [];
            let cpt = 0;
            data.forEach(aquarium => {
                Measurement.findOne({
                    where: {aquarium_id: aquarium.id},
                    order: [['createdAt', 'DESC']]
                }).then(measure => {
                    if(measure) liste.push(measure);
                    else liste.push(null);
                    cpt++;
                    if(cpt === data.length) res.send({data: data, measure: liste});
                });
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving aquarium."
              });
              return;
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving aquarium."
          });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Aquarium.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving aquarium (id: "+ id +")."
        });
    });
};

// Update an Aquarium by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Aquarium.update(req.body, {
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
            res.send({message: "Aquarium was updated successfully."});
          } else {
            res.send({message: `Cannot update Aquarium with id=${id}. Maybe Aquarium was not found or req.body is empty!`});
          }
        })
        .catch(err => {
            res.status(500).send({message: "Error updating Aquarium with id=" + id});
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Aquarium.findByPk(id).then(aquarium => {
      aquarium.getUsers().then(users => {
            aquarium.destroy();
            res.send({message: "L'aquarium a été supprimé avec succès !"});
      })
    }).catch(err => {
        res.status(500).send({message: "Could not delete Aquarium with id=" + id});
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    User.findByPk(req.userId).then(user => {
        user.getAquariums().then(aquariums => {
            aquariums.forEach(aquarium => {
                aquarium.destroy();
            });
            user.removeAquariums();
        }).then(data => {
            res.send({message: 'Les aquariums ont été supprimés avec succès !'});
        }).catch(err => {
            res.status(500).send({message: err.message || "Il y a eu une erreur lors de la supression de tous les aquariums"});
        });
    });
};