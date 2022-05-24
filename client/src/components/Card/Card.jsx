import React from "react";
import style from "./Card.module.css";

export default function Card({ name, flags, region, id, population}) {
    return (
        <div className={style.card}>
            <h3>{name}</h3>
            <img src={flags} alt="img not found" width="260px" height="130px" />
            <h5>Continente: {region}</h5>
            <h5>Población: {population}</h5>
        </div>
    );
}