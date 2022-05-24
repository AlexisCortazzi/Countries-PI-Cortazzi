import React from 'react';
import {Link} from 'react-router-dom';
import style from "./LandingPage.module.css"

export default function LandingPage(){
    return(
        <div className={style.landing}>
            <h1>Bienvenidos</h1>
            <div>
            <Link to = '/home'>
                <button>Empezar</button>
            </Link>
            </div>
        </div>
    )
}