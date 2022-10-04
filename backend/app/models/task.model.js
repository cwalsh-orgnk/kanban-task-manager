module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("task", {
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      subtasks: {
        type: Sequelize.STRING
      },
      status :{
        type: Sequelize.STRING
      }
    });

    return Tutorial;
  };