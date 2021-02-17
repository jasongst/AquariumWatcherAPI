const db = require("../models");
const Measurement = db.measurement;

exports.create = (req, res) => {
    const id = req.params.id;
    const measure = {
        measure_temperature: req.body.measure_temperature ? req.body.measure_temperature : 0,
        measure_ph: req.body.measure_ph ? req.body.measure_ph : 0,
        measure_kh: req.body.measure_kh ? req.body.measure_kh : 0,
        measure_gh: req.body.measure_gh ? req.body.measure_gh : 0,
        measure_nh4: req.body.measure_nh4 ? req.body.measure_nh4 : 0,
        measure_no2: req.body.measure_no2 ? req.body.measure_no2 : 0,
        measure_no3: req.body.measure_no3 ? req.body.measure_no3 : 0,
        measure_cu: req.body.measure_cu ? req.body.measure_cu : 0,
        aquarium_id: id
    }
    Measurement.create(measure).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({message: err.message || "Some error occurred while creating the measure."});
    });
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    Measurement.findAll({
        where: {
            aquarium_id: id
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving measurements from aquarium (id: "+ id +")."
        });
    });
};

exports.deleteAll = (req, res) => {
    const id = req.params.id;

    Measurement.findAll({
        where: {
            aquarium_id: id
        }
    }).then(data => {
        data.forEach(measure => {
            data.destroy();
        });
    }).then(data => {
        res.send({message: `Les mesures de l'aquarium ${id} ont été supprimés avec succès !`});
    }).catch(err => {
        res.status(500).send({message: err.message || `Il y a eu une erreur lors de la supression de toutes les mesures de l'aquarium ${id}`});
    });
};
