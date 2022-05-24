import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getCountries, filterCountriesByContinent, filterCountriesByActivity, orderByName, getActivities } from '../../actions';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/SearchBar';
import style from "./Home.module.css"

export default function Home() {

    const dispatch = useDispatch()
    const allCountries = useSelector((state) => state.countries)
    const [orden, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage, setCountriesPerPage] = useState(10)
    const indexOfLastCountries = currentPage * countriesPerPage
    const indexOfFirstCountries = indexOfLastCountries - countriesPerPage
    const currentCountries = allCountries.slice(indexOfFirstCountries, indexOfLastCountries)
    const activities = useSelector((state) => state.activities)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch])

    useEffect(() => {
        dispatch(getActivities());
    }, []);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getCountries());
    }

    function handleFilterContinent(e) {
        dispatch(filterCountriesByContinent(e.target.value))
    }

    function handleFilterActivity(e) {
        dispatch(filterCountriesByActivity(e.target.value))
    }

    function handleOrderName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    return (
        <div>
            <div>
                <div className={style.search}>
                    <SearchBar />
                </div>
                <div className={style.filters}>
                    <button onClick={e => { handleClick(e) }}>
                        Recargar Todos
                    </button>
                    <select onChange={e => handleOrderName(e)}>
                        <option disabled value selected>Ordenar</option>
                        <option value='asc'>Ascendente</option>
                        <option value='des'>Descendente</option>
                        <option value='pob'>Poblacion Asc.</option>
                        <option value='pobdes'>Poblacion Des.</option>
                    </select>
                    <select onChange={e => handleFilterContinent(e)}>
                        <option value='All'>Todos los Continentes</option>
                        <option value='Americas'>America</option>
                        <option value='Antarctic'>Antartida</option>
                        <option value='Africa'>Africa</option>
                        <option value='Asia'>Asia</option>
                        <option value='Europe'>Europa</option>
                        <option value='Oceania'>Oceania</option>
                    </select>
                    <select onChange={e => handleFilterActivity(e)}>
                    <option disabled value selected>Actividades</option>
                        {activities.map((act) => (
                            <option value={act.name}>{act.name}</option>
                        ))}
                    </select>
                </div>
                {
                    currentCountries?.map((c) => {
                        return (
                            <div key={c.id} className={style.linkCard}>
                                <Link to={"/home/" + c.id}>
                                    <Card name={c.name} flags={c.flags} region={c.region} id={c.id} population={c.population} />
                                </Link>
                            </div>
                        );
                    })
                }
            </div>
            <Paginado
                countriesPerPage={countriesPerPage}
                allCountries={allCountries.length}
                paginado={paginado}
            />
        </div>
    )
}