import React from "react";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { getNameCountries } from "../../actions";
import { Link } from "react-router-dom";
import style from "./SearchBar.module.css"

export default function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getNameCountries(name))
    }

    return (
        <div className={style.title}>
            <h1>Countries</h1>
            <div className={style.search}>
                <Link to='/'>Home</Link>
                <Link to='/activity'>Crear Actividad</Link>
                <input
                    type='text'
                    placeholder="Buscar"
                    onChange={(c) => handleInputChange(c)}
                />
                <button type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button>
            </div>
        </div>
    )
}