import React, { useState,useEffect } from "react";
import { Link } from 'react-router-dom';
import { postActivity,getActivities,getCountries } from '../../actions/index'
import { useDispatch, useSelector } from "react-redux";
import style from "./ActivityCreate.module.css"

function validate(input){
    let errors = {};
    if (!input.name) {
        errors.name = "Se requiere un nombre";
    } else if (input.difficulty > 5 || input.difficulty < 1) {
        errors.difficulty = "La dificultad debe ser entre 1 y 5"
    } else if (!input.duration) {
        errors.duration = "Se debe especificar duracion"
    } else if (input.duration > 24 || input.duration <= 0) {
        errors.duration = "La duracion no puede ser mayor a 24 hs o menor a 0 hs"
    }
    return errors;
};

export default function ActivityCreate() {
    const dispatch = useDispatch()
    const activities = useSelector((state) => state.activities)
    const countries = useSelector((state) => state.countries)
    const [errors,setErrors] = useState({});

    const [input,setInput] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countryId:[]
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e){
        setInput({
            ...input,
            countryId: [...input.countryId,e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postActivity(input))
        alert("Actividad creada!!")
        setInput({
            name: "",
            difficulty: "",
            duration: "",
            season: "",
            countryId:[]
        })
    }

    function handleDelete(e){
        setInput({
            ...input,
            countryId: input.countryId.filter(c => c !== e)
        })
    }

    useEffect(() => {
        dispatch(getActivities());
    }, []);

    useEffect(() => {
        dispatch(getCountries());
    }, []);

    const sortedArr = countries.sort(function (a, b) {
        if (a.name > b.name) {
            return 1;
         }
        if (b.name > a.name) {
            return -1;
        }
        return 0;
    })

const VERANO = 'Verano'
const  OTOÑO = 'Otoño'
const INVIERNO = 'Invierno'
const PRIMAVERA = 'Primavera'

    return(
        <div>
            <div className={style.create}>
            <Link to = '/home'><button>Volver</button></Link>
            <h1>Crear Actividad</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input
                    type= "text"
                    value= {input.name}
                    name= "name"
                    onChange={handleChange}
                    />
                    {errors.name && (
                        <p className='error'>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Dificultad:</label>
                    {/* <select onChange={(e) => handleDifficulty(e)}>
                        <option value= {input.difficulty}>1</option>
                        <option value= {input.difficulty}>2</option>
                        <option value= {input.difficulty}>3</option>
                        <option value= {input.difficulty}>4</option>
                        <option value= {input.difficulty}>5</option>
                    </select>     */}
                    <input
                    value= {input.difficulty}
                    name= "difficulty"
                    type="range"
                    min="1"
                    max="5"
                    onChange={handleChange}
                    />
                    {errors.difficulty && (
                        <p className='error'>{errors.difficulty}</p>
                    )}
                </div>
                <div>
                    <label>Duracion:</label>
                    <input
                    type= "number"
                    value= {input.duration}
                    name= "duration"
                    onChange={handleChange}
                    />
                    {errors.duration && (
                        <p className='error'>{errors.duration}</p>
                    )}
                </div>
                <div>
                    <label>Estacion:</label>
                    <select
                    type= "text"
                    value= {input.season}
                    name= "season"
                    onChange={handleChange}
                    >
                     <option> Temporada </option>
                     <option value={INVIERNO}>Invierno</option>
                     <option value={VERANO}>Verano</option>
                     <option value={OTOÑO}>Otoño</option>
                     <option value={PRIMAVERA}>Primavera</option>
                    </select>
                </div>
                <div>
                    <label>Pais:</label>
                    <input
                    type= "text"
                    value= {input.countryId}
                    name= "countryId"
                    onChange={handleChange}
                    disabled 
                    />
                </div>
                <div>
                <select onChange={(e) => handleSelect(e)}>
                <option disabled value selected>Seleccione Pais</option>
                    {sortedArr.map((c) => (
                        <option value={c.id}>{c.name}</option>
                    ))}
                </select>
                </div>
                <button type='submit'>Crear</button>
            </form>
            <div className={style.allCards}>
            {input.countryId.map(e => 
                <div className={style.card}>
                <button className={style.buttonX} onClick={() => handleDelete(e)}>x</button>
                <p>{e}</p>
                </div>
                )}
                </div>
                </div>
        </div>
    )
} 