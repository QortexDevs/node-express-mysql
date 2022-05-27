module.exports = (sequelize, Sequelize) => {
  const Stub = sequelize.define('stub', {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    number: {
      type: Sequelize.INTEGER.UNSIGNED
    }
  })
  return Stub
}
