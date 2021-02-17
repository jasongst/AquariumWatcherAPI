module.exports = (sequelize, Sequelize) => {
    const Measurement = sequelize.define("measurements", {
        measure_temperature: {
            type: Sequelize.INTEGER
        },
        measure_ph: {
            type: Sequelize.FLOAT
        },
        measure_kh: {
            type: Sequelize.FLOAT
        },
        measure_gh: {
            type: Sequelize.FLOAT
        },
        measure_nh4: {
            type: Sequelize.FLOAT
        },
        measure_no2: {
            type: Sequelize.FLOAT
        },
        measure_no3: {
            type: Sequelize.FLOAT
        },
        measure_cu: {
            type: Sequelize.FLOAT
        }
    }, {underscored: true});
  
    return Measurement;
  };