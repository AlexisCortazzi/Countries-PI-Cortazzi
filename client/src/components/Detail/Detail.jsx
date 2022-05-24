import React from "react";
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { getDetail, getActivities } from "../../actions";
import { useEffect } from "react";
import style from "./Detail.module.css";

export default function Detail(props){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    },[dispatch])

    useEffect(() => {
        dispatch(getActivities());
    }, [dispatch]);

    const myCountry = useSelector((state) => state.detail)
    const myActivities = useSelector((state) => state.activities)
    const activities = [];

    for (var i=0; i < myActivities.length; i++) {
        for (var j=0; j < myActivities.length; j++) {
        if(myCountry[0].activity[i] === myActivities[j].name){
            activities.push(myActivities[j])
        }}
    }
    
return (
    <div className={style.allDetail}>
        {
            myCountry.length > 0 ?
            <div className={style.detail}>
                <h1>{myCountry[0].name}</h1>
                <img src= {myCountry[0].flags}/>
                <h2>Continente: {myCountry[0].region}</h2>
                <h2>Id: {myCountry[0].id}</h2>
                <h2>Capital: {myCountry[0].capital}</h2>
                <h2>Subregion: {myCountry[0].subregion}</h2>
                <h2>Area: {myCountry[0].area} km²</h2>
                <h2>Poblacion: {myCountry[0].population}</h2>
                <h3 className={style.title}>Actividades</h3>
                {console.log(myCountry[0].activity)}
                <div className={style.activity}>{activities.map(e => (
                    <div className={style.card}>
                    <h3>{e.name+" "}</h3>
                    <h3>Id: {e.id+" "}</h3>
                    <h3>Dificultad: {e.difficulty+" "}</h3>
                    <h3>Duracion: {e.duration+" "}hs</h3>
                    <h3>Estacion: {e.season+" "}</h3>
                    </div>
                ))}
                </div>
                <Link to= '/home'>
                    <button>Volver</button>
                </Link>
            </div> : <p>Loading...</p>
        }
    </div>
)
}