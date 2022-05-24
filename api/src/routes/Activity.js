const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
//const e = require('express');
const {Country, Activity} = require('../db.js');
const { getActivities } = require('../controller/getApiInfo')


const router = Router();

router.post('/', async (req,res) => {
    const { name, difficulty, duration, season, countryId } = req.body
    const createActivity = await Activity.create({
        name,
        difficulty,
        duration,
        season,
        //countryId,
    })
    const countriesAll = await Country.findAll({
        where: {
            id: countryId
        }
    })
    // console.log(countryId)
    // console.log(countries)
    createActivity.addCountry(countriesAll)
    res.status(200).send("Creado Correctamente")
})

router.get('/', async (req,res) => {
    const activities = await getActivities()
    res.status(200).send(activities)
})

module.exports = router;