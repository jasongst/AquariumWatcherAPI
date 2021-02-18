const db = require("../models");
const Aquarium = db.aquarium;

checkAquariumOwner = (req, res, next) => {
    Aquarium.findByPk(req.params.id).then(aquarium => {
        if(!aquarium) return res.status(400).send({message: "L'aquarium n'existe pas!"});
        aquarium.getUsers().then(users => {
            if (users[0].id === req.userId) {
                next();
            }
            else {
                return res.status(400).send({
                    message: "L'aquarium n'appartient pas à l'utilisateur!"
                });
            }
        });
    });
}

module.exports = checkAquariumOwner;