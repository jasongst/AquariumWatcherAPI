module.exports = (sequelize, Sequelize) => {
    const Aquarium = sequelize.define("aquariums", {
      alias: {
        type: Sequelize.STRING
      },
      max_temperature: {
        type: Sequelize.INTEGER
      },
      min_temperature: {
        type: Sequelize.INTEGER
      },
      max_ph: {
        type: Sequelize.FLOAT
      },
      min_ph: {
        type: Sequelize.FLOAT
      },
      max_kh: {
        type: Sequelize.FLOAT
      },
      min_kh: {
        type: Sequelize.FLOAT
      }
    }, {underscored: true});
  
    return Aquarium;
  };