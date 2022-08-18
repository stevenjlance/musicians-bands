const {sequelize} = require('./db');
const {Band, Musician, Song} = require('./index')

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })
    
    test('can create a Band', async () => {
        // TODO - test creating a band
        const band1 = await Band.create({name: "Test band", genre: "pop"})
        expect(band1.genre).toBe("pop");
    })

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        const muscian1 = await Musician.create({name: "Beyonce", instrument: "voice"})
        console.log(muscian1)
        expect(muscian1.name).toBe("Beyonce");
    })
    
    test('can create a Song', async () => {
        await sequelize.sync({ force: true }); // recreate db
        const testSong = await Song.create({ title: 'Crazy in Love', length: 281 });
        expect(testSong.title).toBe('Crazy in Love')
    });

    test('Band can have many Musicians', async () => {
        await sequelize.sync({ force: true }); // recreate db
        let BigBang = await Band.create({ name : 'BIGBANG', genre : 'KPOP'})
        let GD = await Musician.create({ name : 'G-Dragon', instrument : 'Voice'})
        let Top = await Musician.create({ name : 'TOP', instrument : 'Voice'})
 
        await BigBang.addMusician(GD);
        await BigBang.addMusician(Top);
 
        const musicians = await BigBang.getMusicians()
        
        expect(musicians.length).toBe(2);
        expect(musicians[0] instanceof Musician).toBeTruthy;
    });

    test('Song can have many Bands and Band can have many Songs', async () => {
        await sequelize.sync({ force: true }); // recreate db
        let BigHitters = await Band.create({ name : 'BigHitters', genre : 'KPOP'})
        let Twang = await Band.create({ name : 'Twayang', genre : 'Country'})
        let SadSong = await Song.create({ title : 'Yes', year : 2018})
        let TopSong = await Song.create({ title: 'Top Dollar', year: 2019})
  
        await BigHitters.addSong(SadSong);
        await BigHitters.addSong(TopSong);
  
        const songs = await BigHitters.getSongs()
        const bands = await SadSong.getBands()
  
        expect(songs.length).toBe(2);
        expect(bands.length).toBe(1);
    });
})