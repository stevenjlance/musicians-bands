const {Sequelize, sequelize} = require('./db');

let Song = sequelize.define("song", {
    title: Sequelize.STRING,
    length: Sequelize.NUMBER
})

module.exports = {
    Song
}