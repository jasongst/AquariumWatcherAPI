const db = require("../models");
const User = db.user;

checkAquariumOwner = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        if(user) {
            user.getAquariums({
                where: { id: req.params.id }
            }).then(aquarium => {
                if (aquarium) {
                    next();
                }
                else {
                    res.status(400).send({
                        message: "L'aquarium n'existe pas ou n'appartient pas à l'utilisateur!"
                    });
                    return;
                }
            })
        }
        else {
            res.status(400).send({
                message: "L'utilisateur n'existe pas!"
            });
            return;
        }
    })
}

module.exports = checkAquariumOwner;