
const axios = require ('axios');
const {Country, Activity} = require('../db.js');


const getAllCountries = async () => {
    try {
      {
        const AllCountApi = await axios.get("https://restcountries.com/v3/all");
        const ModelCountries = AllCountApi.data.map((e) => {
          return {
            id: e.cca3,
            name: e.name.common,  
            flags: e.flags[1],
            region: e.region,
            capital: e.capital ? e.capital[0] : "Undefined Capital",
            subregion: e.subregion ? e.subregion : "Undefined Subregion",
            area: e.area,
            population: e.population
          };
        });
        ModelCountries.forEach(async (e) => {
          await Country.findOrCreate({
            where: {
              name: e.name,
              id: e.id,
              flags: e.flags,
              region: e.region,
              capital: e.capital,
              subregion: e.subregion,
              area: e.area,
              population: e.population,
            },
          });
        });
      }
      console.log('DB success')
    } catch (error) {
      res.send(error);
    }
  }

  //getAllCountries();

const getActivities = async () => {
    const get = await Activity.findAll()
    return get;
}

module.exports = { getAllCountries, getActivities };