const {Band} = require('./Band')
const {Musician} = require('./Musician')
const {Song} = require('./Songs.js')

Musician.belongsTo(Band)
Band.hasMany(Musician)
Band.belongsToMany(Song, {through: 'band_song'});
Song.belongsToMany(Band, {through: 'band_song'});

module.exports = {
    Band,
    Musician,
    Song
};
