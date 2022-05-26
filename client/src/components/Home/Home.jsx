import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getCountries, filterCountriesByContinent, filterCountriesByActivity, orderByName, getActivities, setFirstMount } from '../../actions';
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
    const firstMount = useSelector((state) => state.firstMount)
    const activities = useSelector((state) => state.activities)
    const [filter, setFilter] = useState({
        continent: "all",
        activity: "desactivado",
    });

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
 
    useEffect(() => {
        async function func() {
            if(firstMount) {
            dispatch(getActivities());
            dispatch(setFirstMount(false));
            dispatch(getCountries());
            
        } else {
            dispatch(filterCountriesByContinent(filter));
            dispatch(getActivities());
            }
         }
        func();
    }, [dispatch, filter]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getCountries());
    }

    function handleFilter(e) {
        e.preventDefault();
        setFilter({
            ...filter,
            [e.target.name]: e.target.value,
        })
        setCurrentPage(1);
    }

    function handleOrderName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    const pageNumbers = []

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
                    <select name="continent" onChange={(e) => handleFilter(e)}>
                        <option value='all'>Todos los Continentes</option>
                        <option value='Americas'>America</option>
                        <option value='Antarctic'>Antartida</option>
                        <option value='Africa'>Africa</option>
                        <option value='Asia'>Asia</option>
                        <option value='Europe'>Europa</option>
                        <option value='Oceania'>Oceania</option>
                    </select>
                    <select name="activity" onChange={(e) => handleFilter(e)}>
                    <option value="desactivado">Actividades</option>
                    <option value="all">Todas</option>
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
            {/* <button onClick={() => paginado(currentPage -1)}>Previus</button> */}
            <Paginado
                countriesPerPage={countriesPerPage}
                allCountries={allCountries.length}
                paginado={paginado}
            />
            <button  onClick={() => paginado(currentPage +1)}>Next</button>
            
            {console.log(pageNumbers)} 
            {console.log(currentPage)}
        </div>
    )
}