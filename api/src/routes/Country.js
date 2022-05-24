const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
//const e = require('express');
//const { getAllCountries } = require('../controller/getApiInfo')
const {Country, Activity} = require('../db.js');


const router = Router();
const getAllCountries = async () => {
     // const { name } = req.query
    // let countriesTotal = await getAllCountries();
    // if (name) {
    //     let countryName = await countriesTotal.filter( el => el.name.toLowerCase().includes(name.toLowerCase()))
    //     countryName.length ?
    //         res.status(200).send(countryName) :
    //         res.status(404).send('No esta el Pais');
    // } else {
    //     res.status(200).send(countriesTotal);
    // }
    let allCountries = await Country.findAll({
        include:{
            model: Activity,
            attributes: ["name"],
            through: { attributes: [] } 
        }
    })
    //console.log(allCountries)
    return allCountries.map(c => {
        //console.log(c.dataValues)
        return {
        id: c.dataValues.id, 
        name: c.dataValues.name, 
        flags: c.dataValues.flags, 
        region: c.dataValues.region, 
        capital: c.dataValues.capital,
        subregion: c.dataValues.subregion,
        area: c.dataValues.area,
        population: c.dataValues.population,
        activity: c.dataValues.activities.map(a => a.name)
        }
    })
}

router.get('/', async (req,res) => {
    const { name } = req.query
    const countries = await getAllCountries()
    if (countries.length === 0) res.status(404).send("No hay paises")
    else if (name) {
        const countriesname = countries.filter( el => el.name.toLowerCase().includes(name.toLowerCase()))
        countriesname.length !== 0 ? 
        res.status(200).json(countriesname) :
        res.status(404).send("No hay pais")
    } else {
    res.status(200).json(countries)
    } 
})

router.get('/:id', async (req,res) => {
    const { id } = req.params
    const countries = await getAllCountries()
    const country = countries.filter(e => e.id === id)
    country.length ? res.status(200).json(country) :
    res.status(404).send("No esta el pais") 
})

module.exports = router;